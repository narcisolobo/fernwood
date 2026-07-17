interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Schedule", href: "/schedule" },
  { label: "Pricing", href: "/pricing" },
  { label: "Instructors", href: "/instructors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export { navItems };
