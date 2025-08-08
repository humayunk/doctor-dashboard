import { Outlet } from "react-router";

import { Sidebar } from "@/components/sidebar";

export default function SidebarLayout() {
  const user = localStorage.getItem("user");
  return (
    <>
      <Sidebar user={user} />
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
}
