import CustomizeDropdown from "@/components/ui/dropdown"
import Searchbar from "@/components/ui/searchbar"
import { TablePatient } from "@/components/table"

const props = {
  buttonID: 'patientsDropdownCheckboxButton',
  columns: ['Display Name', 'Intake Form', 'Endometriosis Survey', 'Daily Cycle Entries'],
  data: [
    { display: 'Jane Doe', intake: 'submitted', endo: 'submitted', cycle: '' },
    { display: 'Suzie Q', intake: 'pending', endo: '', cycle: '' },
    { display: 'Lucy Smith', intake: 'submitted', endo: 'revoked', cycle: '' },
    { display: 'JD', intake: '', endo: '', cycle: '' },
  ],
  menuID: 'patientsDropdownDefaultCheckbox',
};

export default function Page() {
  return (
    <TablePatient props={props} />
  );
}
