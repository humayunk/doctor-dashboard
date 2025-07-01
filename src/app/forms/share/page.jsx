import { props } from "@/app/data.js"
import { Tabbar } from "@/components/ui/tabbar"

export default function Page() {
  return (
    <>
      <Tabbar tabs={props.form.tabs} />
      <h1>Share</h1>
    </>
  );
}
