document.addEventListener("DOMContentLoaded", function () {
  // تفعيل AOS للأنيميشن
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });
  // تفعيل Swiper لعرض المقالات
  const blogSwiper = new Swiper(".blog-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
  // تبديل وضع النهار/الليل
  const themeToggle = document.querySelector(".theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  themeToggle.addEventListener("click", function () {
    let theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
  // تنفيذ العدادات في قسم الإحصائيات
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200;
  function animateCounters() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-count");
      const count = +counter.innerText;
      const increment = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 300);
      } else {
        counter.innerText = target;
      }
    });
  }
  // تفعيل العدادات عند التمرير إلى القسم
  const statsSection = document.querySelector(".stats-section");
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.unobserve(statsSection);
      }
    },
    { threshold: 0.5 }
  );
  statsObserver.observe(statsSection);
  // التنقل السلس بين الأقسام
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
        // تحديث الرابط النشط في شريط التنقل
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });
  // تحديث الرابط النشط أثناء التمرير
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute("id");
      }
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
  // نماذج المقالات
  const modalTriggers = document.querySelectorAll(".modal-trigger");
  const modals = document.querySelectorAll(".blog-modal");
  const modalClose = document.querySelectorAll(".modal-close");
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("href");
      const modal = document.querySelector(modalId);
      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });
  modalClose.forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      this.closest(".blog-modal").classList.remove("active");
      document.body.style.overflow = "";
    });
  });
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });
  // تحسين SEO: تغيير عنوان الصفحة عند تركها
  let pageTitle = document.title;
  window.addEventListener("blur", function () {
    document.title = "نعود قريباً ✋ |  هوم رؤية";
  });
  window.addEventListener("focus", function () {
    document.title = pageTitle;
  });
});
