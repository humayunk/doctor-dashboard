import React, { createContext, useState, useContext } from "react";
import type { appTemplates } from "hds-lib-js";
import { getAppManaging } from "@/dr-lib";

interface AppContextType {
  appManaging: appTemplates.AppManagingAccount | null;
  updateAppManaging: (app: appTemplates.AppManagingAccount | null) => void;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appManaging, setAppManaging] =
    useState<appTemplates.AppManagingAccount | null>(getAppManaging());

  const updateAppManaging = (app: appTemplates.AppManagingAccount | null) => {
    setAppManaging(app);
    console.log("===== Updated App Managing", app);
  };

  const value = {
    appManaging,
    updateAppManaging,
    isAuthenticated: !!appManaging,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
