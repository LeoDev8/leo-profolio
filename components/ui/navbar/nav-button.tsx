interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // 这里使用 ReactNode，因为它既接收 <Menu />，也能接收 null 或其他 JSX
  Icon: React.ReactNode;
}
export default function Navbutton({
  Icon,
  className,
  ...props
}: NavButtonProps) {
  return (
    <button
      className={`[&_svg]:w-4.5 [&_svg]:h-4.5 text-buttontext w-8 h-8 rounded-lg flex justify-center items-center border border-border cursor-pointer hover:bg-buttonhoverbg ${
        className || ""
      }`}
      {...props}
    >
      {Icon}
    </button>
  );
}
