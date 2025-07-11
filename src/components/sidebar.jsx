'use client'
import { useEffect, useState } from 'react';
import { setQuestionnaries, showLoginButton } from "@/app/dr-lib.js"
import { IconForms, IconHamburger, IconLifesaver, IconLogout, IconPeople } from "@/components/ui/icons"

function FormEntry({ href, name }) {
  return (
    <li key={name}>
      <a href={href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        {name}
      </a>
    </li>
  )
}

function Sidebar() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      showLoginButton('login-button', (state) => {
        if (state === 'loggedIN') {
          setQuestionnaries().then(data => setForms(data));
        }
      });
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <IconHamburger />
      </button>

      {/* #HACK - TODO: Fix hydration warning instead of ignoring */}
      <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar" suppressHydrationWarning={true} >
        <a href="/">
          <img src="https://healthdatasafe.github.io/style/images/Horizontal/hds-logo-hz-1024x400-hz-color.png" alt="Logo" className="mx-2" width="200px" />
        </a>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a href="/patients/overview" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <IconPeople />
                <span className="flex-1 ms-3 whitespace-nowrap">Patients</span>
              </a>
            </li>
            <li>
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                <IconForms />
                <span className="flex-1 ms-3 whitespace-nowrap">Forms</span>
              </div>
            </li>
            {forms.map(({ href, id, name }) => (
              <FormEntry key={id} href={href} name={name} />
            ))}
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <a href="https://www.healthdatasafe.org/" target="_blank" rel="noreferrer" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <IconLifesaver />
                <span className="flex-1 ms-3 whitespace-nowrap">Help</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {/* <IconLogout /> */}
                {/* <span className="flex-1 ms-3 whitespace-nowrap">Account</span> */}
                <span id="login-button" className="flex-1 whitespace-nowrap"></span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export {
  IconForms,
  IconHamburger,
  IconLifesaver,
  IconLogout,
  IconPeople,
  Sidebar,
}
