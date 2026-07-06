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
├── robots.txt                 Cấu hình cho công cụ tìm kiếm
├── sitemap.xml                Sơ đồ trang cho SEO (cần sửa lại domain thật trước khi deploy)
├── css/style.css              Toàn bộ giao diện
├── js/main.js                 Toàn bộ tương tác (giỏ hàng, đếm ngược, form, slider, FAQ accordion...)
└── assets/images/             Nơi chứa toàn bộ hình ảnh
```

Trang chi tiết sản phẩm (`san-pham-chi-tiet.html`) cũng đã có thêm mục **Câu hỏi thường gặp (FAQ)** dạng accordion.

## 1. Cách xem thử website

Mở trực tiếp file `index.html` bằng trình duyệt, hoặc để mượt nhất (font, ảnh load đúng), dùng 1 server tĩnh đơn giản:

- VS Code: cài extension **Live Server** → chuột phải `index.html` → "Open with Live Server".
- Hoặc chạy: `npx serve .` trong thư mục `moc-sa` rồi mở địa chỉ hiển thị.

## 2. Thay ảnh thật (QUAN TRỌNG)

Hiện tại các vị trí ảnh sản phẩm/thương hiệu đang hiển thị **khung placeholder** (nền màu kem + icon) vì mình chưa có file ảnh gốc của bạn ở dạng tệp. Bạn chỉ cần lưu các ảnh đã gửi (banner, chai sản phẩm, túi vải...) vào đúng tên file bên dưới trong thư mục `assets/images/` — ảnh sẽ tự động hiển thị ngay, không cần sửa code:

| Tên file cần lưu | Dùng ở đâu | Gợi ý ảnh |
|---|---|---|
| `product-1.jpg` | Ảnh chính sản phẩm (trang chủ, danh sách, chi tiết, giỏ hàng, popup) | Ảnh chai dầu gội chụp riêng, nền trắng/kem |
| `product-2.jpg` | Ảnh phụ trong gallery chi tiết sản phẩm | Ảnh chai + nguyên liệu (gừng, xương rồng...) |
| `product-box.png` | Ảnh hộp + chai | Ảnh hộp giấy đặt cạnh chai |
| `product-usage.jpg` | Ảnh phụ gallery | Ảnh hướng dẫn sử dụng 4 bước |
| `product-bottle.png` | Ảnh lớn ở Hero trang chủ | Ảnh chai dầu gội nền trong suốt (PNG) |
| `about.jpg` | Ảnh mục "Về chúng tôi" | Ảnh nguyên liệu/thảo dược hoặc hình ảnh thương hiệu |
| `before.jpg` / `after.jpg` | Ảnh so sánh trước/sau | 2 ảnh tóc trước và sau khi dùng |
| `certificate.jpg` | Ảnh phiếu công bố mỹ phẩm | Ảnh phiếu công bố (đã có khung vàng) |
| `avatar-1.jpg`, `avatar-2.jpg`, `avatar-3.jpg` | Ảnh đại diện khách hàng đánh giá | Ảnh khách hàng hoặc để trống dùng placeholder |
| `blog-1.jpg` → `blog-6.jpg` | Ảnh bài viết Tin tức | Ảnh minh họa mỗi bài viết |
| `product-conditioner.jpg`, `product-serum.jpg` | Ảnh sản phẩm "Sắp ra mắt" | Có thể để placeholder nếu chưa có |

**Logo, túi vải, hoa trang trí** (`logo.svg`, `logo-white.svg`, `logo-mark.svg`, `logo-mark-white.svg`, `logo-icon.svg`, `tote-bag.svg`, `flower.svg`) mình đã **vẽ lại bằng vector (SVG)** bám sát bộ nhận diện Mộc Sa bạn gửi (icon lúa vàng + wordmark "Mộc Sa"), nên đã lên hình đẹp sẵn — nếu bạn có file logo gốc (AI/PNG nền trong suốt) muốn dùng chính xác 100%, chỉ cần thay đè các file cùng tên trong `assets/images/`.

> Mẹo: đặt tên file/định dạng đúng như bảng trên (jpg/png) — nếu muốn dùng đuôi khác (webp, jpeg...) thì sửa lại phần đuôi file trong thẻ `<img src="...">` tương ứng trong các file `.html`.

## 3. Cập nhật thông tin liên hệ / chính sách

Tìm và sửa trực tiếp trong phần `<footer>` của mỗi trang: địa chỉ, hotline, email, mạng xã hội. Số hotline `1900.000.000` xuất hiện ở nhiều trang — nên tìm & thay toàn bộ (Find & Replace) khi có số thật.

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
