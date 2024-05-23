"use client";

import init, { compile } from "./copiler/copiler";

import hljs from "highlight.js/lib/core";
import lua from "highlight.js/lib/languages/lua";

import { createRef, useCallback, useEffect, useRef, useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import Image from "next/image";
import github_png from "../../public/github.png";

export default function Home() {
  let ref = createRef<HTMLHeadElement>();
  let [loaded, setLoaded] = useState(false);
  let [src, _] = useState(`class Car {
  let speed = 0

  let boost = (speed: number) {
    print("before:", self.speed)

    \\\\
    -- do it in luau because copiler doesn't have math 💀
    self.speed += speed
    \\\\

    print("after:", self.speed)
  }
}`);

  const onChange = useCallback(
    (val: string) => {
      if (ref.current) {
        try {
          let compiled = compile(val);
          ref.current.textContent = compiled;

          delete ref.current.dataset.highlighted;
          hljs.registerLanguage("lua", lua);
          hljs.highlightElement(ref.current);
        } catch {
          // code is not valid
        }
      }
    },
    [ref]
  );

  useEffect(() => {
    init().then(() => {
      setLoaded(true);
      onChange(src);
    });
  }, [onChange, src]);

  return (
    <main className="h-screen overflow-y-hidden">
      <div className="flex bg-slate-200 justify-end items-center p-1 box-content">
        <a
          href="https://github.com/highflowey/copiler"
          target="_blank"
          className="flex items-end justify-center rounded-md p-1 box-content bg-slate-300"
          style={{ height: "30px" }}
        >
          <Image src={github_png} width={30} height={30} alt="Github Mark" />
          <h1 className="text-1xl font-mono">Github</h1>
        </a>
      </div>
      <div
        className="flex overflow-y-hidden"
        style={{ height: "calc(100vh - 30px)" }}
      >
        <ReactCodeMirror
          className="w-1/2 overflow-y-scroll"
          value={src}
          onChange={onChange}
          extensions={[javascript({})]}
        ></ReactCodeMirror>
        {loaded ? (
          <pre className="w-1/2 overflow-y-scroll">
            <code
              ref={ref}
              className="text-sm"
              style={{ height: "calc(100vh - 30px)" }}
            ></code>
          </pre>
        ) : undefined}
      </div>
    </main>
  );
}
