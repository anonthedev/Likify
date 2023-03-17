import "./globals.css";
import SessionProviders from "./sessionProvider";
import ContextProvider from "./contextProvider";
import { Raleway, Nunito } from "next/font/google";
import SignOut from "@/Components/SignOut";
import Footer from "@/Components/Footer";

export const metadata = {
  title: "Likify",
  description: "Convert your liked songs on Spotify to a playlist",
};

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${raleway.variable} ${nunito.variable}`}>
      <body>
        <ContextProvider>
          <SessionProviders>
            <SignOut />
            {children}
            <Footer/>
          </SessionProviders>
        </ContextProvider>
      </body>
    </html>
  );
}
