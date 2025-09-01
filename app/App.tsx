import { BrowserRouter, Route, Routes } from "react-router-dom";

import Details from "@/routes/questionaryTabs/DetailsTab";
import Patients from "@/routes/questionaryTabs/PatientsTab";
import Sections from "@/routes/questionaryTabs/SectionTab";
import Welcome from "@/routes/questionaryTabs/welcome";
import Home from "@/routes/index";
import SidebarLayout from "@/routes/layouts/Sidebar";
import Patient from "@/routes/patients/patient";
import Settings from "@/routes/settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SidebarLayout />}>
          <Route element={<Welcome />} path="forms" />
          <Route element={<Details />} path="forms/:questionaryId/details" />
          <Route element={<Patients />} path="forms/:questionaryId/patients" />
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
    </BrowserRouter>
  );
}
