import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components/sidebar";

export default function SidebarLayout() {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
}
