import SidebarNav from "@/components/navigation/SidebarNav";

function Sidebar() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="mobile-navigation"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <SidebarNav />
    </div>
  );
}

export default Sidebar;
