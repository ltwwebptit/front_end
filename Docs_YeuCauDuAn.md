# TÀI LIỆU ĐẶC TẢ YÊU CẦU DỰ ÁN

## I. Mô tả dự án
**1. Mô tả chung về dự án, lý do lựa chọn**
- **Mô tả chung:** Dự án là một hệ thống Trợ lý ảo AI (AI Chatbot) kết hợp không gian Quản lý tài liệu học tập/văn bản (Document Management Hệ thống). Hệ thống được xây dựng dưới dạng Web Application (sử dụng Next.js cho Front-end), cho phép người dùng tương tác trực tiếp với mô hình AI để hỏi đáp, tra cứu thông tin, đồng thời cung cấp các công cụ lưu trữ, quản lý lịch sử trò chuyện và tìm kiếm tài liệu nâng cao (lọc theo cơ quan ban hành, loại tài liệu, năm).
- **Lý do lựa chọn:** 
  + Nhu cầu tìm kiếm, tổng hợp thông tin từ khối lượng lớn tài liệu ngày càng cao trong học tập và công việc.
  + Việc tra cứu thủ công qua bộ lọc cơ bản tốn nhiều thời gian và không đem lại câu trả lời trực tiếp.
  + Ứng dụng công nghệ AI (đặc biệt là các mô hình ngôn ngữ lớn - LLM kết hợp RAG) vào quản lý tài liệu sẽ giúp số hóa quy trình, tăng hiệu suất làm việc bằng cách để AI tự đọc, hiểu và trích xuất câu trả lời chính xác từ kho dữ liệu riêng.

**2. Khảo sát các hệ thống tương tự**
- **ChatGPT / Claude / Gemini:** Là các hệ thống chatbot AI mạnh mẽ, nhưng chúng là công cụ đa dụng, không được tích hợp và phân quyền trực tiếp vào một kho dữ liệu/tài liệu tổ chức nội bộ cụ thể, thiếu các trường siêu dữ liệu (metadata) của văn bản.
- **Hệ thống Quản lý tài liệu (DMS - Document Management System) truyền thống:** Cung cấp khả năng lưu trữ, phân quyền, lọc tài liệu mạnh mẽ nhưng lại thiếu tính năng tương tác tự nhiên (hỏi-đáp) để trích xuất nhanh thông tin từ nội dung bên trong tài liệu.
- **Các nền tảng ChatPDF:** Cho phép tải lên một vài file PDF để hỏi đáp nhưng thường không có chức năng quản lý hệ thống tài liệu đồ sộ có kết cấu chặt chẽ theo bộ lọc nâng cao (cơ quan, năm, loại văn bản) và lưu trữ tổng thể.
- **=> Sự khác biệt của dự án:** Kết hợp sức mạnh của hệ thống quản lý tài liệu truyền thống và Chatbot AI, tạo ra một không gian làm việc đồng nhất, nơi người dùng vừa có thể tra cứu tài liệu theo cấu trúc, vừa có thể nhờ AI giải đáp thắc mắc liên quan trực tiếp đến kho tài liệu đó.

---

## II. Thu thập yêu cầu

### 1. Bảng thuật ngữ
| Thuật ngữ | Diễn giải |
| :--- | :--- |
| **AI (Trí tuệ nhân tạo)** | Hệ thống mô phỏng trí tuệ con người để thực hiện tương tác, trả lời câu hỏi của người dùng. |
| **LLM (Large Language Model)** | Mô hình ngôn ngữ lớn được huấn luyện trên lượng dữ liệu khổng lồ, đóng vai trò là "bộ não" của hệ thống Chatbot. |
| **RAG (Retrieval-Augmented Generation)** | Kỹ thuật kết hợp việc truy xuất tài liệu từ hệ thống (Retrieval) và sinh văn bản (Generation) để AI đưa ra câu trả lời chính xác dựa trên tài liệu nội bộ. |
| **Session (Phiên chat)** | Một cuộc hội thoại liên tục được lưu trữ giữa người dùng đăng nhập và hệ thống AI. |
| **Document (Tài liệu)** | Các file/bản ghi văn bản được lưu trữ trong hệ thống, bao gồm nội dung và các metadata như "agency" (cơ quan), "type" (loại), "year" (năm). |
| **Metadata** | Siêu dữ liệu dùng để phân loại và làm bộ lọc để tra cứu tài liệu dễ dàng hơn. |

### 2. Mô hình nghiệp vụ bằng ngôn ngữ tự nhiên

**a. Mục tiêu và phạm vi hệ thống**
- **Mực tiêu:** Xây dựng một Website hoàn chỉnh cho phép người dùng đăng nhập, tương tác mượt mà với AI qua các phiên chat, đồng thời quản lý kho tài liệu và lịch sử trò chuyện của cá nhân.
- **Phạm vi tác nghiệp:** Quản lý tài khoản người dùng (Xác thực Auth); Quản lý giao diện trò chuyện Chatbot; Quản lý lưu trữ phiên (Session history); Quản lý danh mục và tra cứu tài liệu gốc.

**b. Ai có thể sử dụng phần mềm?**
- **Người dùng phổ thông (User):** Những người có tài khoản đăng nhập vào hệ thống để thao tác hỏi đáp với AI và tra cứu tài liệu.
- **Khách vãng lai (Guest):** Có thể bị giới hạn tính năng, cần đăng ký/đăng nhập để sử dụng đầy đủ (tùy thuộc vào rule bảo mật).
- **Quản trị viên (Admin):** (Nếu có) Quản lý hệ thống người dùng, cập nhật và quản trị kho tài liệu chung của ứng dụng.

**c. Người dùng có những chức năng gì?**
- **Nhóm chức năng Xác thực:** Đăng ký (Register), Đăng nhập (Login), Đăng xuất (Logout).
- **Nhóm chức năng AI Chatbot:** Tạo phiên chat mới, nhắn tin với AI, xem lại lịch sử các phiên chat trước đó.
- **Nhóm chức năng Quản lý Tài liệu:** Xem danh sách tài liệu, phân trang, lọc nâng cao (theo Năm, Cơ quan ban hành, Loại tài liệu), tìm kiếm từ khóa.
- **Nhóm chức năng Hỗ trợ:** Xem trang trợ giúp (Help), xem thông tin liên hệ.

**d. Mỗi chức năng hoạt động ra sao?**
- **Đăng ký/Đăng nhập:** Người dùng điền thông tin vào form (email, password). Hệ thống gửi request xác thực, trả về token/session để lưu trạng thái đăng nhập thiết bị.
- **Chat với AI:** Người dùng ở trang chủ (`/`), nhập văn bản vào ChatArea. Hệ thống ghi nhận câu hỏi, gọi API (`ai_service`) để tạo phản hồi từ AI, sau đó in ra luồng tin nhắn. Tin nhắn được lưu vào Session, cập nhật tự động lên Sidebar.
- **Quản lý Phiên chat:** Sidebar tự động hiển thị danh sách các Session hiện có (lưu trữ thời gian, tiêu đề rút gọn của câu hỏi). Người dùng click vào một Session cũ, hệ thống sẽ tải lại toàn bộ tin nhắn của session đó lên màn hình.
- **Lọc và xem tài liệu:** Tại trang Documents (`/documents`), người dùng chọn các dropdown bộ lọc (VD: Chọn cơ quan ban hành, năm). Nhấn tìm kiếm, hệ thống truy xuất và hiển thị danh sách các tài liệu khớp điều kiện từ Database, giao diện thay đổi linh hoạt theo dữ liệu trả về.

**e. Những thông tin/đối tượng mà hệ thống cần xử lý?**
- **User (Người dùng):** ID, Username, Email, Password Hash, Role.
- **Session (Phiên chat):** ID Session, ID User, Tên phiên (Title), Thời gian tạo, Trạng thái.
- **Message (Tin nhắn):** ID Message, ID Session, Vai trò (Người dùng khởi tạo / AI phản hồi), Nội dung text, Thời gian gửi.
- **Document (Tài liệu):** ID Document, Title (Tiêu đề), Content, Metadata bao gồm: `agency` (cơ quan), `type` (loại văn bản), `year` (năm), URL nguồn (nếu có).

**f. Quan hệ giữa các đối tượng?**
- Hệ thống có mối quan hệ phụ thuộc lẫn nhau:
  + Một **User** sở hữu nhiều **Session** (Quan hệ 1 - N).
  + Trong một **Session** chứa nhiều **Message** (Quan hệ 1 - N).
  + Lịch sử **Message** cần truy xuất chéo với các **Document** (Trong quá trình AI xử lý nội dung để trả lời cho User).
  + Một **User** có thể truy cập, tìm kiếm và xem nhiều **Document** (Quan hệ N - N).
