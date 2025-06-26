import Tabbar from "@/components/ui/tabbar"
import { TableForm } from "@/components/table"

const props = {
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

export default function Page() {
  return (
    <>
      <Tabbar />
      <TableForm props={props} />
    </>
  );
}
