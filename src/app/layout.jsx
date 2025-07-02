import './globals.css'
import { props } from "@/app/data.js"
import { Sidebar } from "@/components/sidebar"

export const metadata = {
  title: 'Health Data Safe',
  description: 'HDS Doctor Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://healthdatasafe.github.io/style/images/Favicon/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <Sidebar forms={props.form.forms} />
        <div className="p-4 sm:ml-64">
          {children}
        </div>
        <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
      </body>
    </html>
  )
}
