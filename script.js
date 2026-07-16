"use strict";

/*
  Replace the empty values below with Koachella's confirmed information.
  The website buttons and contact section update automatically.
*/
const SITE_CONFIG = Object.freeze({
  bookingUrl: "",
  whatsappNumber: "", // International format, numbers only. Example: 17875551234
  whatsappMessage: "Hola, me gustaría reservar una experiencia en Koachella.",
  phoneDisplay: "Por confirmar",
  phoneHref: "", // Example: +17875551234
  instagramHandle: "@koachellanails",
  instagramUrl: "https://www.instagram.com/koachellanails/",
  address: "San Juan, Puerto Rico",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=San+Juan%2C+Puerto+Rico"
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const header = document.querySelector("[data-header]");
const toast = document.querySelector("[data-toast]");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function closeMenu() {
  nav?.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
}

menuButton?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open") ?? false;
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

function openExternal(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-booking]").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!SITE_CONFIG.bookingUrl) {
      event.preventDefault();
      document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
      showToast("El enlace de reservaciones está listo para conectarse cuando Koachella confirme la plataforma.");
      return;
    }
    event.preventDefault();
    openExternal(SITE_CONFIG.bookingUrl);
  });
});

document.querySelectorAll("[data-whatsapp]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    if (!SITE_CONFIG.whatsappNumber) {
      showToast("El botón de WhatsApp se activará al añadir el número oficial de Koachella.");
      return;
    }
    const message = encodeURIComponent(SITE_CONFIG.whatsappMessage);
    openExternal(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`);
  });
});

const phoneLink = document.querySelector("[data-phone]");
const phoneDisplay = document.querySelector("[data-phone-display]");
if (phoneDisplay) phoneDisplay.textContent = SITE_CONFIG.phoneDisplay;
if (phoneLink && SITE_CONFIG.phoneHref) phoneLink.href = `tel:${SITE_CONFIG.phoneHref}`;
else phoneLink?.addEventListener("click", (event) => {
  event.preventDefault();
  showToast("El teléfono oficial está pendiente de confirmación.");
});

const instagramLink = document.querySelector("[data-instagram]");
const instagramDisplay = document.querySelector("[data-instagram-display]");
if (instagramDisplay) instagramDisplay.textContent = SITE_CONFIG.instagramHandle;
if (instagramLink) {
  instagramLink.href = SITE_CONFIG.instagramUrl;
  instagramLink.target = "_blank";
  instagramLink.rel = "noopener noreferrer";
}

const mapLink = document.querySelector("[data-map]");
const addressDisplay = document.querySelector("[data-address]");
if (addressDisplay) addressDisplay.textContent = SITE_CONFIG.address;
if (mapLink) {
  mapLink.href = SITE_CONFIG.mapsUrl;
  mapLink.target = "_blank";
  mapLink.rel = "noopener noreferrer";
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}
