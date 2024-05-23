"use client";

import init, { compile } from "./copiler/copiler";

import hljs from "highlight.js/lib/core";
import lua from "highlight.js/lib/languages/lua";

import { createRef, useCallback, useEffect, useRef, useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default function Home() {
  let ref = createRef<HTMLHeadElement>();
  let [loaded, setLoaded] = useState(false);
  let [src, _] = useState(`class Car {
  let speed = 0

  let boost = (speed: number) {
    \\\\
    -- anything between \\\\ \\\\ will count as luau code
    -- do it in luau because copiler doesn't have math 💀
    self.speed += speed
    \\\\
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
    <main className="flex h-screen overflow-y-hidden">
      <ReactCodeMirror
        className="w-1/2 h-screen overflow-y-scroll"
        value={src}
        onChange={onChange}
        extensions={[javascript({})]}
      ></ReactCodeMirror>
      {loaded ? (
        <pre className="w-1/2 overflow-y-scroll">
          <code ref={ref} className="text-sm h-screen"></code>
        </pre>
      ) : undefined}
    </main>
  );
}
