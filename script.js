/* ===== 主页逻辑（数据来自 data.js，通用交互来自 common.js） ===== */

/* 打字机效果 */
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

/* 渲染技能 */
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

/* 渲染项目卡片（整卡可点击，跳转到详情页） */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = PROJECTS.map(
    (p) => `
    <a class="project reveal" href="project.html?id=${encodeURIComponent(p.id)}"
       aria-label="查看「${p.title}」详情">
      <div class="project__top">
        <span class="project__emoji">${p.emoji}</span>
        ${p.type ? `<span class="project__type">${p.type}</span>` : ""}
      </div>
      <h3 class="project__title">${p.title}</h3>
      <p class="project__desc">${p.summary}</p>
      <div class="project__tags">
        ${p.tags.map((t) => `<span class="project__tag">${t}</span>`).join("")}
      </div>
      <span class="project__more">查看详情 <span class="project__arrow">→</span></span>
    </a>`
  ).join("");
}

/* 滚动揭示 + 技能条动画 */
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

/* 导航高亮跟随滚动 */
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
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const section = document.querySelector(href);
    if (section) observer.observe(section);
  });
}

/* 用资料填充首屏静态文案 */
function fillProfile() {
  const nameEl = document.getElementById("heroName");
  const cnEl = document.getElementById("heroCn");
  if (nameEl) nameEl.textContent = PROFILE.name;
  if (cnEl) cnEl.textContent = `中文名 · ${PROFILE.cnName}`;
}

/* 初始化 */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  fillProfile();
  typeWriter(document.getElementById("typed"), PROFILE.roles);
  renderSkills();
  renderProjects();
  setupReveal();
  setupNav();
  setupMobileNav();
  setupScrollSpy();
  setupTheme();
});
