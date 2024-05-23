import { javascript } from "@codemirror/lang-javascript";
import ReactCodeMirror from "@uiw/react-codemirror";
import { createRef, useCallback, useEffect, useState } from "react";
import init, { compile } from "../copiler/copiler";
import hljs from "highlight.js/lib/core";
import lua from "highlight.js/lib/languages/lua";

export default function Editor(props: { removeHeight: number }) {
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
    <div
      style={{ height: `calc(100vh - ${props.removeHeight}px)` }}
      className="flex overflow-y-hidden w-full bottom-0 absolute"
    >
      <ReactCodeMirror
        className="w-1/2 overflow-y-auto"
        value={src}
        onChange={onChange}
        extensions={[javascript({})]}
      ></ReactCodeMirror>
      {loaded ? (
        <pre className="w-1/2 overflow-y-auto">
          <code
            ref={ref}
            className="text-sm"
            style={{ height: `calc(100vh - ${props.removeHeight}px)` }}
          ></code>
        </pre>
      ) : undefined}
    </div>
  );
}
