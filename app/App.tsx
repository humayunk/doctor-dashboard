import { BrowserRouter, Route, Routes } from "react-router-dom";

import Details from "@/routes/forms/details";
import Patients from "@/routes/forms/patients";
import Sections from "@/routes/forms/sections";
import Welcome from "@/routes/forms/welcome";
import Home from "@/routes/index";
import SidebarLayout from "@/routes/layouts/sidebar";
import Patient from "@/routes/patients/patient";
import Settings from "@/routes/settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SidebarLayout />}>
          <Route element={<Welcome />} path="forms" />
          <Route element={<Details />} path="forms/:formId/details" />
          <Route element={<Patients />} path="forms/:formId/patients" />
          <Route element={<Sections />} path="forms/:formId/:sectionId" />
          <Route element={<Patient />} path="patients/:formId/:inviteId" />
          <Route element={<Settings />} path="settings" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

