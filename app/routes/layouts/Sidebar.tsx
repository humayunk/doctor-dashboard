import { Outlet } from "react-router-dom";
import { ModernSidebar } from "@/components/ModernSidebar";
import { ModernHeader } from "@/components/ModernHeader";

export default function SidebarLayout() {
  return (
    <div className="min-h-screen bg-background">
      <ModernSidebar />
      <div className="sm:ml-64">
        <ModernHeader />
        <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
