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
    columns: ["Status", "Username", "Date", "Name", "Surname", "Date of Birth"],
    data: [
      {
        status: "active",
        username: "patientryan",
        date: "7/16/2025, 5:39:56 PM",
        name: "Don",
        surname: "Otreply",
        dob: "1969-06-11",
      },
    ],
    menuID: "formsDropdownDefaultCheckbox",
    tabs: [
      { label: "Data", href: "data" },
      { label: "Form", href: "form" },
      { label: "Send to Patient", href: "share" },
    ],
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
