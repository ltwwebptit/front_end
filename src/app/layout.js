import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata = {
  title: "AI Tra Cứu Luật - Trợ lý AI Pháp luật đầu tiên",
  description: "AI Tra Cứu Luật là 1 sản phẩm công nghệ đột phá trong việc hỗ trợ và tư vấn pháp lý.",
};

import AuthGuard from "../components/AuthGuard";

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.variable}>
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
