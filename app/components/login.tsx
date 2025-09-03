import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAppManaging, showLoginButton } from "@/dr-lib";
import { useAppContext } from "@/context/AppContext";

export function Login() {
  const navigate = useNavigate();
  const { updateAppManaging } = useAppContext();

  useEffect(() => {
    showLoginButton("login-button", async (state: string) => {
      updateAppManaging(getAppManaging());
      console.log("=== signing button new state", state);
      if (state === "loggedIN") {
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
