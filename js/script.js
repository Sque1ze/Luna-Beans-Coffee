const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
const langToggle = document.getElementById("langToggle");
const loader = document.querySelector(".page-loader");

let currentLang = localStorage.getItem("siteLang") || "ua";

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("siteLang", lang);

  document.documentElement.lang = lang === "ua" ? "uk" : "en";

  document.querySelectorAll("[data-ua][data-en]").forEach(element => {
    element.textContent = element.dataset[lang];
  });

  if (langToggle) {
    langToggle.textContent = lang === "ua" ? "EN" : "UA";
  }
}

applyLanguage(currentLang);

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const nextLang = currentLang === "ua" ? "en" : "ua";
    applyLanguage(nextLang);
  });
}

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 550);
});

document.querySelectorAll("a[href]").forEach(link => {
  const href = link.getAttribute("href");

  if (
    href &&
    !href.startsWith("#") &&
    !href.startsWith("http") &&
    !href.startsWith("mailto") &&
    !href.startsWith("tel")
  ) {
    link.addEventListener("click", event => {
      event.preventDefault();

      document.body.classList.add("transitioning");
      loader.classList.remove("hide");

      setTimeout(() => {
        window.location.href = href;
      }, 450);
    });
  }
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(element => revealObserver.observe(element));

const tabButtons = document.querySelectorAll(".tab-btn");
const products = document.querySelectorAll(".product-card");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    tabButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    products.forEach(product => {
      const category = product.dataset.category;

      if (filter === "all" || filter === category) {
        product.classList.remove("hide");
      } else {
        product.classList.add("hide");
      }
    });
  });
});

const btn = document.querySelector(".btn primary")
btn.addEventListener('click', () => {
    gtag('event', 'order_button_clicked');
    console.log('Дані відправлено!');
});
