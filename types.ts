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

export interface footerProps {
  lang: String;
  dics: {
    y: String;
  };
}
