"use client";

import { useTheme } from "next-themes";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
      }}
    >
      {theme === "dark" ? (
        <BsSunFill className="text-[19px] text-bluebellGray" />
      ) : (
        <BsFillMoonFill className="text-[19px] text-bluebellGray" />
      )}
    </button>
  );
}
