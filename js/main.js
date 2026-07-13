/* =========================================================
   MỘC SA – MAIN.JS (dùng chung cho toàn bộ website)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- DANH MỤC SẢN PHẨM ---------- */
  var PRODUCTS = {
    "moc-sa-dau-goi": {
      id: "moc-sa-dau-goi",
      name: "Dầu Gội Thảo Dược Mộc Sa 250ml",
      price: 196000,
      oldPrice: 245000,
      image: "assets/images/product-bottle.png",
      gift: "Túi vải Mộc Sa"
    },
    "fonscare-dung-dich-ve-sinh": {
      id: "fonscare-dung-dich-ve-sinh",
      name: "Dung Dịch Vệ Sinh Fons Care 100ml",
      price: 70000,
      oldPrice: null,
      image: "assets/images/fonscare-dung-dich-ve-sinh.jpg",
      gift: null
    },
    "fonscare-baby": {
      id: "fonscare-baby",
      name: "Sữa Tắm Gội Thảo Dược Fons Care Baby 300ml",
      price: 135000,
      oldPrice: null,
      image: "assets/images/fonscare-baby.jpg",
      gift: null
    }
  };
  var DEFAULT_PRODUCT_ID = "moc-sa-dau-goi";
  var CART_KEY = "mocsa_cart";
  var DEADLINE_KEY = "mocsa_deadline";

  function formatVND(n) {
    return n.toLocaleString("vi-VN") + "₫";
  }

  /* ---------- CART (localStorage – map productId -> qty) ---------- */
  function getCart() {
    try {
      var raw = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
      return (raw && typeof raw === "object") ? raw : {};
    } catch (e) {
      return {};
    }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadges();
    renderMiniCart();
    if (document.body.dataset.page === "cart") renderCartPage();
  }
  function getCartQty(productId) {
    var v = getCart()[productId];
    return (typeof v === "number" && v > 0) ? v : 0;
  }
  function getCartTotalQty() {
    var cart = getCart();
    var total = 0;
    Object.keys(cart).forEach(function (id) { total += cart[id] || 0; });
    return total;
  }
  function setItemQty(productId, qty) {
    var cart = getCart();
    qty = Math.max(0, Math.min(99, qty));
    if (qty <= 0) delete cart[productId];
    else cart[productId] = qty;
    saveCart(cart);
  }
  function addToCart(productId, amount) {
    setItemQty(productId, getCartQty(productId) + (amount || 1));
  }
  function removeFromCart(productId) {
    setItemQty(productId, 0);
  }
  function clearCart() {
    saveCart({});
  }
  function updateCartBadges() {
    var total = getCartTotalQty();
    document.querySelectorAll("#cartCount").forEach(function (el) {
      el.textContent = total;
    });
  }
  function cartEntries() {
    var cart = getCart();
    return Object.keys(cart)
      .filter(function (id) { return cart[id] > 0 && PRODUCTS[id]; })
      .map(function (id) { return { id: id, qty: cart[id], product: PRODUCTS[id] }; });
  }

  function renderMiniCart() {
    var body = document.getElementById("miniCartBody");
    var foot = document.getElementById("miniCartFoot");
    if (!body) return;
    var entries = cartEntries();
    if (!entries.length) {
      body.innerHTML = '<p class="mini-cart__empty">Chưa có sản phẩm nào trong giỏ.</p>';
      if (foot) foot.hidden = true;
      return;
    }
    var total = 0;
    body.innerHTML = entries.map(function (entry) {
      var p = entry.product;
      var lineTotal = p.price * entry.qty;
      total += lineTotal;
      return '<div class="mini-cart__item" data-id="' + entry.id + '">' +
        '<img src="' + p.image + '" alt="" onerror="this.parentElement.classList.add(\'img-fallback--bottle-sm\')">' +
        '<div class="mini-cart__item-info">' +
        "<strong>" + p.name + "</strong>" +
        '<div class="mini-cart__item-price">' + formatVND(p.price) + "</div>" +
        '<div class="mini-cart__qty">' +
        '<button type="button" data-mini-minus>−</button>' +
        "<span>" + entry.qty + "</span>" +
        '<button type="button" data-mini-plus>+</button>' +
        "</div>" +
        "</div>" +
        '<button class="mini-cart__remove" data-mini-remove>Xóa</button>' +
        "</div>";
    }).join("");
    if (foot) {
      foot.hidden = false;
      var totalEl = document.getElementById("miniCartTotal");
      if (totalEl) totalEl.textContent = formatVND(total);
    }
    body.querySelectorAll(".mini-cart__item").forEach(function (item) {
      var id = item.dataset.id;
      var minus = item.querySelector("[data-mini-minus]");
      var plus = item.querySelector("[data-mini-plus]");
      var remove = item.querySelector("[data-mini-remove]");
      if (minus) minus.addEventListener("click", function () { setItemQty(id, getCartQty(id) - 1); });
      if (plus) plus.addEventListener("click", function () { setItemQty(id, getCartQty(id) + 1); });
      if (remove) remove.addEventListener("click", function () { removeFromCart(id); });
    });
  }

  function renderCartPage() {
    var wrap = document.getElementById("cartPageWrap");
    if (!wrap) return;
    var entries = cartEntries();
    var empty = document.getElementById("cartEmpty");
    var filled = document.getElementById("cartFilled");
    if (!entries.length) {
      if (empty) empty.hidden = false;
      if (filled) filled.hidden = true;
      return;
    }
    if (empty) empty.hidden = true;
    if (filled) filled.hidden = false;

    var tbody = document.getElementById("cartTableBody");
    var subTotal = 0;
    if (tbody) {
      tbody.innerHTML = entries.map(function (entry) {
        var p = entry.product;
        var lineTotal = p.price * entry.qty;
        subTotal += lineTotal;
        return '<tr data-id="' + entry.id + '">' +
          '<td><div class="cart-table__product"><img src="' + p.image + '" alt="" onerror="this.parentElement.classList.add(\'img-fallback--bottle-sm\')">' +
          "<div><strong>" + p.name + "</strong>" +
          (p.gift ? '<br><small style="color:var(--gold-600);">🎁 Tặng kèm ' + p.gift + "</small>" : "") +
          "</div></div></td>" +
          "<td>" + formatVND(p.price) + "</td>" +
          '<td><div class="qty-stepper"><button type="button" class="cart-row-minus">−</button><input type="text" value="' + entry.qty + '" readonly><button type="button" class="cart-row-plus">+</button></div></td>' +
          "<td><strong>" + formatVND(lineTotal) + "</strong></td>" +
          '<td><button class="mini-cart__remove cart-row-remove">Xóa</button></td>' +
          "</tr>";
      }).join("");
      tbody.querySelectorAll("tr").forEach(function (row) {
        var id = row.dataset.id;
        row.querySelector(".cart-row-minus").addEventListener("click", function () { setItemQty(id, getCartQty(id) - 1); });
        row.querySelector(".cart-row-plus").addEventListener("click", function () { setItemQty(id, getCartQty(id) + 1); });
        row.querySelector(".cart-row-remove").addEventListener("click", function () { removeFromCart(id); });
      });
    } else {
      subTotal = entries.reduce(function (sum, entry) { return sum + entry.product.price * entry.qty; }, 0);
    }
    var subTotalEl = document.getElementById("cartSubTotal");
    if (subTotalEl) subTotalEl.textContent = formatVND(subTotal);
    var grandTotalEl = document.getElementById("cartGrandTotal");
    if (grandTotalEl) grandTotalEl.textContent = formatVND(subTotal);
  }

  /* ---------- TOAST ---------- */
  var toastTimer;
  function showToast(msg) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  /* ---------- HEADER SCROLL / MOBILE NAV ---------- */
  function initHeader() {
    var header = document.getElementById("header");
    if (header) {
      window.addEventListener("scroll", function () {
        header.classList.toggle("is-scrolled", window.scrollY > 10);
      });
    }
    var hamburger = document.getElementById("hamburger");
    var nav = document.getElementById("nav");
    var overlay = document.getElementById("overlay");
    function closeNav() {
      if (nav) nav.classList.remove("is-open");
      if (overlay && !document.getElementById("miniCart").classList.contains("is-open")) {
        overlay.classList.remove("is-open");
      }
    }
    if (hamburger && nav) {
      hamburger.addEventListener("click", function () {
        nav.classList.toggle("is-open");
        if (overlay) overlay.classList.toggle("is-open", nav.classList.contains("is-open"));
      });
    }
    document.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    /* active link theo trang hiện tại */
    var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav__link").forEach(function (link) {
      var href = (link.getAttribute("href") || "").toLowerCase();
      if (href === current || (current === "" && href === "index.html")) {
        link.classList.add("is-active");
      }
    });

    if (overlay) {
      overlay.addEventListener("click", function () {
        closeNav();
        closeMiniCart();
      });
    }
  }

  /* ---------- MINI CART OPEN/CLOSE ---------- */
  function openMiniCart() {
    var mc = document.getElementById("miniCart");
    var overlay = document.getElementById("overlay");
    if (mc) mc.classList.add("is-open");
    if (overlay) overlay.classList.add("is-open");
  }
  function closeMiniCart() {
    var mc = document.getElementById("miniCart");
    var overlay = document.getElementById("overlay");
    var nav = document.getElementById("nav");
    if (mc) mc.classList.remove("is-open");
    if (overlay && !(nav && nav.classList.contains("is-open"))) overlay.classList.remove("is-open");
  }
  function initMiniCart() {
    var cartBtn = document.getElementById("cartBtn");
    var closeBtn = document.getElementById("miniCartClose");
    var checkoutBtn = document.getElementById("miniCartCheckout");
    if (cartBtn) cartBtn.addEventListener("click", openMiniCart);
    if (closeBtn) closeBtn.addEventListener("click", closeMiniCart);
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", function () {
        window.location.href = "gio-hang.html";
      });
    }
    renderMiniCart();
  }

  /* ---------- ADD TO CART BUTTONS ---------- */
  function initAddToCart() {
    document.querySelectorAll("[data-add-to-cart]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var productId = btn.dataset.productId || DEFAULT_PRODUCT_ID;
        var qtyInput = document.getElementById("qtyValue");
        var qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
        if (btn.hasAttribute("data-open-checkout")) {
          openCheckoutModal(productId, qty);
          return;
        }
        addToCart(productId, qty);
        showToast("Đã thêm " + qty + " sản phẩm vào giỏ hàng");
        openMiniCart();
      });
    });
  }

  /* ---------- QUANTITY STEPPER (trang sản phẩm) ---------- */
  function initQtyStepper() {
    var minus = document.getElementById("qtyMinus");
    var plus = document.getElementById("qtyPlus");
    var input = document.getElementById("qtyValue");
    if (!input) return;
    function clamp(v) { return Math.max(1, Math.min(20, v)); }
    if (minus) minus.addEventListener("click", function () {
      input.value = clamp((parseInt(input.value, 10) || 1) - 1);
    });
    if (plus) plus.addEventListener("click", function () {
      input.value = clamp((parseInt(input.value, 10) || 1) + 1);
    });
  }

  /* ---------- CART PAGE ---------- */
  function initCartPageControls() {
    renderCartPage();
  }

  /* ---------- COUNTDOWN ---------- */
  function initCountdown() {
    var el = document.getElementById("countdown");
    if (!el) return;
    var h = document.getElementById("cd-h"), m = document.getElementById("cd-m"), s = document.getElementById("cd-s");
    var deadline = parseInt(localStorage.getItem(DEADLINE_KEY), 10);
    var now = Date.now();
    if (!deadline || deadline < now) {
      deadline = now + 6 * 60 * 60 * 1000;
      localStorage.setItem(DEADLINE_KEY, String(deadline));
    }
    function tick() {
      var diff = deadline - Date.now();
      if (diff <= 0) {
        deadline = Date.now() + 6 * 60 * 60 * 1000;
        localStorage.setItem(DEADLINE_KEY, String(deadline));
        diff = deadline - Date.now();
      }
      var hh = Math.floor(diff / 3600000);
      var mm = Math.floor((diff % 3600000) / 60000);
      var ss = Math.floor((diff % 60000) / 1000);
      if (h) h.textContent = String(hh).padStart(2, "0");
      if (m) m.textContent = String(mm).padStart(2, "0");
      if (s) s.textContent = String(ss).padStart(2, "0");
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- FAQ ACCORDION ---------- */
  function initAccordion() {
    document.querySelectorAll(".acc-item__head").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".acc-item");
        var wasOpen = item.classList.contains("is-open");
        item.parentElement.querySelectorAll(".acc-item").forEach(function (i) {
          i.classList.remove("is-open");
        });
        if (!wasOpen) item.classList.add("is-open");
      });
    });
  }

  /* ---------- TABS (trang chi tiết sản phẩm) ---------- */
  function initTabs() {
    var nav = document.querySelector(".tabs__nav");
    if (!nav) return;
    var buttons = nav.querySelectorAll(".tabs__btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("is-active"); });
        document.querySelectorAll(".tabs__panel").forEach(function (p) { p.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add("is-active");
      });
    });
  }

  /* ---------- GALLERY THUMBS + LIGHTBOX ---------- */
  function initGallery() {
    var main = document.getElementById("galleryMain");
    var thumbs = document.querySelectorAll("#galleryThumbs .thumb");
    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        thumbs.forEach(function (t) { t.classList.remove("is-active"); });
        thumb.classList.add("is-active");
        if (main) {
          main.classList.remove("img-fallback--bottle");
          main.style.display = "";
          main.src = thumb.dataset.img;
        }
      });
    });
    if (main) {
      main.parentElement.addEventListener("click", function () {
        openLightbox(main.src, main.alt);
      });
    }
  }

  var lightboxGallery = [];
  var lightboxIndex = 0;
  function openLightbox(src, alt, gallery, index) {
    var lb = document.getElementById("lightbox");
    var img = document.getElementById("lightboxImg");
    if (!lb || !img) return;
    img.src = src;
    img.alt = alt || "";
    lb.classList.add("is-open");
    lightboxGallery = gallery || [];
    lightboxIndex = index || 0;
    var showNav = lightboxGallery.length > 1;
    var prev = document.getElementById("lightboxPrev");
    var next = document.getElementById("lightboxNext");
    if (prev) prev.hidden = !showNav;
    if (next) next.hidden = !showNav;
  }
  function showLightboxAt(i) {
    if (!lightboxGallery.length) return;
    lightboxIndex = (i + lightboxGallery.length) % lightboxGallery.length;
    var img = document.getElementById("lightboxImg");
    var target = lightboxGallery[lightboxIndex];
    if (!img || !target) return;
    img.style.opacity = "0";
    setTimeout(function () {
      img.src = target.src;
      img.alt = target.alt || "";
      img.style.opacity = "1";
    }, 150);
  }
  function initLightbox() {
    var lb = document.getElementById("lightbox");
    var closeBtn = document.getElementById("lightboxClose");
    var prevBtn = document.getElementById("lightboxPrev");
    var nextBtn = document.getElementById("lightboxNext");
    if (closeBtn) closeBtn.addEventListener("click", function () { lb.classList.remove("is-open"); });
    if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) lb.classList.remove("is-open"); });
    if (prevBtn) prevBtn.addEventListener("click", function () { showLightboxAt(lightboxIndex - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { showLightboxAt(lightboxIndex + 1); });
    document.addEventListener("keydown", function (e) {
      if (!lb || !lb.classList.contains("is-open")) return;
      if (e.key === "Escape") lb.classList.remove("is-open");
      if (e.key === "ArrowLeft") showLightboxAt(lightboxIndex - 1);
      if (e.key === "ArrowRight") showLightboxAt(lightboxIndex + 1);
    });

    document.querySelectorAll(".cert-strip__img").forEach(function (img) {
      img.addEventListener("click", function () { openLightbox(img.src, img.alt); });
    });
    document.querySelectorAll(".cert-strip__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.closest(".cert-strip").querySelector(".cert-strip__img");
        if (img) openLightbox(img.src, img.alt);
      });
    });

    var proofImgs = Array.prototype.slice.call(document.querySelectorAll(".proof__img"));
    if (proofImgs.length) {
      var gallery = proofImgs.map(function (img) { return { src: img.src, alt: img.alt }; });
      proofImgs.forEach(function (img, i) {
        img.addEventListener("click", function () { openLightbox(img.src, img.alt, gallery, i); });
      });
      var viewBtn = document.getElementById("proofViewBtn");
      if (viewBtn) viewBtn.addEventListener("click", function () { openLightbox(gallery[0].src, gallery[0].alt, gallery, 0); });
    }
  }

  /* ---------- BEFORE / AFTER SLIDER ---------- */
  function initBeforeAfter() {
    var slider = document.getElementById("baSlider");
    var handle = document.getElementById("baHandle");
    var beforeWrap = document.getElementById("baBeforeWrap");
    if (!slider || !handle || !beforeWrap) return;
    var dragging = false;

    function setPosition(clientX) {
      var rect = slider.getBoundingClientRect();
      var pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(5, Math.min(95, pct));
      beforeWrap.style.width = pct + "%";
      handle.style.left = pct + "%";
      var img = beforeWrap.querySelector("img");
      if (img) img.style.width = rect.width + "px";
    }
    function onMove(e) {
      if (!dragging) return;
      var x = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(x);
    }
    handle.addEventListener("mousedown", function () { dragging = true; });
    handle.addEventListener("touchstart", function () { dragging = true; }, { passive: true });
    window.addEventListener("mouseup", function () { dragging = false; });
    window.addEventListener("touchend", function () { dragging = false; });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    var rectInit = slider.getBoundingClientRect();
    var img0 = beforeWrap.querySelector("img");
    if (img0) img0.style.width = rectInit.width + "px";
  }

  /* ---------- BACK TO TOP ---------- */
  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("is-visible", window.scrollY > 500);
    });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- STICKY MOBILE BUY BAR ---------- */
  function initStickyBuy() {
    var bar = document.getElementById("stickyBuy");
    if (!bar) return;
    window.addEventListener("scroll", function () {
      bar.classList.toggle("is-active", window.scrollY > 480);
    });
  }

  /* ---------- CHECKOUT MODAL (mua nhanh) ---------- */
  var checkoutProductId = DEFAULT_PRODUCT_ID;
  function openCheckoutModal(productId, qty) {
    var modal = document.getElementById("checkoutModal");
    if (!modal) {
      window.location.href = "thanh-toan.html";
      return;
    }
    checkoutProductId = (productId && PRODUCTS[productId]) ? productId : DEFAULT_PRODUCT_ID;
    var p = PRODUCTS[checkoutProductId];
    var summary = document.getElementById("checkoutSummary");
    if (summary && p) {
      summary.innerHTML =
        '<img src="' + p.image + '" alt="" onerror="this.parentElement.classList.add(\'img-fallback--bottle-sm\')">' +
        "<div><strong>" + p.name + "</strong>" +
        (p.gift ? "<span>Tặng kèm: " + p.gift + "</span>" : "") +
        "</div>" +
        '<div class="modal__order-price" id="checkoutUnitPrice">' + formatVND(p.price) + "</div>";
    }
    var qtyInput = document.getElementById("checkoutQty");
    if (qtyInput) qtyInput.value = qty || 1;
    updateCheckoutTotal();
    document.getElementById("checkoutBody").hidden = false;
    document.getElementById("checkoutSuccess").hidden = true;
    modal.classList.add("is-open");
  }
  function closeCheckoutModal() {
    var modal = document.getElementById("checkoutModal");
    if (modal) modal.classList.remove("is-open");
  }
  function updateCheckoutTotal() {
    var qtyInput = document.getElementById("checkoutQty");
    var totalEl = document.getElementById("checkoutTotal");
    var p = PRODUCTS[checkoutProductId];
    if (!qtyInput || !totalEl || !p) return;
    var qty = parseInt(qtyInput.value, 10) || 1;
    totalEl.textContent = formatVND(p.price * qty);
  }
  function initCheckoutModal() {
    var modal = document.getElementById("checkoutModal");
    if (!modal) return;
    var closeBtn = document.getElementById("checkoutClose");
    var qtyInput = document.getElementById("checkoutQty");
    var form = document.getElementById("checkoutForm");
    var successClose = document.getElementById("checkoutSuccessClose");

    if (closeBtn) closeBtn.addEventListener("click", closeCheckoutModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeCheckoutModal(); });
    if (qtyInput) qtyInput.addEventListener("input", updateCheckoutTotal);

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        document.getElementById("checkoutBody").hidden = true;
        document.getElementById("checkoutSuccess").hidden = false;
        form.reset();
      });
    }
    if (successClose) successClose.addEventListener("click", closeCheckoutModal);
  }

  /* ---------- FORM: LIÊN HỆ ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var successBox = document.getElementById("contactSuccess");
      form.hidden = true;
      if (successBox) successBox.hidden = false;
    });
  }

  /* ---------- FORM: TRANG THANH TOÁN ---------- */
  function initCheckoutPage() {
    var form = document.getElementById("orderForm");
    if (!form) return;
    var entries = cartEntries();
    var summaryBody = document.getElementById("orderSummaryBody");
    var subTotal = entries.reduce(function (sum, entry) { return sum + entry.product.price * entry.qty; }, 0);

    if (summaryBody) {
      if (!entries.length) {
        summaryBody.innerHTML = '<p style="color:var(--ink-soft);font-size:14px;">Giỏ hàng đang trống. <a href="san-pham.html" style="text-decoration:underline;color:var(--brown-800);">Chọn sản phẩm</a></p>';
      } else {
        summaryBody.innerHTML = entries.map(function (entry) {
          var p = entry.product;
          var lineTotal = p.price * entry.qty;
          return '<div class="mini-cart__item" style="border:none;padding:0 0 18px;">' +
            '<img src="' + p.image + '" alt="" onerror="this.parentElement.classList.add(\'img-fallback--bottle-sm\')">' +
            '<div class="mini-cart__item-info"><strong>' + p.name + "</strong>" +
            (p.gift ? '<span style="font-size:12px;color:var(--gold-600);">🎁 Tặng kèm ' + p.gift + "</span>" : "") +
            '<div style="font-size:13px;margin-top:4px;">Số lượng: <strong>' + entry.qty + "</strong></div></div>" +
            "<strong>" + formatVND(lineTotal) + "</strong></div>";
        }).join("");
      }
    }
    var subTotalEl = document.getElementById("orderSubTotal");
    if (subTotalEl) subTotalEl.textContent = formatVND(subTotal);
    var totalEl = document.getElementById("orderTotal");
    if (totalEl) totalEl.textContent = formatVND(subTotal);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!cartEntries().length) {
        showToast("Giỏ hàng của bạn đang trống");
        return;
      }
      var code = "MS" + Date.now().toString().slice(-8);
      sessionStorage.setItem("mocsa_last_order", code);
      clearCart();
      window.location.href = "dat-hang-thanh-cong.html";
    });
  }

  function initSuccessPage() {
    var codeEl = document.getElementById("orderCode");
    if (!codeEl) return;
    var code = sessionStorage.getItem("mocsa_last_order") || "MS" + Date.now().toString().slice(-8);
    codeEl.textContent = code;
  }

  /* ---------- INIT ALL ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initMiniCart();
    initAddToCart();
    initQtyStepper();
    initCartPageControls();
    initCountdown();
    initReveal();
    initAccordion();
    initTabs();
    initGallery();
    initLightbox();
    initBeforeAfter();
    initBackToTop();
    initStickyBuy();
    initCheckoutModal();
    initContactForm();
    initCheckoutPage();
    initSuccessPage();
    updateCartBadges();
  });
})();
