import type { Metadata } from "next"
import "../global.css"
import Navbar from "./components/navbar"

export const metadata: Metadata = {
  title: "EyeSense AI",
  description: "AI-powered eye health screening",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
