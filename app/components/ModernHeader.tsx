import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut,
  Shield,
  ChevronRight,
  Home
} from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

function Breadcrumbs() {
  const location = useLocation();
  const { t } = useTranslation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: t("dashboard"), href: "/" }
    ];

    if (pathSegments.length === 0) return breadcrumbs;

    // Handle forms routes
    if (pathSegments[0] === 'forms') {
      breadcrumbs.push({ label: t("forms"), href: "/forms" });
      
      if (pathSegments[1]) {
        const formId = pathSegments[1];
        breadcrumbs.push({ label: `Form ${formId}`, href: `/forms/${formId}` });
        
        if (pathSegments[2] === 'details') {
          breadcrumbs.push({ label: t("details") });
        } else if (pathSegments[2] === 'patients') {
          breadcrumbs.push({ label: t("patients") });
        } else if (pathSegments[2]) {
          breadcrumbs.push({ label: t("section") });
        }
      }
    } else if (pathSegments[0] === 'patients') {
      breadcrumbs.push({ label: t("patients") });
    } else if (pathSegments[0] === 'settings') {
      breadcrumbs.push({ label: t("settings") });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          {index === 0 && <Home className="h-4 w-4" />}
          {item.href ? (
            <a
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      ))}
    </nav>
  );
}

export function ModernHeader() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side - Breadcrumbs */}
        <div className="flex items-center space-x-4">
          <Breadcrumbs />
        </div>

        {/* Right side - Actions and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Security Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
            <Shield className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-700 font-medium">Secure</span>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/doctor.png" alt="Doctor" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Dr. Smith</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    dr.smith@clinic.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t("settings")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
