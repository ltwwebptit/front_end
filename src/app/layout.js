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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var v = localStorage.getItem('ai_luat_theme');
                  if (v === 'dark' || (!v && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.variable}>
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
