import { ReactNode } from "react";

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
