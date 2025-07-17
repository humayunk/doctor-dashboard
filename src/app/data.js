const props = {
  details: {
    buttonID: "detailsDropdownCheckboxButton",
    columns: ["Date", "Temperature (C)", "Weight (Kg)"],
    data: [
      { date: "2025-01-01", temperature: 36.0, weight: 75.0 },
      { date: "2025-01-02", temperature: 36.1, weight: 74.9 },
      { date: "2025-01-03", temperature: 36.2, weight: 74.8 },
    ],
    info: {
      fname: { label: "First Name", value: "Jane" },
      lname: { label: "Last Name", value: "Doe" },
      dob: { label: "DOB", value: "1991-01-19" },
    },
    menuID: "detailsDropdownDefaultCheckbox",
    tabs: [
      { label: "Intake Form", href: "/patients/details/janedoe/intake" },
      {
        label: "Endometriosis Survey",
        href: "/patients/details/janedoe/endometriosis",
      },
      { label: "Daily Cycle Entries", href: "/patients/details/janedoe/cycle" },
    ],
  },
  form: {
    buttonID: "formsDropdownCheckboxButton",
    columns: ["Display Name", "First Name", "Last Name", "DOB"],
    consent: "This form requires read & write access to Profile data.",
    data: [
      { display: "Jane Doe", fname: "Jane", lname: "Doe", dob: "1990-01-19" },
      { display: "Suzie Q", fname: "Suzie", lname: "Queue", dob: "1985-03-14" },
      {
        display: "Lucy Smith",
        fname: "Lucy",
        lname: "Smith",
        dob: "1994-12-03",
      },
      { display: "JD", fname: "John", lname: "Doe", dob: "1988-06-20" },
    ],
    description:
      "This form comprises the initial intake questions before your first visit with Dr. Doe.",
    forms: [
      // { name: "Intake Form", href: "/forms/data", id: 1 },
      // { name: "Endometriosis Survey", href: "#", id: 2 },
      // { name: "Daily Cycle Entries", href: "#", id: 3 },
    ],
    menuID: "formsDropdownDefaultCheckbox",
    requester: "Dr. Doe.",
    tabs: [
      { label: "Data", href: "data" },
      { label: "Form", href: "form" },
      { label: "Send to Patient", href: "share" },
    ],
    title: "Intake Form",
  },
  patient: {
    buttonID: "patientsDropdownCheckboxButton",
    columns: [
      "Display Name",
      "Intake Form",
      "Endometriosis Survey",
      "Daily Cycle Entries",
    ],
    data: [
      {
        display: "Jane Doe",
        intake: "submitted",
        endo: "submitted",
        cycle: "",
      },
      { display: "Suzie Q", intake: "pending", endo: "", cycle: "" },
      {
        display: "Lucy Smith",
        intake: "submitted",
        endo: "revoked",
        cycle: "",
      },
      { display: "JD", intake: "", endo: "", cycle: "" },
    ],
    menuID: "patientsDropdownDefaultCheckbox",
    options: ["[Blank]", "Pending", "Submitted", "Revoked"],
  },
};

export { props };
