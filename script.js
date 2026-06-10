/* ===== 数据 ===== */
const ROLES = [
  "编程爱好者",
  "代码创造者",
  "终身学习者",
  "Bug 终结者 🐞",
  "好奇心驱动 ✨",
];

const SKILLS = [
  { icon: "🐍", name: "Python", level: 85 },
  { icon: "🌐", name: "JavaScript", level: 80 },
  { icon: "🎨", name: "HTML / CSS", level: 88 },
  { icon: "⚙️", name: "Git & 工具", level: 75 },
  { icon: "🗄️", name: "数据库", level: 65 },
  { icon: "🧠", name: "算法 & 数据结构", level: 70 },
];

const PROJECTS = [
  {
    emoji: "🚀",
    title: "我的个人主页",
    desc: "就是你正在看的这个网站！纯手写 HTML/CSS/JS，练习响应式布局与动画。",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    emoji: "🛠️",
    title: "小工具集合",
    desc: "平时为了偷懒写的各种脚本和小工具，自动化重复劳动，把时间还给摸鱼。",
    tags: ["Python", "自动化"],
  },
  {
    emoji: "📒",
    title: "学习笔记",
    desc: "记录学习过程中的踩坑与心得，整理成可复用的知识库，温故而知新。",
    tags: ["Markdown", "笔记"],
  },
  {
    emoji: "💡",
    title: "更多想法孵化中",
    desc: "脑子里总有一堆点子排队等着实现，敬请期待下一个有趣的小项目！",
    tags: ["Coming soon"],
  },
];

/* ===== 打字机效果 ===== */
function typeWriter(el, words) {
  // 用户偏好减少动效时，直接显示第一个词
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = words[0];
    return;
  }
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];
    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }
    el.textContent = word.slice(0, charIndex);

    let delay = deleting ? 55 : 110;
    if (!deleting && charIndex === word.length) {
      delay = 1600; // 停留
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  }
  tick();
}

/* ===== 渲染技能 ===== */
function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = SKILLS.map(
    (s) => `
    <div class="skill reveal">
      <div class="skill__icon">${s.icon}</div>
      <div class="skill__name">${s.name}</div>
      <div class="skill__bar"><div class="skill__fill" data-level="${s.level}"></div></div>
      <div class="skill__pct">${s.level}%</div>
    </div>`
  ).join("");
}

/* ===== 渲染项目 ===== */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = PROJECTS.map(
    (p) => `
    <article class="project reveal">
      <div class="project__emoji">${p.emoji}</div>
      <h3 class="project__title">${p.title}</h3>
      <p class="project__desc">${p.desc}</p>
      <div class="project__tags">
        ${p.tags.map((t) => `<span class="project__tag">${t}</span>`).join("")}
      </div>
    </article>`
  ).join("");
}

/* ===== 滚动揭示 + 技能条动画 ===== */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        // 若内部含技能条，触发填充（与卡片错峰入场同步）
        const fill = entry.target.querySelector(".skill__fill");
        if (fill) {
          fill.style.transitionDelay = entry.target.style.getPropertyValue("--delay") || "0ms";
          requestAnimationFrame(() => {
            fill.style.width = fill.dataset.level + "%";
          });
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => {
    // 同一容器内的兄弟元素按顺序错峰入场
    const siblings = [...item.parentElement.children].filter((c) =>
      c.classList.contains("reveal")
    );
    if (siblings.length > 1) {
      item.style.setProperty("--delay", `${siblings.indexOf(item) * 70}ms`);
    }
    observer.observe(item);
  });
}

/* ===== 导航栏滚动状态 ===== */
function setupNav() {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ===== 移动端菜单 ===== */
function setupMobileNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");

  const setOpen = (open) => {
    nav.classList.toggle("nav--open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
  };

  burger.addEventListener("click", () => {
    setOpen(!nav.classList.contains("nav--open"));
  });
  // 点击链接后收起菜单
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") setOpen(false);
  });
}

/* ===== 导航高亮跟随滚动 ===== */
function setupScrollSpy() {
  const links = document.querySelectorAll(".nav__links a");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) =>
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === "#" + entry.target.id
          )
        );
      });
    },
    // 以视口中部为判定带，避免相邻区块同时命中
    { rootMargin: "-40% 0px -55% 0px" }
  );
  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) observer.observe(section);
  });
}

/* ===== 主题切换 ===== */
function setupTheme() {
  const toggle = document.getElementById("themeToggle");
  // 初始主题已由 <head> 内联脚本提前应用，这里只需同步图标
  syncIcon();

  toggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
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

/* ===== 初始化 ===== */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  typeWriter(document.getElementById("typed"), ROLES);
  renderSkills();
  renderProjects();
  setupReveal();
  setupNav();
  setupMobileNav();
  setupScrollSpy();
  setupTheme();
});
