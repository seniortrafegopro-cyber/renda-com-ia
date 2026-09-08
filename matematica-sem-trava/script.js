const CHECKOUT_URL = "";
const toast = document.getElementById("toast");
const mobileBar = document.getElementById("mobileBar");
let toastTimer;
document.querySelectorAll(".js-buy").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (CHECKOUT_URL.trim()) {
      window.location.href = CHECKOUT_URL;
      return;
    }
    clearTimeout(toastTimer);
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  });
});
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 640) mobileBar.classList.toggle("show", window.scrollY > 620);
}, { passive: true });