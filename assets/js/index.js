const $menuBtn = document.querySelector(".header__btn");
const $btnImage = $menuBtn.querySelector(".header__img");
const $menu = document.querySelector(".sidebar");
const $password = document.getElementById("password");
const $passwordBtn = document.getElementById("password-btn");
const $toast = document.querySelector(".toast");

const DESKTOP_QUERY = window.matchMedia("(width >= 68rem)");
const PASSWORD_MESSAGE = "Wifi password copied successfully!";
const PASSWORD_ERROR = "Error copying the password; please try again.";

const UI_STATES = Object.freeze({
  ACTIVE: "active",
  HIDDEN: "hidden"
});
const BTN_ICONS = Object.freeze({
  CLOSE: "assets/images/icon-close.svg",
  OPEN: "assets/images/icon-menu.svg"
});

function closeMenu() {
  $btnImage.setAttribute("src", BTN_ICONS.OPEN);
  $menu.setAttribute("data-state", UI_STATES.HIDDEN);
  $menuBtn.setAttribute("aria-expanded", "false");
  $menu.setAttribute("inert", "");
}

function openMenu() {
  $btnImage.setAttribute("src", BTN_ICONS.CLOSE);
  $menu.setAttribute("data-state", UI_STATES.ACTIVE);
  $menuBtn.setAttribute("aria-expanded", "true");
  $menu.removeAttribute("inert");
}

function toggleMenu() {
  const isActive = $menu.getAttribute("data-state") === UI_STATES.ACTIVE;

  if (isActive) {
    closeMenu();
  } else {
    openMenu();
  }
}

async function copyPassword() {
  const password = $password.textContent;

  try {
    await navigator.clipboard.writeText(password);
    showToast(PASSWORD_MESSAGE);
  } catch (err) {
    showToast(PASSWORD_ERROR);
  }
}

function showToast(message) {
  $toast.querySelector("p").textContent = message;
  $toast.setAttribute("data-state", "active");

  setTimeout(() => {
    $toast.setAttribute("data-state", "hidden");
  }, 2000);
}

function cleanAria() {
  if (DESKTOP_QUERY.matches) {
    // Desktop
    $menuBtn.removeAttribute("aria-expanded");
    $menu.removeAttribute("data-state");
    $menu.removeAttribute("inert");
    return;
  }

  // Mobile
  closeMenu();
}

$menuBtn.addEventListener("click", toggleMenu);
$passwordBtn.addEventListener("click", copyPassword);
DESKTOP_QUERY.addEventListener("change", cleanAria);
document.addEventListener("DOMContentLoaded", cleanAria);
