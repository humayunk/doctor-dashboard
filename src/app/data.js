const props = {
  details: {
    columns: ["Date", "Temperature (C)", "Weight (Kg)"],
    data: [
      { date: "2025-01-01", temperature: 36.0, weight: 75.0 },
      { date: "2025-01-02", temperature: 36.1, weight: 74.9 },
      { date: "2025-01-03", temperature: 36.2, weight: 74.8 },
    ],
    info: {
      dob: { label: "DOB", value: "1991-01-19" },
      fname: { label: "First Name", value: "Jane" },
      lname: { label: "Last Name", value: "Doe" },
    },
  },
};

export { props };
