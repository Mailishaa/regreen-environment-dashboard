import "./globals.css";

export const metadata = {
  title: "ReGreen Admin",
  description: "ReGreen environmental administration dashboard"
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}