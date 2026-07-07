/* =========================================================
   MỘC SA – MAIN.JS (dùng chung cho toàn bộ website)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- SẢN PHẨM DUY NHẤT ---------- */
  var PRODUCT = {
    id: "dau-goi-thao-duoc-moc-sa",
    name: "Dầu Gội Thảo Dược Mộc Sa 250ml",
    price: 196000,
    oldPrice: 245000,
    image: "assets/images/product-bottle.png",
    gift: "Túi vải Mộc Sa"
  };
  var CART_KEY = "mocsa_cart_qty";
  var DEADLINE_KEY = "mocsa_deadline";

  function formatVND(n) {
    return n.toLocaleString("vi-VN") + "₫";
  }

  /* ---------- CART (localStorage) ---------- */
  function getCartQty() {
    var v = parseInt(localStorage.getItem(CART_KEY), 10);
    return isNaN(v) || v < 0 ? 0 : v;
  }
  function setCartQty(qty) {
    qty = Math.max(0, Math.min(99, qty));
    localStorage.setItem(CART_KEY, String(qty));
    updateCartBadges();
    renderMiniCart();
    if (document.body.dataset.page === "cart") renderCartPage();
  }
  function addToCart(amount) {
    setCartQty(getCartQty() + (amount || 1));
  }
  function updateCartBadges() {
    var qty = getCartQty();
    document.querySelectorAll("#cartCount").forEach(function (el) {
      el.textContent = qty;
    });
  }

  function renderMiniCart() {
    var body = document.getElementById("miniCartBody");
    var foot = document.getElementById("miniCartFoot");
    if (!body) return;
    var qty = getCartQty();
    if (qty <= 0) {
      body.innerHTML = '<p class="mini-cart__empty">Chưa có sản phẩm nào trong giỏ.</p>';
      if (foot) foot.hidden = true;
      return;
    }
    body.innerHTML =
      '<div class="mini-cart__item">' +
      '<img src="' + PRODUCT.image + '" alt="" onerror="this.parentElement.classList.add(\'img-fallback--bottle-sm\')">' +
      '<div class="mini-cart__item-info">' +
      "<strong>" + PRODUCT.name + "</strong>" +
      '<div class="mini-cart__item-price">' + formatVND(PRODUCT.price) + "</div>" +
      '<div class="mini-cart__qty">' +
      '<button type="button" data-mini-minus>−</button>' +
      '<span>' + qty + '</span>' +
      '<button type="button" data-mini-plus>+</button>' +
      "</div>" +
      "</div>" +
      '<button class="mini-cart__remove" data-mini-remove>Xóa</button>' +
      "</div>";
    if (foot) {
      foot.hidden = false;
      var totalEl = document.getElementById("miniCartTotal");
      if (totalEl) totalEl.textContent = formatVND(PRODUCT.price * qty);
    }
    var minus = body.querySelector("[data-mini-minus]");
    var plus = body.querySelector("[data-mini-plus]");
    var remove = body.querySelector("[data-mini-remove]");
    if (minus) minus.addEventListener("click", function () { setCartQty(getCartQty() - 1); });
    if (plus) plus.addEventListener("click", function () { setCartQty(getCartQty() + 1); });
    if (remove) remove.addEventListener("click", function () { setCartQty(0); });
  }

  function renderCartPage() {
    var wrap = document.getElementById("cartPageWrap");
    if (!wrap) return;
    var qty = getCartQty();
    var empty = document.getElementById("cartEmpty");
    var filled = document.getElementById("cartFilled");
    if (qty <= 0) {
      if (empty) empty.hidden = false;
      if (filled) filled.hidden = true;
      return;
    }
    if (empty) empty.hidden = true;
    if (filled) filled.hidden = false;
    var qtyInput = document.getElementById("cartPageQty");
    if (qtyInput) qtyInput.value = qty;
    var lineTotal = document.getElementById("cartLineTotal");
    if (lineTotal) lineTotal.textContent = formatVND(PRODUCT.price * qty);
    var subTotal = document.getElementById("cartSubTotal");
    if (subTotal) subTotal.textContent = formatVND(PRODUCT.price * qty);
    var grandTotal = document.getElementById("cartGrandTotal");
    if (grandTotal) grandTotal.textContent = formatVND(PRODUCT.price * qty);
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
        var qtyInput = document.getElementById("qtyValue");
        var qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
        if (btn.hasAttribute("data-open-checkout")) {
          openCheckoutModal(qty);
          return;
        }
        addToCart(qty);
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

  /* ---------- CART PAGE STEPPER ---------- */
  function initCartPageControls() {
    var minus = document.getElementById("cartMinus");
    var plus = document.getElementById("cartPlus");
    var removeBtn = document.getElementById("cartRemove");
    if (minus) minus.addEventListener("click", function () { setCartQty(getCartQty() - 1); });
    if (plus) plus.addEventListener("click", function () { setCartQty(getCartQty() + 1); });
    if (removeBtn) removeBtn.addEventListener("click", function () { setCartQty(0); });
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
  function openCheckoutModal(qty) {
    var modal = document.getElementById("checkoutModal");
    if (!modal) {
      window.location.href = "thanh-toan.html";
      return;
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
    if (!qtyInput || !totalEl) return;
    var qty = parseInt(qtyInput.value, 10) || 1;
    totalEl.textContent = formatVND(PRODUCT.price * qty);
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
        setCartQty(0);
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
    var qty = Math.max(1, getCartQty() || 1);
    var qtyEl = document.getElementById("orderQty");
    var lineTotalEl = document.getElementById("orderLineTotal");
    var subTotalEl = document.getElementById("orderSubTotal");
    var totalEl = document.getElementById("orderTotal");
    if (qtyEl) qtyEl.textContent = qty;
    if (lineTotalEl) lineTotalEl.textContent = formatVND(PRODUCT.price * qty);
    if (subTotalEl) subTotalEl.textContent = formatVND(PRODUCT.price * qty);
    if (totalEl) totalEl.textContent = formatVND(PRODUCT.price * qty);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var code = "MS" + Date.now().toString().slice(-8);
      sessionStorage.setItem("mocsa_last_order", code);
      setCartQty(0);
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
