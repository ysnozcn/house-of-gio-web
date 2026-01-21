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

  DesktopMenu: () => {},

  MobileMenu: () => {
    const burger = document?.querySelector(".mobile-menu");
    const mobileMenu = document?.querySelector(".header__menu");
    const header = document?.querySelector(".header");
    const body = document.body;

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
          start: "60px top",
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
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
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
};

$(function () {
  GLOBAL.Init();
});
