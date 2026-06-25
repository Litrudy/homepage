/* ===== 项目详情页逻辑（数据来自 data.js） ===== */

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function getProject() {
  const id = new URLSearchParams(location.search).get("id");
  return PROJECTS.find((p) => p.id === id) || null;
}

function renderNotFound() {
  document.title = "项目未找到 · " + PROFILE.name;
  document.getElementById("projectRoot").innerHTML = `
    <div class="notfound">
      <div class="notfound__emoji">🔍</div>
      <h1>没有找到这个项目</h1>
      <p>链接可能失效了，或者项目还没收录。</p>
      <a class="btn btn--primary" href="index.html#projects">← 返回项目列表</a>
    </div>`;
}

function renderProject(p) {
  const d = p.detail || {};
  document.title = `${p.title} · ${PROFILE.name}`;

  const links = [
    p.github &&
      `<a class="btn btn--primary" href="${p.github}" target="_blank" rel="noopener">在 GitHub 查看</a>`,
    p.live &&
      `<a class="btn btn--ghost" href="${p.live}" target="_blank" rel="noopener">在线访问 ↗</a>`,
  ]
    .filter(Boolean)
    .join("");

  const meta = [
    p.language && `<span class="detail__metaitem">💻 ${escapeHtml(p.language)}</span>`,
    typeof p.stars === "number" &&
      p.stars > 0 &&
      `<span class="detail__metaitem">⭐ ${p.stars}</span>`,
    p.subtitle && `<span class="detail__metaitem detail__metaitem--mono">${escapeHtml(p.subtitle)}</span>`,
  ]
    .filter(Boolean)
    .join("");

  const overview = (d.overview || [])
    .map((para) => `<p>${escapeHtml(para)}</p>`)
    .join("");

  const features = (d.features || [])
    .map((f) => `<li>${escapeHtml(f)}</li>`)
    .join("");

  const tech = (d.techStack || [])
    .map((t) => `<span class="tech-item">${escapeHtml(t)}</span>`)
    .join("");

  document.getElementById("projectRoot").innerHTML = `
    <a class="detail__back" href="index.html#projects">← 返回项目列表</a>

    <header class="detail__header reveal is-visible">
      <div class="detail__emoji">${p.emoji}</div>
      <h1 class="detail__title">${escapeHtml(p.title)}</h1>
      ${d.tagline ? `<p class="detail__tagline">${escapeHtml(d.tagline)}</p>` : ""}
      <div class="detail__meta">${meta}</div>
      ${
        p.tags
          ? `<div class="project__tags detail__tags">${p.tags
              .map((t) => `<span class="project__tag">${escapeHtml(t)}</span>`)
              .join("")}</div>`
          : ""
      }
      ${links ? `<div class="detail__links">${links}</div>` : ""}
    </header>

    ${
      overview
        ? `<section class="detail__section reveal">
             <h2 class="detail__h2"><span class="detail__h2num">01</span> 概述</h2>
             <div class="detail__prose">${overview}</div>
           </section>`
        : ""
    }

    ${
      features
        ? `<section class="detail__section reveal">
             <h2 class="detail__h2"><span class="detail__h2num">02</span> 核心功能</h2>
             <ul class="feature-list">${features}</ul>
           </section>`
        : ""
    }

    ${
      d.controls
        ? `<section class="detail__section reveal">
             <h2 class="detail__h2"><span class="detail__h2num">⌨</span> 操作</h2>
             <p class="detail__controls">${escapeHtml(d.controls)}</p>
           </section>`
        : ""
    }

    ${
      tech
        ? `<section class="detail__section reveal">
             <h2 class="detail__h2"><span class="detail__h2num">03</span> 技术栈</h2>
             <div class="tech-list">${tech}</div>
           </section>`
        : ""
    }

    ${d.note ? `<p class="detail__note">${escapeHtml(d.note)}</p>` : ""}

    <nav class="detail__nav">${renderSiblingNav(p)}</nav>
  `;
}

/* 上一个 / 下一个项目导航 */
function renderSiblingNav(p) {
  const i = PROJECTS.findIndex((x) => x.id === p.id);
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const link = (proj, dir, label) =>
    `<a class="detail__navlink detail__navlink--${dir}" href="project.html?id=${encodeURIComponent(
      proj.id
    )}">
       <span class="detail__navdir">${label}</span>
       <span class="detail__navname">${proj.emoji} ${escapeHtml(proj.title)}</span>
     </a>`;
  return link(prev, "prev", "← 上一个") + link(next, "next", "下一个 →");
}

/* 揭示动画（详情页内联简化版） */
function setupRevealSimple() {
  const items = document.querySelectorAll(".reveal:not(.is-visible)");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const p = getProject();
  if (p) renderProject(p);
  else renderNotFound();

  setupRevealSimple();
  setupNav();
  setupMobileNav();
  setupTheme();
  // 切换详情页时滚回顶部
  window.scrollTo(0, 0);
});
