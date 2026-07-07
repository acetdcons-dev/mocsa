# Website Mộc Sa – Dầu Gội Thảo Dược

Website tĩnh (HTML/CSS/JS thuần, không cần cài đặt gì) cho thương hiệu **Mộc Sa**, gồm đầy đủ các trang chuẩn của một website bán hàng:

```
moc-sa/
├── index.html                 Trang chủ
├── ve-chung-toi.html          Về chúng tôi
├── san-pham.html              Danh sách sản phẩm
├── san-pham-chi-tiet.html     Chi tiết sản phẩm (mô tả, thành phần, hướng dẫn dùng, đánh giá)
├── tin-tuc.html                Danh sách tin tức / kiến thức
├── tin-tuc-chi-tiet.html      Bài viết chi tiết (mẫu)
├── lien-he.html                Liên hệ (form + bản đồ)
├── gio-hang.html               Giỏ hàng
├── thanh-toan.html            Thanh toán (đặt hàng COD)
├── dat-hang-thanh-cong.html   Trang cảm ơn sau khi đặt hàng
├── chinh-sach-doi-tra.html    Chính sách đổi trả
├── chinh-sach-van-chuyen.html Chính sách vận chuyển
├── chinh-sach-bao-mat.html    Chính sách bảo mật
├── dieu-khoan-dich-vu.html    Điều khoản dịch vụ
├── minh-chung-chat-luong.html Minh chứng chất lượng (kết quả thử nghiệm QUATEST 3 + phiếu công bố)
├── robots.txt                 Cấu hình cho công cụ tìm kiếm
├── sitemap.xml                Sơ đồ trang cho SEO (cần sửa lại domain thật trước khi deploy)
├── css/style.css              Toàn bộ giao diện
├── js/main.js                 Toàn bộ tương tác (giỏ hàng, đếm ngược, form, slider, FAQ accordion, lightbox gallery...)
└── assets/images/             Nơi chứa toàn bộ hình ảnh
```

Trang chi tiết sản phẩm (`san-pham-chi-tiet.html`) có mục **Câu hỏi thường gặp (FAQ)** 10 câu dạng accordion, khối **Kết quả thử nghiệm chất lượng** (QUATEST 3) với gallery 3 ảnh xem lightbox mượt (kéo trái/phải), và **Schema Product + FAQPage** cho SEO.

Menu điều hướng hiện tại: **Trang chủ / Sản phẩm / Kiến thức / Minh chứng chất lượng / Về Mộc Sa / Liên hệ** — cấu trúc theo hướng thương hiệu lâu dài thay vì landing page bán hàng đơn thuần.

### Về SEO & hiệu năng

Đã làm: Open Graph + Twitter Card cho toàn bộ 15 trang, Schema Product/FAQPage (trang sản phẩm) + Schema Organization (trang chủ), `loading="lazy"` cho ảnh dưới màn hình đầu (blog, đánh giá, ảnh phụ), `robots: noindex` cho 3 trang giao dịch (giỏ hàng/thanh toán/thành công).

Chưa làm được (giới hạn công cụ hiện có, không phải bị bỏ sót):
- **Chuyển ảnh sang WebP** — cần công cụ xử lý ảnh (cwebp/sharp) mà môi trường này không có sẵn. Bạn có thể tự chuyển đổi bằng [squoosh.app](https://squoosh.app) rồi gửi lại, hoặc dùng plugin nén ảnh của hosting khi deploy.
- **Đo điểm Lighthouse thực tế** — cần trình duyệt để chạy audit, môi trường này không có công cụ đó. Các tối ưu (lazy load, giảm animation, ảnh nén sẵn khi bạn gửi) đều theo đúng khuyến nghị của Lighthouse, nhưng con số cụ thể cần bạn tự đo trên PageSpeed Insights sau khi deploy lên domain thật.

## 1. Cách xem thử website

Mở trực tiếp file `index.html` bằng trình duyệt, hoặc để mượt nhất (font, ảnh load đúng), dùng 1 server tĩnh đơn giản:

- VS Code: cài extension **Live Server** → chuột phải `index.html` → "Open with Live Server".
- Hoặc chạy: `npx serve .` trong thư mục `moc-sa` rồi mở địa chỉ hiển thị.

## 2. Thay ảnh thật (QUAN TRỌNG)

**Cách thêm ảnh mới (áp dụng cho blog, giấy công bố, giấy kiểm nghiệm...):** mình **xem** được ảnh bạn dán trong chat, nhưng không có chức năng tự tải ảnh đính kèm thành file (giới hạn của môi trường chat). Cách duy nhất: **bạn tự lưu ảnh về máy** — chuột phải vào ảnh trong khung chat → **"Lưu hình ảnh thành..." / "Save image as..."** → lưu vào đúng thư mục `assets/images/` với **đúng tên file** ở bảng bên dưới. Ảnh sẽ tự hiển thị ngay, không cần sửa code.

> Lưu ý: hộp thoại "Save as" của Windows đôi khi tự thêm đuôi `.png` phía sau tên bạn gõ (ví dụ gõ `certificate.jpg` lại thành `certificate.jpg.png`) — sau khi lưu, mở lại thư mục kiểm tra tên file, xoá đuôi thừa nếu có.

### Bảng đầy đủ các vị trí ảnh trên web (trạng thái hiện tại)

| Tên file cần lưu | Dùng ở đâu | Trạng thái |
|---|---|---|
| `logo.png` | Logo ở header (mọi trang) | ✅ Đã có |
| `tote-bag.png` | Ảnh túi vải quà tặng (trang chủ, chi tiết sản phẩm) | ✅ Đã có |
| `product-1.png` | Ảnh chính sản phẩm (trang chủ, danh sách, chi tiết, giỏ hàng, popup) | ✅ Đã có |
| `product-2.png` | Ảnh phụ trong gallery chi tiết sản phẩm | ✅ Đã có |
| `product-box.png` | Ảnh hộp + chai | ✅ Đã có |
| `product-usage.png` | Ảnh phụ gallery | ✅ Đã có |
| `product-bottle.png` | Ảnh lớn ở Hero trang chủ | ✅ Đã có |
| `about.png` | Ảnh mục "Về chúng tôi" | ✅ Đã có |
| `before-after.png` | Ảnh so sánh trước/sau (chi tiết sản phẩm) | ✅ Đã có |
| `certificate.jpg` | **Phiếu công bố sản phẩm mỹ phẩm** – khối "Đã công bố sản phẩm mỹ phẩm" ở trang Về chúng tôi & Chi tiết sản phẩm | ⬜ Chưa có – lưu ảnh chụp/scan phiếu công bố vào đúng tên này |
| `kiem-nghiem-1.jpg`, `kiem-nghiem-2.jpg`, `kiem-nghiem-3.jpg` | **Phiếu kết quả kiểm nghiệm (3 trang)** – khối "Đã kiểm nghiệm chất lượng" (nằm cạnh khối công bố) | ⬜ Chưa có – lưu đúng 3 ảnh theo thứ tự trang 1/2/3, mỗi trang bấm xem riêng được |
| `blog-1.jpg` → `blog-6.jpg` | Ảnh minh hoạ 6 bài viết ở trang Tin tức (`tin-tuc.html`, và ảnh bìa ở `tin-tuc-chi-tiet.html` dùng `blog-1.jpg`) | ⬜ Chưa có – lưu 6 ảnh, đánh số theo đúng thứ tự bài viết hiển thị trên trang Tin tức |
| `avatar-1.jpg`, `avatar-2.jpg`, `avatar-3.jpg` | Ảnh đại diện khách hàng đánh giá | ⬜ Chưa có – có thể bỏ qua, vẫn hiển thị đẹp bằng icon mặc định |
| `product-conditioner.jpg`, `product-serum.jpg` | Ảnh sản phẩm "Sắp ra mắt" | ⬜ Chưa có – có thể bỏ qua |
| `hero-banner.jpg` | Banner chính ở đầu trang chủ (mới, theo mẫu bạn gửi) | ⬜ Tuỳ chọn – hiện đang tự dùng tạm `about.png` (banner gỗ có sẵn); nếu muốn banner riêng không trùng với ảnh ở mục "Về chúng tôi", lưu thêm 1 trong các ảnh banner gỗ khác thành tên này |

**Logo, túi vải, hoa trang trí dạng vector** (`logo.svg`, `logo-white.svg`, `logo-mark.svg`, `logo-mark-white.svg`, `logo-icon.svg`, `tote-bag.svg`, `flower.svg`) vẫn giữ làm **bản dự phòng** — web tự quay lại dùng các file này nếu ảnh thật (`logo.png`, `tote-bag.png`) bị thiếu, nên không bao giờ vỡ hình.

> Mẹo: đặt tên file/định dạng đúng như bảng trên — nếu ảnh bạn có là định dạng khác (ví dụ certificate là `.png` thay vì `.jpg`), báo mình để sửa lại đuôi file tương ứng trong code, hoặc cứ lưu đúng tên gốc (không phần đuôi) rồi báo mình đuôi thật là gì.

## 3. Cập nhật thông tin liên hệ / chính sách

Hotline/Zalo hiện tại: `0325.343.663` (đã cập nhật khắp 14 trang). Fanpage: [Mộc Sa Việt Nam](https://www.facebook.com/mocsavietnam) (đã gắn ở footer). Địa chỉ và email hiện vẫn là dữ liệu mẫu (`123 Đường ABC, Quận 1, TP.HCM`, `hello@mocsa.vn`) — tìm trực tiếp trong phần `<footer>` của mỗi trang để thay khi có thông tin thật.

## 4. Giỏ hàng & đặt hàng hoạt động thế nào

Vì chỉ bán **1 sản phẩm duy nhất**, giỏ hàng lưu số lượng trong `localStorage` của trình duyệt (không cần backend):

- "Thêm vào giỏ hàng" → cộng số lượng, mở giỏ hàng mini.
- "Mua ngay" → mở khung đặt hàng nhanh (COD) hoặc chuyển tới `thanh-toan.html`.
- Trang `thanh-toan.html` sau khi bấm "Hoàn tất đặt hàng" sẽ chuyển tới `dat-hang-thanh-cong.html` kèm mã đơn hàng.

**Lưu ý quan trọng:** đây là phần đặt hàng phía trình duyệt (demo/tĩnh), đơn hàng **chưa được gửi đi đâu cả**. Để nhận đơn thật, bạn cần nối `#orderForm` (trong `thanh-toan.html`) và `#checkoutForm` (khung mua nhanh) tới một dịch vụ nhận đơn thật, ví dụ:
- Google Sheets (qua Google Apps Script / SheetDB),
- Zalo OA / Telegram Bot webhook,
- hoặc một backend riêng (Node.js, PHP...).

Mình có thể hỗ trợ nối phần này khi bạn chọn được nơi lưu đơn hàng.

## 5. Triển khai (deploy) lên internet

Vì là site tĩnh, có thể đưa lên bất kỳ hosting tĩnh nào miễn phí hoặc trả phí:
- Netlify / Vercel / Cloudflare Pages (kéo thả cả thư mục `moc-sa`).
- Hosting truyền thống (Hostinger...): upload toàn bộ nội dung thư mục `moc-sa` vào `public_html`.

Trước khi deploy, mở `sitemap.xml` và `robots.txt`, thay `https://mocsa.vn/` bằng tên miền thật của bạn.

## 6. Nội dung sản phẩm

Phần mô tả, công dụng và **19 thành phần/hoạt chất** (15 thảo dược + 4 dưỡng chất chăm sóc tóc: Olive Oil PEG-8 Esters, Polyquaternium-7, Behentrimonium Chloride, Piroctone Olamine) tại trang `san-pham-chi-tiet.html` (tab "Thành phần"), `index.html` và `ve-chung-toi.html` đã được cập nhật theo tài liệu sản phẩm bạn cung cấp (giới thiệu, công dụng, key ingredients, hướng dẫn sử dụng).

Lưu ý còn thiếu để hoàn thiện tuyệt đối:
- Phần "Hướng dẫn sử dụng" trong tài liệu bị cắt (chỉ còn tiêu đề "Spa tại nhà cùng Mộc Sa" + phần "Trải nghiệm khi dùng sản phẩm"), nên các bước gội đầu 01–04 trên web vẫn đang dùng nội dung quy trình gội đầu thông dụng do mình soạn – gửi thêm nếu bạn có đúng nội dung 4 bước gốc.
- Mục "Feedback từ khách hàng" trong tài liệu cũng chỉ có tiêu đề, chưa có nội dung đánh giá thật – các đánh giá khách hàng hiện tại trên web vẫn là nội dung minh họa.
- Mô tả hoạt chất **Piroctone Olamine** trong tài liệu gốc bị trùng lặp với mô tả của Behentrimonium Chloride (lỗi định dạng khi trích xuất tài liệu) – mình đã thay bằng mô tả đúng theo công dụng phổ biến của hoạt chất này (hỗ trợ làm sạch gàu). Xác nhận lại nếu bạn có mô tả chính thức khác.
