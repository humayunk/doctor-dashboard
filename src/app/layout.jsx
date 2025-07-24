import "./globals.css";

import { Body } from "@/components/body";

export const metadata = {
  description: "HDS Doctor Dashboard",
  title: "Health Data Safe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://healthdatasafe.github.io/style-old/images/Favicon/favicon.ico"
          rel="icon"
          type="image/x-icon"
        />
      </head>
      <body>
        <Body children={children} />
      </body>
    </html>
  );
}
