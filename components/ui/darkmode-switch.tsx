import { Moon, Sun } from "lucide-react";
import Navbutton from "./nav-button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkmodeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return !isMounted ? null : (
    <Navbutton
      Icon={theme === "dark" ? <Moon /> : <Sun />}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    />
  );
}
