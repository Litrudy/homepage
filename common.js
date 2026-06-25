/* ===== 主页与详情页共用的交互 ===== */

/* 移动端菜单 */
function setupMobileNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  if (!nav || !burger || !links) return;

  const setOpen = (open) => {
    nav.classList.toggle("nav--open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
  };

  burger.addEventListener("click", () => {
    setOpen(!nav.classList.contains("nav--open"));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") setOpen(false);
  });
}

/* 导航栏滚动状态 */
function setupNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* 主题切换（初始主题已由 <head> 内联脚本提前应用，这里只负责图标与点击） */
function setupTheme() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;
  syncIcon();

  toggle.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", next);
    syncIcon();
  });

  function syncIcon() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    toggle.textContent = isLight ? "☀️" : "🌙";
  }
}
