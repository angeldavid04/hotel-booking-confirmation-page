const $menuBtn = document.querySelector(".header__btn");
const $btnImage = $menuBtn.querySelector(".header__img");
const $menu = document.querySelector(".sidebar");
const $password = document.getElementById("password");
const $passwordBtn = document.getElementById("password-btn");
const $toast = document.querySelector(".toast");

const PASSWORD_MESSAGE = "¡Wifi password copied successfully!";
const PASSWORD_ERROR = "Error copying the password; please try again.";

const MENU_STATES = Object.freeze({
  ACTIVE: "active",
  HIDDEN: "hidden"
});
const BTN_ICONS = Object.freeze({
  CLOSE: "assets/images/icon-close.svg",
  OPEN: "assets/images/icon-menu.svg"
});

function toggleMenu() {
  const isActive = $menu.getAttribute("data-state") === MENU_STATES.ACTIVE;

  if (isActive) {
    $btnImage.setAttribute("src", BTN_ICONS.OPEN);
    $menu.setAttribute("data-state", MENU_STATES.HIDDEN);
    $menuBtn.setAttribute("aria-expanded", "false");
    $menu.setAttribute("aria-hidden", "true");
  } else {
    $btnImage.setAttribute("src", BTN_ICONS.CLOSE);
    $menu.setAttribute("data-state", MENU_STATES.ACTIVE);
    $menuBtn.setAttribute("aria-expanded", "true");
    $menu.setAttribute("aria-hidden", "false");
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

function removeHidden() {
  const desktopQuery = "(width >= 68rem)";

  if (window.matchMedia(desktopQuery).matches) {
    $menuBtn.removeAttribute("aria-expanded");
    $menu.removeAttribute("aria-hidden");
    return;
  }

  $menuBtn.setAttribute("aria-expanded", "false");
  $menu.setAttribute("aria-hidden", "true");
}

$menuBtn.addEventListener("click", toggleMenu);
$passwordBtn.addEventListener("click", copyPassword);
window.addEventListener("resize", removeHidden);
