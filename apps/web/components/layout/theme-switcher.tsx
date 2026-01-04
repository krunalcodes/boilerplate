import { Button } from "@saas/ui/components/ui/button";
import { useTheme } from "next-themes";
import { LuSunMoon } from "react-icons/lu";

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Button variant="ghost" size="icon" onClick={handleThemeChange}>
      <LuSunMoon className="size-4" />
    </Button>
  );
}
