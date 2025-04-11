import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "../components/header";
import { ThemeProvider } from "../components/theme-provider";
import { dark } from "@clerk/themes";
import { checkUser } from "../lib/checkUser"; // Import checkUser here
import ParticleBackground from "../components/ParticleBackground"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WorkWise",
  description: "",
};

export default async function RootLayout({ children }) {
  const user = await checkUser(); // Fetch user data on the server

  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <head>
        </head>
        <body className={`${inter.className} dark:bg-[#121212] text-gray-300`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
                      <ParticleBackground /> {/* Animated Particles */}
            <Header user={user} /> {/* Pass user data to Header */}
            <main className="min-h-screen">{children}</main>
            <Toaster richColors theme="dark" />
            <footer className="bg-[#1a1a1a] py-12">
              <div className="container mx-auto px-4 text-center text-gray-400">
                <p>Made with 💗 by Bug Resolvers</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
