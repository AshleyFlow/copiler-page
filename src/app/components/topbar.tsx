import Image from "next/image";
import github_png from "../../../public/github.png";
import {
  Toolbar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { HomeRounded } from "@mui/icons-material";
import { useState } from "react";

export default function Topbar(props: {}) {
  let [page, setPage] = useState(0);

  return (
    <Toolbar className="h-1/6 bg-slate-300 sticky" variant="regular">
      <BottomNavigation
        className="bg-transparent"
        showLabels
        value={page}
        onChange={(_, value) => {
          setPage(value);
        }}
      >
        <BottomNavigationAction
          className="font-bold"
          label="Editor"
          icon={<HomeRounded className="text-3xl"></HomeRounded>}
        ></BottomNavigationAction>
        <BottomNavigationAction
          className="font-bold"
          label="Github"
          icon={
            <Image src={github_png} width={30} height={30} alt="Github Mark" />
          }
          href="https://github.com/highflowey/copiler"
        ></BottomNavigationAction>
      </BottomNavigation>
    </Toolbar>
  );
}
