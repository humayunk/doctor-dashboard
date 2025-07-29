import { Login } from "@/components/login";

export default function Home() {
  return <Login />;
}

export function meta() {
  return [
    { title: "Health Data Safe" },
    { content: "Welcome to your dashboard!", name: "HDS Doctor Dashboard" },
  ];
}
