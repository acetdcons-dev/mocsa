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

**Vì sao chưa tự lên hình:** mình có thể **xem** được ảnh bạn dán/đính kèm trong chat (mô tả được chi tiết từng ảnh), nhưng công cụ mình đang dùng **không có chức năng tải/lưu ảnh đính kèm thành file** trên máy. Đây là giới hạn kỹ thuật của môi trường chat, không phải do bỏ sót. Cách duy nhất để đưa đúng ảnh thật vào web là **bạn tự lưu từng ảnh** (chuột phải vào ảnh → "Lưu hình ảnh thành..." / "Save image as...") vào đúng đường dẫn `assets/images/` với đúng tên file bên dưới — code đã được chuẩn bị sẵn để ảnh tự hiển thị ngay khi file xuất hiện đúng tên, không cần sửa gì thêm.

### Bảng ánh xạ 14 ảnh bạn vừa gửi → tên file cần lưu

| # ảnh bạn gửi | Nội dung ảnh | Lưu thành tên file |
|---|---|---|
| 1 | Ảnh chai cận cảnh với gừng/xương rồng/hibiscus, có banner "15 THẢO DƯỢC VIỆT" | `product-1.jpg` |
| 2 | Infographic 4 bước "HƯỚNG DẪN SỬ DỤNG" | `product-usage.jpg` |
| 3 | Ảnh chai trên bàn spa cùng xà phòng, mút tắm | `product-2.jpg` |
| 4 | Ảnh ghép Before/After (đã có sẵn cả 2 nửa trong 1 ảnh) | `before-after.jpg` |
| 5 | Ảnh mockup bài đăng Instagram + đánh giá "Trang Trang" | `social-proof.jpg` *(tuỳ chọn, chưa có vị trí gắn sẵn trên web – dùng để đăng mạng xã hội hoặc báo mình nếu muốn gắn thêm)* |
| 6–9 | 4 banner nền gỗ "Dầu gội thảo dược từ thiên nhiên Việt" (1 vuông + 3 ngang gần giống nhau) | Chọn **1 ảnh đẹp nhất** lưu thành `about.jpg` |
| 10 | Ảnh hộp giấy + chai (nền trong suốt) | `product-box.png` |
| 11 | Ảnh chai riêng, nền trong suốt | `product-bottle.png` |
| 12, 13 | Logo (2 bản, chọn bản nét rõ/độ phân giải cao hơn) | `logo.png` |
| 14 | Ảnh chụp túi vải Mộc Sa thật | `tote-bag.jpg` |

> Ảnh #4 (Before/After) là 1 ảnh ghép sẵn 2 nửa nên mình đã đổi khối "So sánh trước/sau" ở trang chi tiết sản phẩm từ dạng **slider kéo tương tác** sang hiển thị **1 ảnh tĩnh** cho khớp với ảnh bạn có. Nếu sau này bạn chụp được 2 ảnh riêng biệt (cùng góc, 1 ảnh trước – 1 ảnh sau), báo mình để đổi lại thành slider kéo mượt hơn.

### Bảng đầy đủ các vị trí ảnh trên web

| Tên file cần lưu | Dùng ở đâu | Gợi ý ảnh |
|---|---|---|
| `logo.png` | Logo ở header (mọi trang) | Ảnh #12/#13 – nếu chưa lưu, web tự dùng logo vector dự phòng |
| `tote-bag.jpg` | Ảnh túi vải quà tặng (trang chủ, chi tiết sản phẩm) | Ảnh #14 – nếu chưa lưu, web tự dùng icon vector dự phòng |
| `product-1.jpg` | Ảnh chính sản phẩm (trang chủ, danh sách, chi tiết, giỏ hàng, popup) | Ảnh #1 |
| `product-2.jpg` | Ảnh phụ trong gallery chi tiết sản phẩm | Ảnh #3 |
| `product-box.png` | Ảnh hộp + chai | Ảnh #10 |
| `product-usage.jpg` | Ảnh phụ gallery | Ảnh #2 |
| `product-bottle.png` | Ảnh lớn ở Hero trang chủ | Ảnh #11 |
| `about.jpg` | Ảnh mục "Về chúng tôi" | 1 trong 4 ảnh banner #6–9 |
| `before-after.jpg` | Ảnh so sánh trước/sau (chi tiết sản phẩm) | Ảnh #4 |
| `certificate.jpg` | Ảnh phiếu công bố mỹ phẩm | Ảnh phiếu công bố (chưa có trong lần gửi này) |
| `avatar-1.jpg`, `avatar-2.jpg`, `avatar-3.jpg` | Ảnh đại diện khách hàng đánh giá | Ảnh khách hàng hoặc để trống dùng placeholder |
| `blog-1.jpg` → `blog-6.jpg` | Ảnh bài viết Tin tức | Ảnh minh họa mỗi bài viết |
| `product-conditioner.jpg`, `product-serum.jpg` | Ảnh sản phẩm "Sắp ra mắt" | Có thể để placeholder nếu chưa có |

**Logo, túi vải (dự phòng), hoa trang trí** (`logo.svg`, `logo-white.svg`, `logo-mark.svg`, `logo-mark-white.svg`, `logo-icon.svg`, `tote-bag.svg`, `flower.svg`) vẫn giữ làm **bản vector dự phòng** – web sẽ tự động dùng ảnh thật (`logo.png`, `tote-bag.jpg`) ngay khi bạn lưu vào, và tự quay lại dùng bản vector nếu ảnh thật chưa có, nên không bao giờ bị vỡ hình.

> Mẹo: đặt tên file/định dạng đúng như bảng trên (jpg/png) — nếu muốn dùng đuôi khác (webp, jpeg...) thì sửa lại phần đuôi file trong thẻ `<img src="...">` tương ứng trong các file `.html`.

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
