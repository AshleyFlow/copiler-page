"use client";

import Topbar from "./components/topbar";
import Editor from "./components/editor";

export default function Home() {
  let topbarHeight = 30;

  return (
    <main className="h-full w-full overflow-clip">
      <Topbar height={topbarHeight}></Topbar>
      <Editor removeHeight={topbarHeight}></Editor>
    </main>
  );
}
