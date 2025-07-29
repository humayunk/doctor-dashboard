import { useEffect } from "react";

import { setQuestionnaries, showLoginButton } from "@/dr-lib";

export function Login() {
  useEffect(() => {
    showLoginButton("login-button", (state) => {
      if (state === "loggedIN") {
        setQuestionnaries().then(() => {
          const {
            forms: { summary },
          } = JSON.parse(localStorage.getItem("props"));
          window.location.pathname = summary[0].href;
        });
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
