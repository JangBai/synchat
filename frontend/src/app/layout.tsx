import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Synchat",
  description: "Synchat is a real-time state synchronization experiment.",
  keywords: "Synchat, real-time, state synchronization, experiment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
