import { NavButtonProps } from "@/types";

export default function Navbutton({
  Icon,
  className,
  ...props
}: NavButtonProps) {
  return (
    <button
      className={`[&_svg]:w-4.5 [&_svg]:h-4.5 text-buttontext w-8 h-8 rounded-lg flex justify-center items-center border border-glass-border bg-glass cursor-pointer hover:bg-buttonhoverbg relative transition-colors duration-motion ${
        className || ""
      }`}
      {...props}
    >
      {Icon}
    </button>
  );
}
