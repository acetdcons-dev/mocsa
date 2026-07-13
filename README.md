# Website Mộc Sa – Dầu Gội Thảo Dược

Website tĩnh (HTML/CSS/JS thuần, không cần cài đặt gì) cho thương hiệu **Mộc Sa**, gồm đầy đủ các trang chuẩn của một website bán hàng:

```
moc-sa/
├── index.html                 Trang chủ
├── ve-chung-toi.html          Về chúng tôi
├── san-pham.html              Danh sách sản phẩm
├── san-pham-chi-tiet.html     Chi tiết Dầu Gội Thảo Dược Mộc Sa (mô tả, thành phần, hướng dẫn dùng, đánh giá)
├── fonscare-dung-dich-ve-sinh.html  Chi tiết Dung Dịch Vệ Sinh Fons Care
├── fonscare-baby.html         Chi tiết Sữa Tắm Gội Thảo Dược Fons Care Baby
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
├── minh-chung-chat-luong.html Cam kết chất lượng (Mộc Sa: QUATEST 3 + phiếu công bố; Fons Care: nguồn gốc & hồ sơ công bố)
├── robots.txt                 Cấu hình cho công cụ tìm kiếm
├── sitemap.xml                Sơ đồ trang cho SEO (cần sửa lại domain thật trước khi deploy)
├── css/style.css              Toàn bộ giao diện
├── js/main.js                 Toàn bộ tương tác (giỏ hàng, đếm ngược, form, slider, FAQ accordion, lightbox gallery...)
└── assets/images/             Nơi chứa toàn bộ hình ảnh
```

Trang chi tiết sản phẩm (`san-pham-chi-tiet.html`) có mục **Câu hỏi thường gặp (FAQ)** 10 câu dạng accordion, khối **Kết quả thử nghiệm chất lượng** (QUATEST 3) với gallery 3 ảnh xem lightbox mượt (kéo trái/phải), và **Schema Product + FAQPage** cho SEO.

### Giao diện cao cấp (redesign — bản mới nhất)

Sau khi tham khảo các trang dầu gội/mỹ phẩm thật trên thị trường (Aesop, Kevin Murphy, Cocoon Việt Nam), đã điều chỉnh lại theo hướng **tối giản thật sự** thay vì thêm hiệu ứng:

- **Font**: bỏ font serif mảnh (Cormorant Garamond) vì tiếng Việt nhiều dấu render không đẹp — chuyển hẳn sang **Be Vietnam Pro** (đậm, letter-spacing âm nhẹ ở tiêu đề lớn) cho cả tiêu đề lẫn nội dung, giống cách các trang chăm sóc tóc cao cấp thật đang làm (sans-serif hiện đại, tiêu đề to đậm).
- **Bảng màu**: nâu ấm cao cấp (Primary `#8B5E3C`, Gold Accent `#C59B4D`, nền kem `#FAF7F2`/`#F6F1EA`) khai báo tại `:root` đầu `css/style.css`.
- **Ảnh**: đã rà lại toàn bộ ảnh thật — ảnh nào có chữ quảng cáo/banner dán đè lên (kiểu ảnh đăng Facebook/Shopee) đã ngừng dùng ở các vị trí nổi bật (Hero, ảnh sản phẩm chính, gallery), chỉ giữ lại **1 ảnh chai nền trong suốt** (`product-bottle.png`, sạch nhất) dùng thống nhất xuyên suốt site, và ảnh hộp+chai thật (`product-box.png`) cho gallery. Ảnh flatlay có banner chữ (`product-1.jpg`, `product-2.jpg`) và ảnh hướng dẫn 4 bước (`product-usage.jpg`) tạm ngừng dùng.
- **Hệ thống ảnh còn thiếu**: không còn khung viền đứt + chữ "IMAGE PLACEHOLDER" nữa — chỗ nào chưa có ảnh phù hợp sẽ chỉ là khoảng nền kem nhẹ, im lặng, không phá bố cục.
- Trang chủ được viết lại gọn hơn: bớt số section, danh sách thành phần dạng chữ (không cần ảnh), avatar đánh giá dạng chữ cái viết tắt, blog dạng list văn bản.

Các trang còn lại (Về Mộc Sa, Sản phẩm, Tin tức...) đã thừa hưởng font/màu/nút mới nhưng **chưa được rút gọn cấu trúc** như trang chủ — sẽ làm tiếp nếu cần.

Chưa làm: chuyển đổi ảnh sang WebP và đo Lighthouse thực tế — vẫn cần công cụ xử lý ảnh/trình duyệt mà môi trường hiện tại không có sẵn.

Menu điều hướng hiện tại: **Trang chủ / Sản phẩm / Kiến thức / Cam kết chất lượng / Về Mộc Sa / Liên hệ** — cấu trúc theo hướng thương hiệu lâu dài thay vì landing page bán hàng đơn thuần. (Trang này trước đây tên "Minh chứng chất lượng", đã đổi tên hiển thị cho nhẹ nhàng, tự nhiên hơn — đường dẫn file `minh-chung-chat-luong.html` giữ nguyên để không vỡ link.)

Trang **Cam kết chất lượng** giờ có 3 khối theo từng sản phẩm: Dầu Gội Mộc Sa (kết quả thử nghiệm QUATEST 3 + phiếu công bố, có sẵn nội dung thật), Dung Dịch Vệ Sinh Fons Care và Sữa Tắm Gội Fons Care Baby (khối "Nguồn gốc & cam kết" — vì chưa có hồ sơ kiểm nghiệm thật cho 2 sản phẩm Fons Care nên **chưa đưa ra số liệu/kết quả kiểm nghiệm cụ thể**, chỉ nêu cam kết chính hãng + thành phần; khi có hồ sơ thật, lưu ảnh theo tên ở bảng ảnh bên dưới để hiển thị).

2 trang chi tiết Fons Care cũng đã có thêm mục **Đánh giá sản phẩm**, **Câu hỏi thường gặp (FAQ)** và khối liên kết sang trang Cam kết chất lượng, đồng bộ với trang chi tiết Dầu Gội Mộc Sa. Trang chủ có thêm mục **"Sản phẩm khác từ Mộc Sa"** giới thiệu 2 sản phẩm Fons Care sau khối sản phẩm chủ lực. Trang **Kiến thức** có thêm 2 bài viết mới về chăm sóc vùng kín và tắm gội thảo dược cho bé.

### Về SEO & hiệu năng

Đã làm: Open Graph + Twitter Card cho toàn bộ 17 trang, Schema Product/FAQPage (trang sản phẩm) + Schema Organization (trang chủ), `loading="lazy"` cho ảnh dưới màn hình đầu (blog, đánh giá, ảnh phụ), `robots: noindex` cho 3 trang giao dịch (giỏ hàng/thanh toán/thành công).

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
| `product-usage.png` | Ảnh infographic 4 bước hướng dẫn sử dụng, hiển thị đầu tab "Hướng dẫn sử dụng" ở `san-pham-chi-tiet.html` | ✅ Đã có |
| `product-bottle.png` | Ảnh mặc định cho og:image/twitter:image (chia sẻ mạng xã hội) trên các trang chưa có ảnh riêng, thẻ sản phẩm ở `san-pham.html` &amp; `ve-chung-toi.html` | ✅ Đã có |
| `product-gallery-1.jpg` → `product-gallery-9.jpg` | **Gallery 9 ảnh** ở trang chi tiết Dầu Gội Mộc Sa `san-pham-chi-tiet.html` (ảnh chính + 9 thumbnail bấm chuyển), đã thay hẳn cho `product-bottle.png`/`product-box.png`/`product-2.png` cũ | ✅ Đã có — đã resize còn tối đa 1200px cạnh dài + nén lại (quality 82), tổng dung lượng 9 ảnh giảm từ ~15MB xuống ~1.4MB để web tải nhanh |
| `hero-banner.jpg` | Ảnh nền hero-banner trang chủ (đặt dưới lớp overlay tối để chữ trắng dễ đọc) | ✅ Đã có – khuyến nghị **1920 × 800px**, ảnh càng tối/ít chi tiết vụn càng dễ đọc chữ đè lên |
| `about.png` | Ảnh mục "Về chúng tôi" | ✅ Đã có |
| `before-after.png` | Ảnh so sánh trước/sau (chi tiết sản phẩm) | ✅ Đã có |
| `certificate.jpg` | **Phiếu công bố sản phẩm mỹ phẩm** – khối "Đã công bố sản phẩm mỹ phẩm" ở trang Về chúng tôi & Chi tiết sản phẩm | ⬜ Chưa có – lưu ảnh chụp/scan phiếu công bố vào đúng tên này |
| `kiem-nghiem-1.jpg`, `kiem-nghiem-2.jpg`, `kiem-nghiem-3.jpg` | **Phiếu kết quả kiểm nghiệm (3 trang)** – khối "Đã kiểm nghiệm chất lượng" (nằm cạnh khối công bố) | ⬜ Chưa có – lưu đúng 3 ảnh theo thứ tự trang 1/2/3, mỗi trang bấm xem riêng được |
| `fonscare-dung-dich-ve-sinh.jpg` | Ảnh chai Dung dịch vệ sinh Fons Care – trang `fonscare-dung-dich-ve-sinh.html` + card ở `san-pham.html` | ⬜ Chưa có – khuyến nghị **1000 × 1000px**, nền trắng/kem giống các ảnh sản phẩm hiện có |
| `fonscare-baby.jpg` | Ảnh chai Sữa tắm gội Fons Care Baby – trang `fonscare-baby.html` + card ở `san-pham.html` | ⬜ Chưa có – khuyến nghị **1000 × 1000px**, nền trắng/kem giống các ảnh sản phẩm hiện có |
| `blog-1.jpg` → `blog-8.jpg` | Ảnh minh hoạ 8 bài viết ở trang Tin tức (`tin-tuc.html`, và ảnh bìa ở `tin-tuc-chi-tiet.html` dùng `blog-1.jpg`) — `blog-7.jpg` = bài chăm sóc vùng kín, `blog-8.jpg` = bài tắm gội thảo dược cho bé | ⬜ Chưa có – lưu 8 ảnh, đánh số theo đúng thứ tự bài viết hiển thị trên trang Tin tức |
| `fonscare-ve-sinh-cert.jpg` | Ảnh hồ sơ công bố / kết quả kiểm nghiệm Dung Dịch Vệ Sinh Fons Care – trang `minh-chung-chat-luong.html` (mục `#fonscare-ve-sinh`) | ⬜ Chưa có – khuyến nghị **1000 × 1400px**, chỉ thêm khi có hồ sơ thật |
| `fonscare-baby-cert.jpg` | Ảnh hồ sơ công bố / kết quả kiểm nghiệm Sữa Tắm Gội Fons Care Baby – trang `minh-chung-chat-luong.html` (mục `#fonscare-baby`) | ⬜ Chưa có – khuyến nghị **1000 × 1400px**, chỉ thêm khi có hồ sơ thật |
| `ingredient-caffeine.jpg`, `ingredient-but-giam.jpg`, `ingredient-xuong-rong.jpg`, `ingredient-gung.jpg`, `ingredient-tia-to-bo-ket.jpg`, `ingredient-nam-men.jpg` | Ảnh từng thành phần trong card thảo dược (trang Về Mộc Sa) | ⬜ Chưa có – nền kem nhẹ, im lặng cho tới khi có ảnh, khuyến nghị **1200 × 1200px** mỗi ảnh |

**Logo, túi vải, hoa trang trí dạng vector** (`logo.svg`, `logo-white.svg`, `logo-mark.svg`, `logo-mark-white.svg`, `logo-icon.svg`, `tote-bag.svg`, `flower.svg`) vẫn giữ làm **bản dự phòng** — web tự quay lại dùng các file này nếu ảnh thật (`logo.png`, `tote-bag.png`) bị thiếu, nên không bao giờ vỡ hình.

> Mẹo: đặt tên file/định dạng đúng như bảng trên — nếu ảnh bạn có là định dạng khác (ví dụ certificate là `.png` thay vì `.jpg`), báo mình để sửa lại đuôi file tương ứng trong code, hoặc cứ lưu đúng tên gốc (không phần đuôi) rồi báo mình đuôi thật là gì.

## 3. Cập nhật thông tin liên hệ / chính sách

Hotline/Zalo hiện tại: `0325.343.663` (đã cập nhật khắp 17 trang). Fanpage: [Mộc Sa Việt Nam](https://www.facebook.com/mocsavietnam) (đã gắn ở footer). Địa chỉ và email hiện vẫn là dữ liệu mẫu (`123 Đường ABC, Quận 1, TP.HCM`, `hello@mocsa.vn`) — tìm trực tiếp trong phần `<footer>` của mỗi trang để thay khi có thông tin thật.

## 4. Giỏ hàng & đặt hàng hoạt động thế nào

Từ khi có 3 sản phẩm (Dầu gội Mộc Sa, Dung dịch vệ sinh Fons Care, Sữa tắm gội Fons Care Baby), giỏ hàng lưu một **map productId → số lượng** dưới key `mocsa_cart` trong `localStorage` (không cần backend). Danh mục sản phẩm (tên/giá/ảnh) khai báo tại biến `PRODUCTS` đầu file `js/main.js` — thêm sản phẩm mới chỉ cần thêm 1 entry vào đó rồi gắn `data-product-id="..."` vào nút mua trên trang sản phẩm tương ứng.

- "Thêm vào giỏ hàng" → cộng số lượng đúng sản phẩm đó, mở giỏ hàng mini.
- "Mua ngay" → mở khung đặt hàng nhanh cho riêng sản phẩm đó (COD), hoặc chuyển tới `thanh-toan.html` để thanh toán cả giỏ hàng nhiều sản phẩm.
- Trang `gio-hang.html` và `thanh-toan.html` hiển thị đầy đủ từng dòng sản phẩm trong giỏ, tự tính tạm tính/tổng cộng.
- Trang `thanh-toan.html` sau khi bấm "Hoàn tất đặt hàng" sẽ chuyển tới `dat-hang-thanh-cong.html` kèm mã đơn hàng, đồng thời xoá sạch giỏ hàng.

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
