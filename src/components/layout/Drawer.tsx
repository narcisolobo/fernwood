import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

interface DrawerProps {
  children: ReactNode;
}

function Drawer({ children }: DrawerProps) {
  return (
    <div className="drawer">
      <input id="mobile-navigation" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </div>
      <Sidebar />
    </div>
  );
}

export default Drawer;
