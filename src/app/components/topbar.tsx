import Image from "next/image";
import github_png from "../../../public/github.png";

export default function Topbar(props: { height: number }) {
  return (
    <main className="flex bg-slate-200 justify-end items-center w-full">
      <a
        href="https://github.com/highflowey/copiler"
        target="_blank"
        className="flex items-end justify-center rounded-md bg-slate-300"
        style={{ height: props.height + "px" }}
      >
        <Image
          src={github_png}
          width={props.height}
          height={props.height}
          alt="Github Mark"
        />
        <h1 className="text-1xl font-mono">Github</h1>
      </a>
    </main>
  );
}
