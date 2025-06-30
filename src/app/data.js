const dataForm = {
  buttonID: 'formsDropdownCheckboxButton',
  columns: ['Display Name', 'First Name', 'Last Name', 'DOB'],
  data: [
    { display: 'Jane Doe', fname: 'Jane', lname: 'Doe', dob: '1990-01-19' },
    { display: 'Suzie Q', fname: 'Suzie', lname: 'Queue', dob: '1985-03-14' },
    { display: 'Lucy Smith', fname: 'Lucy', lname: 'Smith', dob: '1994-12-03' },
    { display: 'JD', fname: 'John', lname: 'Doe', dob: '1988-06-20' },
  ],
  menuID: 'formsDropdownDefaultCheckbox',
};

const dataPatient = {
  buttonID: 'patientsDropdownCheckboxButton',
  columns: ['Display Name', 'Intake Form', 'Endometriosis Survey', 'Daily Cycle Entries'],
  data: [
    { display: 'Jane Doe', intake: 'submitted', endo: 'submitted', cycle: '' },
    { display: 'Suzie Q', intake: 'pending', endo: '', cycle: '' },
    { display: 'Lucy Smith', intake: 'submitted', endo: 'revoked', cycle: '' },
    { display: 'JD', intake: '', endo: '', cycle: '' },
  ],
  menuID: 'patientsDropdownDefaultCheckbox',
  options: ['[Blank]', 'Pending', 'Submitted', 'Revoked'],
}

export {
  dataForm,
  dataPatient,
}
