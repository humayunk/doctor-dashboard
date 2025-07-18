import "./globals.css";
import Script from "next/script";
import { Body } from "@/components/body";

export const metadata = {
  title: "Health Data Safe",
  description: "HDS Doctor Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://healthdatasafe.github.io/style/images/Favicon/favicon.ico"
          type="image/x-icon"
        />
      </head>
      <body>
        <Body children={children} />
      </body>
    </html>
  );
}
