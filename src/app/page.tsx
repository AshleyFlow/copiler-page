"use client";

import Editor from "./components/editor";
import { Box } from "@mui/material";
import Topbar from "./components/topbar";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-y-clip">
      <Topbar></Topbar>
      <Box className="h-5/6 overflow-clip">
        <Editor></Editor>
      </Box>
    </main>
  );
}
