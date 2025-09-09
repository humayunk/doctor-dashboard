import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppContextProvider } from "./context/AppContext";
import { TestComponent } from "./components/TestComponent";
import Details from "@/routes/questionaryTabs/DetailsTab";
import Patients from "@/routes/questionaryTabs/PatientsTab";
import Sections from "@/routes/questionaryTabs/SectionTab";
import Welcome from "@/routes/questionaryTabs/welcome";
import SidebarLayout from "@/routes/layouts/Sidebar";
import Patient from "@/routes/patients/patient";
import Settings from "@/routes/settings";

export default function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route element={<TestComponent />} path="/" />
            <Route element={<Welcome />} path="forms" />
            <Route element={<Details />} path="forms/:questionaryId/details" />
            <Route
              element={<Patients />}
              path="forms/:questionaryId/patients"
            />
            <Route
              element={<Sections />}
              path="forms/:questionaryId/:sectionId"
            />
            <Route
              element={<Patient />}
              path="patients/:questionaryId/:inviteId"
            />
            <Route element={<Settings />} path="settings" />
          </Route>
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  );
}
