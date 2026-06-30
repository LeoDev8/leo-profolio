import { Moon, Sun } from "lucide-react";
import Navbutton from "./nav-button";
import { useTheme } from "next-themes";

export default function DarkmodeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <Navbutton
      aria-label="Toggle color theme"
      Icon={
        <>
          <Sun className="dark:hidden" />
          <Moon className="hidden dark:block" />
        </>
      }
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    />
  );
}
