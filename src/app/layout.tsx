import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Blueprint UI",
  description: "Design System Registry for Blueprint"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
