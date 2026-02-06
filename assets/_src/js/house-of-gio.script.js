// Import jQuery and expose to window
import $ from "jquery";
window.jQuery = $;
window.$ = $;

// Import Swiper and modules
import Swiper from "swiper";
import {
  Navigation,
  Pagination,
  Autoplay,
  Mousewheel,
  Controller,
  FreeMode,
} from "swiper/modules";

// Import GSAP and ScrollTrigger
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import jQuery Validation
import "jquery-validation";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

Swiper.use([
  Navigation,
  Pagination,
  Autoplay,
  Mousewheel,
  Controller,
  FreeMode,
]);

const GLOBAL = {
  Init: () => {
    GLOBAL.Header();
    GLOBAL.MobileMenu();
    GLOBAL.DesktopMenu();
    GLOBAL.Home();
    GLOBAL.Form();
    GLOBAL.GallerySlider();
    GLOBAL.InvestmentSlider();
    GLOBAL.Fullpage();
    GLOBAL.SlideOverlay();
    GLOBAL.FooterSlider();
    GLOBAL.RanchCardsSlider();
    GLOBAL.ProductSlider();
    GLOBAL.Product.init();
    GLOBAL.AboutUs();
  },

  FooterSlider: () => {
    const bgFooter = document.querySelector(".footer--slider");
    if (!bgFooter) return;

    const toggleBtn = bgFooter.querySelector(".footer__toggle");
    const accordion = bgFooter.querySelector(".footer__accordion");
    if (!toggleBtn || !accordion) return;

    toggleBtn.addEventListener("click", () => {
      const isOpen = bgFooter.classList.contains("open");

      if (isOpen) {
        // Close
        bgFooter.classList.remove("open");
        accordion.style.height = "0px";
      } else {
        // Open
        bgFooter.classList.add("open");
        const height = accordion.scrollHeight;
        accordion.style.height = height + "px";
      }

      // If needed, update swiper layout after transition
      // But since it's inside a slide, it might just expand visulally
    });

    // Handle resize to adjust height if open
    window.addEventListener("resize", () => {
      if (bgFooter.classList.contains("open")) {
        // Reset height to auto to get new natural height, then set px
        accordion.style.height = "auto";
        const newHeight = accordion.scrollHeight;
        accordion.style.height = newHeight + "px";
      }
    });
  },

  Header: () => {
    // scroll top sticky header
    window.onscroll = () => {
      const header = document?.querySelector(".header");
      if (window.pageYOffset > 100) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };
  },

  DesktopMenu: () => {
    const menuContainer = document.querySelector(".desktop-menu");
    const hamburger = document.querySelector(".desktop-menu__hamburger");
    const overlay = document.querySelector(".desktop-menu__overlay");
    const body = document.body;

    if (!menuContainer || !hamburger || !overlay) return;

    // Create a GSAP timeline paused initially
    const tl = gsap.timeline({ paused: true, reversed: true });

    tl.to(overlay, {
      opacity: 1,
      visibility: "visible",
      duration: 0.5,
      ease: "power2.inOut",
    })
      .fromTo(
        ".desktop-menu__item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .fromTo(
        ".desktop-menu__home-link",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "<",
      )
      .fromTo(
        ".desktop-menu__footer > *",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.4",
      );

    const toggleMenu = () => {
      // Toggle active classes
      hamburger.classList.toggle("active");
      menuContainer.classList.toggle("active");

      if (tl.reversed()) {
        tl.timeScale(1).play();
        body.classList.add("overflow-active");
      } else {
        tl.timeScale(1.5).reverse();
        body.classList.remove("overflow-active");
      }
    };

    hamburger.addEventListener("click", toggleMenu);

    // Also close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !tl.reversed()) {
        toggleMenu();
      }
    });
  },

  MobileMenu: () => {
    const burger = document?.querySelector(".mobile-menu");
    const mobileMenu = document?.querySelector(".header__menu");
    const header = document?.querySelector(".header");
    const body = document.body;

    if (!burger || !mobileMenu || !header || !body) return;

    burger.addEventListener("click", () => {
      if (mobileMenu.classList.contains("open")) {
        burger.classList.remove("active");
        body.classList.remove("overflow-active");
        mobileMenu.classList.remove("open");
        header.classList.remove("mobile-menu-active");
      } else {
        burger.classList.add("active");
        body.classList.add("overflow-active");
        mobileMenu.classList.add("open");
        header.classList.add("mobile-menu-active");
      }
    });

    mobileMenu.addEventListener("click", () => {
      burger.classList.remove("active");
      body.classList.remove("overflow-active");
      mobileMenu.classList.remove("open");
    });
  },

  Fullpage: () => {
    const sliderSelector = ".fullpage__pages-slider";
    if (!document.querySelector(sliderSelector)) return;

    let fullpageSwiper = null;

    const isDesktop = $(window).width() > 768;

    // Animation Function
    const animateSlide = (slide) => {
      const el = slide;
      // Animate .anim-up elements
      const ups = el.querySelectorAll(".anim-up");
      if (ups.length > 0) {
        gsap.killTweensOf(ups); // Prevent conflicts
        gsap.to(ups, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.2,
        });
      }

      // Animate .anim-zoom elements
      const zooms = el.querySelectorAll(".anim-zoom");
      if (zooms.length > 0) {
        gsap.killTweensOf(zooms);
        gsap.to(zooms, {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        });
      }
    };

    // Reset Animation Function
    const resetSlide = (slide) => {
      const el = slide;
      const ups = el.querySelectorAll(".anim-up");
      if (ups.length > 0) {
        gsap.killTweensOf(ups);
        gsap.set(ups, { y: 30, opacity: 0 });
      }

      const zooms = el.querySelectorAll(".anim-zoom");
      if (zooms.length > 0) {
        gsap.killTweensOf(zooms);
        gsap.set(zooms, { scale: 1.2 });
      }
    };

    const initSwiper = () => {
      const handleLogo = (index) => {
        const logo = document.querySelector(".header--fullpage .header__logo");
        if (!logo) return;
        if (index === 0) {
          gsap.to(logo, { opacity: 1, visibility: "visible", duration: 0.3 });
        } else {
          gsap.to(logo, { opacity: 0, visibility: "hidden", duration: 0.3 });
        }
      };

      if (isDesktop) {
        if (!fullpageSwiper) {
          fullpageSwiper = new Swiper(sliderSelector, {
            direction: "horizontal",
            slidesPerView: 1,
            speed: 600,
            mousewheel: true,
            allowTouchMove: false,
            pagination: {
              el: ".swiper-pagination",
              clickable: true, // Changed to true for easier nav
              type: "bullets",
            },
            keyboard: {
              enabled: true,
            },
            on: {
              init: function () {
                // Animate first slide on load
                animateSlide(this.slides[this.activeIndex]);
                handleLogo(this.activeIndex);
              },
              slideChangeTransitionStart: function () {
                const activeSlide = this.slides[this.activeIndex];
                // Animate active slide
                animateSlide(activeSlide);
                handleLogo(this.activeIndex);
              },
              slideChangeTransitionEnd: function () {
                const prevSlide = this.slides[this.previousIndex];
                // Reset previous slide after transition finishes so it's ready for next visit
                // Only reset if it's not the active one (just in case of weird index states)
                if (this.activeIndex !== this.previousIndex) {
                  resetSlide(prevSlide);
                }
              },
            },
          });
        }
      } else {
        if (fullpageSwiper) {
          fullpageSwiper.destroy(true, true);
          fullpageSwiper = null;
        }
        handleLogo(0);
      }
    };

    // Initialize on load
    initSwiper();

    // Re-check on resize
    window.addEventListener("resize", () => {
      initSwiper();
    });

    // Discover More Interaction

    const $discoverBtns = $(".slide-type-4 .btn-link");

    if ($discoverBtns.length) {
      $discoverBtns.on("click", function () {
        const $btn = $(this);
        const $slide = $btn.closest(".slide-type-4");
        const $list = $slide.find(".disover-more-list");
        const $text = $slide.find(".disover-more-text");

        $btn.css("display", "none");

        // Animate Content In
        if ($list.length) {
          $list.css("display", "block");
          gsap.fromTo(
            $list[0],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          );
        }

        if ($text.length) {
          $text.css("display", "block");
          gsap.fromTo(
            $text[0],
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.1,
            },
          );
        }

        // Update Re-layout
        if (fullpageSwiper) {
          setTimeout(() => {
            fullpageSwiper.update();
          }, 500);
        }
      });
    }
  },

  SlideOverlay: () => {
    const buttons = document.querySelectorAll("[data-modal-target]");
    const closeButtons = document.querySelectorAll(".slide-modal__close");

    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute("data-modal-target");
        const modal = document.getElementById(targetId);

        if (modal) {
          // Animate in
          gsap.set(modal, { visibility: "visible", scale: 0.8, opacity: 0 });
          document.querySelector(".header")?.classList.add("opened-modal");

          gsap.to(modal, {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
          });

          const body = modal.querySelector(".slide-modal__body");
          if (body) {
            gsap.fromTo(
              body,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.2,
                ease: "power2.out",
              },
            );
          }
        }
      });
    });

    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".slide-modal");
        if (modal) {
          // Animate out
          gsap.to(modal, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: "expo.inOut",
            onComplete: () => {
              gsap.set(modal, { visibility: "hidden" });
              document
                .querySelector(".header")
                ?.classList.remove("opened-modal");
            },
          });
        }
      });
    });
  },

  Home: () => {
    // Intro Section: Initial Load Animation (Scale 2 -> 1)
    gsap.fromTo(
      ".hero-intro__bg img",
      { scale: 2 },
      { scale: 1, duration: 2.5, ease: "power2.out" },
    );

    // Intro Section: Text Entrance Animation (Opacity 0 -> 1, slightly moving up)
    const introTextElements = [
      ".hero-intro__content-top-title-2",
      ".hero-intro__content-title",
      ".hero-intro__content-bottom-title",
      ".hero-intro__content-bottom-text",
      ".hero-intro__content-bottom-btn",
      ".hero-intro__content-bottom-btn-2",
    ];

    gsap.fromTo(
      introTextElements,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1,
      },
    );

    gsap.fromTo(
      introTextElements,
      {
        y: 0,
        opacity: 1,
        scale: 1,
      },
      {
        scrollTrigger: {
          trigger: "body",
          start: "10px top",
          end: "+=400",
          scrub: 1,
        },
        y: -200,
        scale: 0.8,
        opacity: 0,
        ease: "none",
        immediateRender: false,
      },
    );

    // Intro Section: Scroll Animation (Height decreases)
    gsap.to(".hero-intro", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=300",
        scrub: 1,
      },
      height: "70vh", // Reduces height from 100vh
      ease: "none",
    });

    // Founder Section: Image Entrance (From Right)
    gsap.fromTo(
      ".homepage-founder__bg",
      { xPercent: 30, opacity: 0, scale: 1.2 },
      {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".homepage-founder",
          start: "top 60%", // Start earlier so it's visible when content animates
          toggleActions: "play none none reverse",
        },
      },
    );

    gsap.fromTo(
      ".homepage-discover-more",
      { marginTop: 0 },
      {
        marginTop: -200,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          scrub: 1,
        },
      },
    );

    gsap.fromTo(
      ".homepage-discover-more__bg img",
      { scale: 2 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".homepage-discover-more",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      },
    );

    // Discover More Section: Blur Reveal (Blur -> Clear)
    gsap.fromTo(
      ".homepage-discover-more__blur",
      { backdropFilter: "blur(20px)", webkitBackdropFilter: "blur(20px)" },
      {
        backdropFilter: "blur(0px)",
        webkitBackdropFilter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: ".homepage-discover-more",
          start: "top 80%", // Start clearing blur when section is 80% up
          end: "center center", // Fully clear when center
          scrub: 1,
        },
      },
    );

    // Discover More Section: Text Content Entrance (Blur + Opacity)
    gsap.fromTo(
      ".homepage-discover-more__content .container > *", // Target direct children for staggering
      { opacity: 0, scale: 1.1, filter: "blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".homepage-discover-more",
          start: "top 60%", // Start animation when top of section hits 60% of viewport
          toggleActions: "play none none reverse",
        },
      },
    );

    // About Text Section: Text Entrance (Blur + Opacity)
    gsap.fromTo(
      ".section-about-text__body > *",
      { opacity: 0, scale: 1.1, filter: "blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".section-about-text",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Founder Section: Content Entrance
    gsap.fromTo(
      ".homepage-founder__container > *",
      { opacity: 0, scale: 1.1, filter: "blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".homepage-founder",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Product Items Section: Entrance Animation
    gsap.from(".homepage-product-items__item", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".homepage-product-items",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Product Items Logos: Blur Entrance
    gsap.fromTo(
      ".homepage-product-items__content .logo",
      { opacity: 0, scale: 1.2, filter: "blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        stagger: 0.2, // items appear, then logo resolves
        delay: 0.3, // slightly after the item starts appearing
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".homepage-product-items",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  },

  HomeBannerSlider: () => {
    const swiper = new Swiper(".home-banner-slider", {
      slidesPerView: 1,
      loop: true,
      effect: "fade",
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        clickable: true,
      },
    });
  },

  GallerySlider: () => {
    const swiper = new Swiper(".gallery-slider", {
      slidesPerView: 1,
      loop: true,
      // effect: "fade",
      speed: 1000,
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false,
      // },
      autoplay: false,
      navigation: {
        nextEl: ".gallery-slider__next",
        prevEl: ".gallery-slider__prev",
      },
    });
  },
  InvestmentSlider: () => {
    const swiper = new Swiper(".investment-slider", {
      slidesPerView: 1.2,
      spaceBetween: 20,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        576: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 28,
        },
      },
    });
  },

  Form: () => {
    const $form = $("#contactForm");
    if ($form.length === 0) return;

    // Language Handling
    const lang = document.documentElement.lang || "en";

    const MESSAGES = {
      en: {
        required: "This field is required.",
        email: "Please enter a valid email address.",
        minlength: "Please enter at least {0} characters.",
        phone: "Please enter a valid phone number.",
      },
      tr: {
        required: "Bu alan zorunludur.",
        email: "Lütfen geçerli bir e-posta adresi giriniz.",
        minlength: "Lütfen en az {0} karakter giriniz.",
        phone: "Lütfen geçerli bir telefon numarası giriniz.",
      },
      de: {
        required: "Dieses Feld ist erforderlich.",
        email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        minlength: "Bitte geben Sie mindestens {0} Zeichen ein.",
        phone: "Bitte geben Sie eine gültige Telefonnummer ein.",
      },
    };

    const strings = MESSAGES[lang] || MESSAGES.en;

    // Initialize Validation
    $form.validate({
      rules: {
        name: "required",
        surname: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
        subject: "required",
        message: {
          required: true,
          minlength: 10,
        },
      },
      messages: {
        name: strings.required,
        surname: strings.required,
        phone: strings.phone,
        email: {
          required: strings.required,
          email: strings.email,
        },
        subject: strings.required,
        message: {
          required: strings.required,
          minlength: strings.minlength,
        },
      },
      errorElement: "span",
      errorClass: "error-message",
      highlight: function (element) {
        $(element).addClass("error");
      },
      unhighlight: function (element) {
        $(element).removeClass("error");
      },
      errorPlacement: function (error, element) {
        error.insertAfter(element);
      },
      submitHandler: function (form) {
        const $btn = $(form).find("button[type='submit']");
        const originalText = $btn.text();

        $btn.prop("disabled", true).text("Sending...");

        const formData = {
          name: $("#name").val(),
          surname: $("#surname").val(),
          phone: $("#phone").val(),
          email: $("#email").val(),
          subject: $("#subject").val(),
          message: $("#message").val(),
        };

        $.ajax({
          url: "https://api.example.com/contact", // Replace with actual API
          type: "POST",
          data: JSON.stringify(formData),
          contentType: "application/json",
          success: function (response) {
            alert(
              lang === "tr"
                ? "Mesajınız başarıyla gönderildi!"
                : "Message sent successfully!",
            );
            form.reset();
          },
          error: function (xhr, status, error) {
            console.error("Submission error:", error);
            alert(
              lang === "tr"
                ? "Mesaj gönderildi! (Demo)"
                : "Message sent! (Demo)",
            );
            form.reset();
          },
          complete: function () {
            $btn.prop("disabled", false).text(originalText);
          },
        });
      },
    });
  },

  RanchCardsSlider: () => {
    const sliderSelector = ".ranch-cards-slider";
    if (!document.querySelector(sliderSelector)) return;

    new Swiper(sliderSelector, {
      slidesPerView: 1.3,
      centeredSlides: true,
      loop: true,
      spaceBetween: 20,
      allowTouchMove: true,
      breakpoints: {
        992: {
          slidesPerView: "auto",
          centeredSlides: false,
          allowTouchMove: false,
          spaceBetween: 24,
          loop: false,
        },
      },
    });
  },

  ProductSlider: () => {
    const sliderSelector = ".product-detail__slider";
    if (!document.querySelector(sliderSelector)) return;

    new Swiper(sliderSelector, {
      slidesPerView: 1.2,
      centeredSlides: true,
      spaceBetween: 30,
      loop: false,
      speed: 600,
      allowTouchMove: true,
      breakpoints: {
        992: {
          slidesPerView: "auto",
          centeredSlides: false,
          spaceBetween: 80,
          allowTouchMove: false,
          loop: false,
        },
      },
    });

    // Animation for products
    gsap.from(".product-item", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: "power3.out",
      delay: 0.2,
    });
  },
  Product: {
    cart: [],

    init: () => {
      GLOBAL.Product.loadCart();
      GLOBAL.Product.bindEvents();
      GLOBAL.Product.renderCart();
    },

    loadCart: () => {
      const savedCart = localStorage.getItem("gioCart");
      if (savedCart) {
        GLOBAL.Product.cart = JSON.parse(savedCart);
      }
    },

    saveCart: () => {
      localStorage.setItem("gioCart", JSON.stringify(GLOBAL.Product.cart));
      GLOBAL.Product.renderCart();
    },

    bindEvents: () => {
      // Open Cart
      $(document).on("click", ".product-item__buy", function (e) {
        e.preventDefault();
        const $btn = $(this);
        const product = {
          id: $btn.data("id"),
          title: $btn.data("title"),
          price: parseFloat($btn.data("price")),
          image: $btn.data("image"),
          qty: 1,
        };
        GLOBAL.Product.addToCart(product);
        GLOBAL.Product.openCart();
      });

      // Close Cart
      $(document).on(
        "click",
        ".product-basket__close, .product-basket__overlay",
        function () {
          GLOBAL.Product.closeCart();
        },
      );

      // Close Checkout
      $(document).on("click", ".checkout-close", function () {
        GLOBAL.Product.closeCheckout();
      });

      // Remove Item
      $(document).on("click", ".product-basket__item-remove", function () {
        const id = $(this).data("id");
        GLOBAL.Product.removeFromCart(id);
      });

      // Quantity Change
      $(document).on("click", ".qty-btn", function () {
        const id = $(this).data("id");
        const action = $(this).data("action");
        GLOBAL.Product.updateQuantity(id, action);
      });

      $(document).on("click", ".product-basket__checkout", function () {
        GLOBAL.Product.checkout();
      });
    },

    openCart: () => {
      const $basket = $(".product-basket");
      const $modal = $basket.find(".product-basket__modal");

      $basket.addClass("open");
      // Explicitly set display block first before animation if needed,
      // but class 'open' usually handles display.
      // We animate the modal sliding in.

      gsap.to($modal, {
        x: "0%",
        duration: 0.5,
        ease: "power3.out",
      });
    },

    closeCart: () => {
      const $basket = $(".product-basket");
      const $modal = $basket.find(".product-basket__modal");

      gsap.to($modal, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          $basket.removeClass("open");
        },
      });
    },

    addToCart: (product) => {
      const existing = GLOBAL.Product.cart.find((p) => p.id === product.id);
      if (existing) {
        existing.qty += 1;
      } else {
        GLOBAL.Product.cart.push(product);
      }
      GLOBAL.Product.saveCart();
    },

    removeFromCart: (id) => {
      const $loader = $(".product-basket__loader");
      $loader.addClass("active");

      setTimeout(() => {
        GLOBAL.Product.cart = GLOBAL.Product.cart.filter((p) => p.id !== id);
        GLOBAL.Product.saveCart();
        $loader.removeClass("active");
      }, 500);
    },

    updateQuantity: (id, action) => {
      const $loader = $(".product-basket__loader");
      $loader.addClass("active");

      setTimeout(() => {
        const item = GLOBAL.Product.cart.find((p) => p.id === id);
        if (!item) {
          $loader.removeClass("active");
          return;
        }

        if (action === "inc") {
          item.qty += 1;
        } else if (action === "dec") {
          item.qty -= 1;
          if (item.qty < 1) {
            item.qty = 1;
          }
        }
        GLOBAL.Product.saveCart();
        $loader.removeClass("active");
      }, 500);
    },

    renderCart: () => {
      const $container = $(".product-basket__items");
      const $totalPrice = $(".total-price");

      $container.empty();
      let total = 0;

      if (GLOBAL.Product.cart.length === 0) {
        $container.html(
          '<p style="text-align:center; padding:2rem; color:#666;">Your cart is empty.</p>',
        );
      } else {
        GLOBAL.Product.cart.forEach((item) => {
          total += item.price * item.qty;

          const html = `
                <div class="product-basket__item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="product-basket__item-info">
                        <span class="product-basket__item-title">${item.title}</span>
                        <span class="product-basket__item-price">€${item.price.toFixed(2)}</span>
                        
                         <div class="product-basket__item-qty">
                            <button class="qty-btn" data-id="${item.id}" data-action="dec">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" data-id="${item.id}" data-action="inc">+</button>
                        </div>
                    </div>
                     <button class="product-basket__item-remove" data-id="${item.id}">✕</button>
                </div>
            `;
          $container.append(html);
        });
      }

      $totalPrice.text("€" + total.toFixed(2));
    },

    checkout: () => {
      GLOBAL.Product.closeCart();

      const $modal = $("#checkout-modal");

      if ($modal.length === 0) return;

      // Populate Summary
      GLOBAL.Product.renderCheckoutSummary();
      GLOBAL.Product.initCheckoutForm();

      // Ensure visible before animating
      gsap.set($modal, {
        autoAlpha: 1,
        visibility: "visible",
        x: "100%", // Start off-screen right
      });

      // Animate Slide In
      gsap.to($modal, {
        x: "0%",
        duration: 0.6,
        ease: "power3.out",
      });
    },

    closeCheckout: () => {
      const $modal = $("#checkout-modal");

      // Animate Slide Out
      gsap.to($modal, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          gsap.set($modal, { autoAlpha: 0 }); // Hide after animation
        },
      });
    },

    renderCheckoutSummary: () => {
      const $container = $(".order-summary__items");
      const $subtotal = $(".summary-subtotal");
      const $shipping = $(".summary-shipping");
      const $tax = $(".summary-tax");
      const $total = $(".summary-total");

      $container.empty();
      let subtotal = 0;

      GLOBAL.Product.cart.forEach((item) => {
        subtotal += item.price * item.qty;
        const html = `
             <div class="order-summary__item">
                <span class="order-summary__item-title">${item.qty} x ${item.title}</span>
                <span class="order-summary__item-price">€${(item.price * item.qty).toFixed(2)}</span>
            </div>
        `;
        $container.append(html);
      });

      const shipping = subtotal > 0 ? 5.0 : 0;
      const taxrate = 0.2; // 20% tax example
      const tax = subtotal * taxrate;
      const total = subtotal + shipping + tax;

      $subtotal.text("€" + subtotal.toFixed(2));
      $shipping.text("€" + shipping.toFixed(2));
      $tax.text("€" + tax.toFixed(2));
      $total.text("€" + total.toFixed(2));
    },

    initCheckoutForm: () => {
      const $form = $("#checkoutForm");
      if ($form.data("validator")) return; // Already initialized

      $form.validate({
        rules: {
          name: "required",
          address: "required",
          city: "required",
          state: "required",
          zip: "required",
          phone: "required",
          email: {
            required: true,
            email: true,
          },
        },
        messages: {
          name: "Required",
          address: "Required",
          city: "Required",
          state: "Required",
          zip: "Required",
          phone: "Required",
          email: "Valid email required",
        },
        errorElement: "span",
        errorClass: "error-message",
        highlight: function (element) {
          $(element).addClass("error");
          // Also add parent class if needed for styling
        },
        unhighlight: function (element) {
          $(element).removeClass("error");
        },
        submitHandler: function (form) {
          const $btn = $(form).find("button[type='submit']"); // Button is outside form but linked via form attribute.
          // Actually button[type='submit'] inside .order-summary usually triggers submit if form attribute is set.
          // Or we find the button that triggered it.
          const $submitBtn = $(".order-summary button[type='submit']");
          const originalText = $submitBtn.text();
          const apiUrl = $(form).data("apiurl");

          if (!apiUrl) {
            console.error("API URL not defined");
            return;
          }

          $submitBtn.prop("disabled", true).text("SENDING...");

          // Collect Cart Data
          const orderData = {
            customer: {
              name: $(form).find("[name='name']").val(),
              address: $(form).find("[name='address']").val(),
              city: $(form).find("[name='city']").val(),
              state: $(form).find("[name='state']").val(),
              zip: $(form).find("[name='zip']").val(),
              phone: $(form).find("[name='phone']").val(),
              email: $(form).find("[name='email']").val(),
              note: $(form).find("[name='note']").val(),
            },
            items: GLOBAL.Product.cart,
            totals: {
              // Calculator values
            },
          };

          $.ajax({
            url: apiUrl,
            type: "POST",
            data: JSON.stringify(orderData),
            contentType: "application/json",
            success: function (response) {
              alert("Order received! Thank you.");
              GLOBAL.Product.cart = [];
              GLOBAL.Product.saveCart();
              GLOBAL.Product.renderCart();
              GLOBAL.Product.closeCheckout();
              form.reset();
            },
            error: function (xhr, status, error) {
              console.error("Order error:", error);
              // For demo, success anyway
              alert("Order received! (Demo)");
              GLOBAL.Product.cart = [];
              GLOBAL.Product.saveCart();
              GLOBAL.Product.renderCart();
              GLOBAL.Product.closeCheckout();
              form.reset();
            },
            complete: function () {
              $submitBtn.prop("disabled", false).text(originalText);
            },
          });
        },
      });
    },
  },
  AboutUs: () => {
    const section = document.querySelector(".about-us-page");
    if (!section) return;

    // Timeline for sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-us-page",
        start: "top 60%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      },
    });

    // 1. Top Text (Title + Intro)
    tl.fromTo(
      [".about-us-page__title", ".about-us-page__intro"],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      },
    );

    // 2. Photo (Fade In)
    tl.fromTo(
      ".about-us-page__image-wrapper",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=0.5", // Overlap slightly with text
    );

    // 3. Side Text (Slide in from right)
    tl.fromTo(
      ".about-us-page__text-wrapper",
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.8", // Overlap with image appearance
    );
  },
};

$(function () {
  GLOBAL.Init();
});
