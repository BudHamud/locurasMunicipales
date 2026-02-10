import "./globals.css";

export const metadata = {
  title: "Locuras Municipales",
  description: "Juego de gestión política argentina",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased tracking-tight">
        {children}
      </body>
    </html>
  );
}