export const metadata = {
  title: 'BMW M5 в Лобне',
  description: 'Белый BMW M5 едет по городу Лобня',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
