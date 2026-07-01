export interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // 这里使用 ReactNode，因为它既接收 <Menu />，也能接收 null 或其他 JSX
  Icon: React.ReactNode;
}

export type NavDictionary = {
  index: string;
  profile: string;
  projects: string;
  writings: string;
  photos: string;
  flights: string;
  contact: string;
};

export type SidebarLink = {
  name: string;
  href: string;
};

export interface NavbarProps {
  lang: string;
  dics: NavDictionary;
}

export interface MainProps {
  lang: string;
  dics: {
    x: string;
  };
}

export interface FooterProps {
  lang: string;
  dics: {
    y: string;
  };
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  dics: NavDictionary;
  links: SidebarLink[];
}
