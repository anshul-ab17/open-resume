import "./globals.css";

export const metadata = {
  title: "Anshul Bharat | AI Portfolio",
  description: "AI Powered Resume Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}