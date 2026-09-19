import "./globals.css";

export const metadata = {
  title: "1844slitcope",
  description: "im cpu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
