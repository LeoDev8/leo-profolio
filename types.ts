import { ReactNode } from "react";

export interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // 这里使用 ReactNode，因为它既接收 <Menu />，也能接收 null 或其他 JSX
  Icon: React.ReactNode;
}

export interface NavbarProps {
  lang: String;
  dics: {
    index: String;
    profile: String;
    works: String;
    writings: String;
    contact: String;
  };
}

export interface MainProps {
  lang: String;
  dics: {
    x: String;
  };
}

export interface FooterProps {
  lang: String;
  dics: {
    y: String;
  };
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
