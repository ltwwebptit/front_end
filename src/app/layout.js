import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "vietnamese"],
});

export const metadata = {
  title: "AI Tra Cứu Luật - Trợ lý AI Pháp luật đầu tiên",
  description: "AI Tra Cứu Luật là 1 sản phẩm công nghệ đột phá trong việc hỗ trợ và tư vấn pháp lý.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={quicksand.variable}>
        {children}
      </body>
    </html>
  );
}
