import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Settings, 
  Shield, 
  HelpCircle, 
  Menu,
  X,
  Plus,
  ChevronRight
} from "lucide-react";

import { getAppManaging, showLoginButton } from "@/dr-lib";

interface FormEntry {
  href: string;
  id: string;
  name: string;
  patientCount?: number;
  status?: 'active' | 'pending' | 'completed';
}

function FormEntry({ form }: { form: FormEntry }) {
  const location = useLocation();
  const isActive = location.pathname.includes(form.id);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <NavLink
      to={form.href}
      className={`sidebar-nav-item ${
        isActive ? 'sidebar-nav-item-active' : 'sidebar-nav-item-inactive'
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <FileText className="h-4 w-4" />
        <div className="flex-1 min-w-0">
          <div className="truncate text-sm font-medium">{form.name}</div>
          {form.patientCount !== undefined && (
            <div className="text-xs text-muted-foreground">
              {form.patientCount} patients
            </div>
          )}
        </div>
        {form.status && (
          <Badge 
            variant="outline" 
            className={`text-xs ${getStatusColor(form.status)}`}
          >
            {form.status}
          </Badge>
        )}
      </div>
      <ChevronRight className="h-4 w-4 opacity-50" />
    </NavLink>
  );
}

export function ModernSidebar() {
  const { t } = useTranslation();
  const { appManaging, updateAppManaging } = useAppContext();
  const [forms, setForms] = useState<FormEntry[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    showLoginButton("login-button", async (state: string) => {
      updateAppManaging(getAppManaging());
      console.log("=== signing button new state", state);
      if (state === "loggedIN") {
        // navigate("/forms");
      }
    });
  }, []);

  useEffect(() => {
    const updateForms = async () => {
      console.log("Effect: Update forms");
      const formsList: FormEntry[] = [];
      if (appManaging != null) {
        const collectors = await appManaging.getCollectors();
        for (const collector of collectors) {
          // Mock patient count and status for demo
          const patientCount = Math.floor(Math.random() * 50) + 1;
          const statuses = ['active', 'pending', 'completed'] as const;
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          
          formsList.push({
            href: `/forms/${collector.id}/patients`,
            id: collector.id,
            name: collector.name,
            patientCount,
            status
          });
        }
      }
      console.log("###forms", formsList);
      setForms(formsList);
    };

    updateForms();
  }, [appManaging]);

  const navigationItems = [
    {
      href: "/",
      label: t("dashboard"),
      icon: Shield,
      isActive: true
    },
    {
      href: "/forms",
      label: t("forms"),
      icon: FileText,
      isActive: false
    }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 sm:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">
                  HDS Doctor
                </h1>
                <p className="text-xs text-muted-foreground">
                  Secure Health Data Platform
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {/* Main Navigation */}
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `sidebar-nav-item ${
                        isActive ? 'sidebar-nav-item-active' : 'sidebar-nav-item-inactive'
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            <Separator className="my-4" />

            {/* Forms Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-3 py-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Active Forms
                </h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              {forms.length > 0 ? (
                <div className="space-y-1">
                  {forms.map((form) => (
                    <FormEntry key={form.id} form={form} />
                  ))}
                </div>
              ) : (
                <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                  No forms yet
                </div>
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            {/* Security Indicator */}
            <div className="security-indicator">
              <Shield className="h-3 w-3" />
              <span>Swiss-Grade Security</span>
            </div>

            {/* Help & Settings */}
            <div className="space-y-1">
              <a
                href="https://www.healthdatasafe.org/"
                target="_blank"
                rel="noreferrer"
                className="sidebar-nav-item sidebar-nav-item-inactive"
              >
                <HelpCircle className="h-4 w-4" />
                <span>{t("help")}</span>
              </a>
              
              <NavLink
                to="/settings"
                className="sidebar-nav-item sidebar-nav-item-inactive"
              >
                <Settings className="h-4 w-4" />
                <span>{t("settings")}</span>
              </NavLink>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <div className="login-button-container">
                <span id="login-button"></span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 sm:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
