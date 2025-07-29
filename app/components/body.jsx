import { useEffect, useState } from "react";

import { setQuestionnaries, showLoginButton } from "@/app/dr-lib.js";
import { Sidebar } from "@/components/sidebar";

function Body({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
    } else {
      showLoginButton("login-button", (state) => {
        if (state === "loggedIN") {
          setQuestionnaries().then(() => setUser(localStorage.getItem("user")));
        }
      });
    }
  }, []);

  if (user) {
    return (
      <>
        <Sidebar user={user} />
        <div className="p-4 sm:ml-64">{children}</div>
      </>
    );
  } else {
    return (
      <>
        <span
          className="flex h-screen items-center justify-center"
          id="login-button"
        ></span>
      </>
    );
  }
}

export { Body };
