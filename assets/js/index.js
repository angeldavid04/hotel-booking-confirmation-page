const $menuBtn = document.querySelector(".header__btn");
const $btnImage = $menuBtn.querySelector(".header__img");
const $menu = document.querySelector(".sidebar");
const $password = document.getElementById("password");
const $passwordBtn = document.getElementById("password-btn");

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
    console.log("contenido copiado al portapapeles");
  } catch (err) {
    console.error("Error copying the password");
  }
}

$menuBtn.addEventListener("click", toggleMenu);
$passwordBtn.addEventListener("click", copyPassword);
