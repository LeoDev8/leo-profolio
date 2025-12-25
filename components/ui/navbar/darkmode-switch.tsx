import { Moon, Sun } from "lucide-react";
import Navbutton from "./nav-button";
import { useTheme } from "next-themes";

export default function DarkmodeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <Navbutton
      Icon={theme === "dark" ? <Moon /> : <Sun />}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    />
  );
}
