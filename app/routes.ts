import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  layout("routes/layouts/sidebar.tsx", [
    ...prefix("forms/:formId", [
      route("details", "routes/forms/details.tsx"),
      route("patients", "routes/forms/patients.tsx"),
      route(":sectionId", "routes/forms/sections.tsx"),
    ]),
    route("patients/:formId/:inviteId", "routes/patients/patient.tsx"),
    route("settings", "routes/settings.tsx"),
  ]),
] satisfies RouteConfig;
