import { useEffect } from "react";
import { useNavigate } from "react-router";

import { setQuestionnaries, showLoginButton } from "@/dr-lib";

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    showLoginButton("login-button", async (state: string) => {
      if (state === "loggedIN") {
        await setQuestionnaries();
        navigate("/forms");
      }
    });
  }, []);

  return (
    <>
      <span
        className="flex h-screen items-center justify-center"
        id="login-button"
      ></span>
    </>
  );
}
