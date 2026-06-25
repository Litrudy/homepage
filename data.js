/* ===== 站点数据（主页与详情页共用） ===== */

const PROFILE = {
  name: "Turdy",
  cnName: "张真",
  greeting: "你好，我是",
  roles: ["全栈开发者", "工具打造者", "独立游戏开发", "终身学习者", "好奇心驱动 ✨"],
  github: "https://github.com/Litrudy",
  githubHandle: "@Litrudy",
};

const SKILLS = [
  { icon: "🐍", name: "Python / FastAPI", level: 90 },
  { icon: "🎨", name: "HTML / CSS / JS", level: 88 },
  { icon: "🌐", name: "TypeScript / React", level: 80 },
  { icon: "🗄️", name: "SQLite / SQLAlchemy", level: 74 },
  { icon: "🎮", name: "Godot / GDScript", level: 72 },
  { icon: "▲", name: "Next.js", level: 68 },
];

/* 每个项目：homepage 用 emoji/title/summary/tags 渲染卡片，
   detail 用于 project.html?id=<id> 详情页。 */
const PROJECTS = [
  {
    id: "combine-dao",
    emoji: "🗡️",
    title: "合道",
    subtitle: "combine-dao",
    type: "独立游戏",
    language: "GDScript",
    stars: 3,
    github: "https://github.com/Litrudy/combine-dao",
    summary:
      "用 Godot 4 制作的修仙题材 Roguelite 动作游戏。在一局局探索中突破境界、构筑流派、收集机缘，与怪物和召唤物同场厮杀。",
    tags: ["Godot 4", "GDScript", "Roguelite", "动作游戏"],
    detail: {
      tagline: "一款修仙题材的 Roguelite 动作游戏",
      overview: [
        "《合道》是我用 Godot 4 引擎独立开发的修仙题材 Roguelite 游戏。玩家在随机生成的地图中探索、战斗、突破境界，每一局都是一次全新的构筑与冒险。",
        "项目从核心战斗循环起步，逐步加入了召唤物、机缘事件、构筑系统，以及随机布置的怪物与事件，目标是把「修仙」的成长感和 Roguelite 的随机性结合起来。",
      ],
      features: [
        "境界突破：通过战斗积累修为，在关键节点突破境界，解锁更强的能力",
        "构筑系统：可视化构筑面板实时预览数值，每局自由搭配出不同流派",
        "机缘事件：风险与收益并存的随机事件，不同选择会改变整局走向",
        "召唤物：可召唤的战斗单位，具备自动寻敌范围与跟随主人的逻辑",
        "智能怪物：怪物拥有警戒范围、脱战机制与随机布置，战斗更有张力",
        "地图交互：可探索的地图事件与互动点",
      ],
      controls: "WASD 移动 · 左键 攻击 · 空格 闪避 · R 突破 · Q / E / F 技能 · Tab 构筑面板",
      techStack: ["Godot 4.6", "GDScript", "Jolt Physics", "D3D12 / GL Compatibility"],
      note: "持续开发中的个人独立游戏项目。",
    },
  },
  {
    id: "vessel-operations-desk",
    emoji: "🚢",
    title: "船舶动态与卸货跟踪系统",
    subtitle: "Vessel Operations Desk",
    type: "全栈 · 行业工具",
    language: "Python · TypeScript",
    github: "https://github.com/Litrudy/vessel-operations-desk",
    summary:
      "为船舶代理日常作业打造的本地化管理系统，覆盖船舶档案、航次、动态事件与卸货进度跟踪。数据全部留在本机，不上云。",
    tags: ["FastAPI", "React", "TypeScript", "SQLite"],
    detail: {
      tagline: "船舶代理的本地化作业台 · v0.4.1",
      overview: [
        "这是一套服务于船舶代理日常工作的管理系统，用来管理船舶航次、ETA、靠泊离港、动态事件和卸货进度。",
        "系统完全在本地运行，所有业务数据仅保存在本机，不连接任何云端服务、不上传文件——这是航运代理场景下对数据安全的硬性要求。",
        "项目按阶段迭代，目前推进到第四阶段（v0.4.1），数据库经历了 7 个版本的无损升级。",
      ],
      features: [
        "船舶与航次管理：档案、11 种状态的航次状态机、搜索筛选分页、软停用不物理删除",
        "动态事件记录：15 种常用事件类型，区分实际发生时间与系统记录时间，可联动航次关键时间",
        "卸货进度跟踪：重量 / 件数 / 车辆三指标独立核算，多货舱批次、累计与完成率实时计算",
        "纠错与审计：直接修改与整批冲销两种方式，全程留存修改历史与原因，进度记录不提供删除",
        "并发安全：乐观并发版本控制，冲突显式报错而非静默覆盖；超计划需二次确认",
        "数据库无损升级：v1 → v7 逐版迁移，旧库可平滑升级",
      ],
      techStack: [
        "Python 3.11 / FastAPI",
        "SQLAlchemy 2.x",
        "SQLite",
        "React / TypeScript / Vite",
        "React Router / Axios",
        "pytest",
      ],
      note: "数据本地保存 · 不上云 · 不集成统计 SDK。",
    },
  },
  {
    id: "work",
    emoji: "🧾",
    title: "船代发票生成系统",
    subtitle: "Invoice Generator",
    type: "全栈 · 行业工具",
    language: "Python · TypeScript",
    github: "https://github.com/Litrudy/work",
    summary:
      "上传一份 Data Excel，自动按行生成几内亚或尼日利亚格式的船代发票并下载。把繁琐的手工填表变成一键生成。",
    tags: ["FastAPI", "Next.js", "openpyxl", "Excel"],
    detail: {
      tagline: "一份 Excel，一键生成合规发票",
      overview: [
        "这是一个把船代发票制作流程自动化的工具：用户上传包含 Data 工作表的 Excel，系统按数据行自动生成几内亚或尼日利亚格式的发票，并打包下载。",
        "发票格式背后有大量业务规则——不同的车辆数、货物数、免税标志会选用不同模板，金额要换算成法语或英语大写文字，还要处理 DA 自动编号、Trans 平移、Minimum 兜底等边界情况。这些规则全部由后端用 Python 精确计算，不依赖 Excel 公式缓存。",
      ],
      features: [
        "智能模板选择：依据 Data 各列自动匹配 General、Vehicle、V&G、bulk、Minimum 等模板",
        "金额文字化：法语（GNF）与英语（NGN）金额大写转换，sentence case 格式",
        "DA 自动编号：每次生成从 0001 起按 Sheet 递增，Trans 平移单独占号，汇总表不参与",
        "免税与税额处理：免税清税与蓝标，Minimum 兜底（低于阈值强制切换）",
        "本机 / 局域网两种部署：可单机使用，也可后端监听全网卡供局域网多机访问",
        "生成日志：每次生成写入金额计算明细与判断过程，便于核对",
      ],
      techStack: ["Python 3.11 / FastAPI", "openpyxl", "Next.js / React", "TypeScript", "Uvicorn"],
    },
  },
  {
    id: "akita",
    emoji: "🌐",
    title: "秋田集团官网",
    subtitle: "Akita Group",
    type: "静态网站 · 多语言",
    language: "HTML · CSS · JS",
    github: "https://github.com/Litrudy/akita",
    live: "https://litrudy.github.io/akita/",
    summary:
      "为物流集团打造的纯静态多页官网，支持中 / 英 / 法三语切换和亮暗双主题，无框架、无构建步骤，开箱即用。",
    tags: ["HTML", "CSS", "JavaScript", "i18n"],
    detail: {
      tagline: "三语 · 双主题 · 零依赖的企业官网",
      overview: [
        "Akita Group（秋田集团）的官方网站，是一个纯静态的多页站点——只有 HTML / CSS / JS，没有框架、没有构建步骤，双击 index.html 就能预览，已部署在 GitHub Pages 上。",
        "全站 7 个页面覆盖首页、关于、服务、运营、案例、新闻和联系，内容以官方文档为准。",
      ],
      features: [
        "三语切换：英文写在标签内，法文 / 中文放 data 属性，JS 自动切换并记忆选择",
        "亮 / 暗双主题：海军蓝 ↔ 炭黑，跟随系统偏好并记忆",
        "7 个完整页面：首页航线图、九国港口网络、服务详情、案例画廊、三语新闻、结构化询价表单",
        "响应式导航：7 项主导航 + 悬停二级菜单，窄屏折叠为汉堡菜单",
        "克制的动效：滚动渐入、数字计数、航线流动，全部尊重 prefers-reduced-motion",
        "设计系统：颜色集中在 CSS 变量，改两个变量即可整站换色",
      ],
      techStack: ["HTML5", "CSS（变量驱动设计系统）", "原生 JavaScript", "GitHub Pages"],
    },
  },
  {
    id: "time-zone-coordinator",
    emoji: "🕐",
    title: "时差协调器",
    subtitle: "Time Zone Coordinator",
    type: "桌面应用 · 小工具",
    language: "Python",
    github: "https://github.com/Litrudy/time-zone-coordinator",
    summary:
      "用 Python 标准库写的 Windows 桌面时差挂件，常驻置顶显示多地时间，支持三套主题、桌面宠物和开机自启。",
    tags: ["Python", "tkinter", "zoneinfo", "Windows"],
    detail: {
      tagline: "桌面上的多时区小挂件",
      overview: [
        "一个常驻桌面的时差小挂件，专为跨地区团队、港口业务和海外协作场景而做。无边框、始终置顶，实时显示目标地区的时间、日期和与本地的真实 UTC 时差。",
        "整个挂件只用 Python 标准库实现（tkinter + zoneinfo + winreg），可以用 PyInstaller 打包成单个 exe 直接分发。",
      ],
      features: [
        "多时区显示：内置 23 个常见城市与港口时区，用 zoneinfo 正确处理夏令时",
        "三套主题：春日 / 机械 / 霓虹，顶部即时切换并记住选择",
        "桌面宠物：英短猫 / 三花猫 / 萨摩耶，移动、睡觉、打招呼三组四帧精灵动画",
        "自由缩放：无边框窗口可从四边四角拖动调整，记忆位置与尺寸",
        "高 DPI 与多显示器：按 96 DPI 逻辑像素保存，跨屏自动换算保持一致视觉尺寸",
        "开机自启：一键设置当前用户开机启动；配置存于 %APPDATA%",
      ],
      techStack: ["Python 3.9+", "tkinter（GUI）", "zoneinfo（时区）", "winreg（自启）", "PyInstaller（打包）"],
    },
  },
  {
    id: "homepage",
    emoji: "🚀",
    title: "我的个人主页",
    subtitle: "homepage",
    type: "个人网站",
    language: "HTML · CSS · JS",
    github: "https://github.com/Litrudy/homepage",
    live: "https://litrudy.github.io/homepage/",
    summary:
      "就是你正在看的这个网站。纯手写 HTML / CSS / JS，练习响应式布局、动画与数据驱动的多页结构。",
    tags: ["HTML", "CSS", "JavaScript"],
    detail: {
      tagline: "你正在浏览的这个网站本身",
      overview: [
        "这个网站没有用任何框架，纯手写 HTML / CSS / JS，用来练习响应式布局、滚动动画、亮暗主题，以及数据驱动的多页结构。",
        "项目与详情页共用同一份数据：主页渲染项目卡片，点进去由同一个模板渲染详情，新增项目只改数据、不碰模板。",
      ],
      features: [
        "数据驱动渲染：项目卡片与详情页都来自一份 data.js",
        "亮 / 暗主题：在 head 内联应用，刷新无闪烁",
        "滚动渐入与导航高亮：IntersectionObserver 实现，错峰入场",
        "移动端汉堡菜单与响应式布局",
        "无障碍：尊重 prefers-reduced-motion，键盘焦点可见",
      ],
      techStack: ["HTML5", "CSS", "原生 JavaScript", "GitHub Pages"],
    },
  },
];
