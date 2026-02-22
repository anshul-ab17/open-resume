import "./globals.css";

export const metadata = {
  title: "Anshul Bharat | AI Portfolio",
  description: "AI Powered Resume Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0f0f0f] text-white antialiased">
        {children}
      </body>
    </html>
  )
}