const products = [
  {
    name: "SkyVision X7",
    tag: "Flagship",
    desc: "8K dual-ISO camera, 40 min flight, active horizon lock in gale winds.",
    image: "assets/SkyVision X7.png"
  },
  {
    name: "AeroScout R4",
    tag: "Rescue",
    desc: "Thermal vision, loud-hailer pod, and rapid obstacle reroute for search teams.",
    image: "assets/AeroScout R4.png"
  },
  {
    name: "Pulse Lite",
    tag: "Compact",
    desc: "Travel-ready folding arms, 4K HDR, and geo-fence safe mode for new pilots.",
    image: "assets/Pulse Lite.png"
  },
  {
    name: "Atlas 2",
    tag: "Industrial",
    desc: "LiDAR payload ready, 55 min endurance, magnetic interference shielding.",
    image: "assets/Atlas 2.png"
  },
  {
    name: "Flow One",
    tag: "Cine",
    desc: "Featherweight FPV tuned for buttery follow shots with ultra-low latency link.",
    image: "assets/Flow One.png"
  }
];

const forums = [
  {
    user: "engineer_j",
    title: "Coastal wind autopilot update",
    body: "How to pair gust tracking with manual override without losing horizon lock.",
    views: 2.3,
    likes: 410,
    shares: 54,
    category: "Engineering"
  },
  {
    user: "pilot_azza",
    title: "FPV reel with Flow One",
    body: "Shared my cinema color presets for neon city racing. Feedback welcome!",
    views: 1.9,
    likes: 350,
    shares: 32,
    category: "Cinematography"
  },
  {
    user: "rescue_ops",
    title: "Thermal mission in heavy rain",
    body: "Rescue tips for R4 when mist confuses the sensor. Quick checklist inside.",
    views: 3.2,
    likes: 480,
    shares: 61,
    category: "Rescue"
  },
  {
    user: "maya.mapping",
    title: "LiDAR workflow for Atlas 2",
    body: "Exporting clean point clouds with minimal noise for terrain rebuilds.",
    views: 2.0,
    likes: 270,
    shares: 41,
    category: "Mapping"
  },
  {
    user: "crewline",
    title: "New pilot onboarding kit",
    body: "We compiled checklists, safety cards, and a printable preflight board.",
    views: 1.2,
    likes: 190,
    shares: 18,
    category: "Community"
  },
  {
    user: "wild.ops",
    title: "Silent approach for wildlife survey",
    body: "How we reduced noise signature for nesting sites using Flow One props.",
    views: 1.1,
    likes: 160,
    shares: 15,
    category: "Wildlife"
  },
  {
    user: "industria",
    title: "Mag interference near cranes",
    body: "Atlas 2 compass drift fix when flying close to active cranes and steel beams.",
    views: 1.5,
    likes: 210,
    shares: 22,
    category: "Industrial"
  },
  {
    user: "sportsline",
    title: "Live sports RF settings",
    body: "Low latency link presets for stadiums so Live Sports feeds stay locked.",
    views: 2.6,
    likes: 330,
    shares: 48,
    category: "Sports"
  }
];

const categories = [
  "All",
  "Cinematography",
  "Rescue",
  "Wildlife",
  "Industrial",
  "Sports",
  "Engineering",
  "Mapping",
  "Community"
];

const productGrid = document.getElementById("productGrid");
const forumGrid = document.getElementById("forumGrid");
const filterBar = document.getElementById("filterBar");

const setForumFilter = (cat) => {
  renderFilters(cat);
  renderForums(cat);
};

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (p) => `
        <article class="card product-card">
          <div class="product-thumb">
            <img src="${p.image}" alt="${p.name} image">
            <span class="product-tag">${p.tag}</span>
          </div>
          <div class="product-body">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div class="actions">
              <a class="btn primary" href="#store">Go to Store</a>
              <a class="btn ghost" href="#forum">Ask the crew</a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderFilters(active = "All") {
  filterBar.innerHTML = categories
    .map(
      (c) =>
        `<button class="filter-btn ${c === active ? "active" : ""}" data-cat="${c}">${c}</button>`
    )
    .join("");
}

function renderForums(active = "All") {
  const filtered = active === "All" ? forums : forums.filter((f) => f.category === active);
  forumGrid.innerHTML = filtered
    .map(
      (f) => `
      <article class="card">
        <div class="meta">
          <span>@${f.user}</span>
          <span>${f.category}</span>
        </div>
        <h3>${f.title}</h3>
        <p>${f.body}</p>
        <div class="counts">
          <span>${f.views.toFixed(1)}k views</span>
          <span>${f.likes} likes</span>
          <span>${f.shares} share</span>
        </div>
      </article>
    `
    )
    .join("");
}

renderProducts();
renderFilters();
renderForums();

filterBar.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-cat]");
  if (!btn) return;
  const cat = btn.dataset.cat;
  setForumFilter(cat);
});

/* Hero field chips -> forum filters */
document.querySelectorAll(".field-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const cat = chip.dataset.cat;
    setForumFilter(cat);
    location.hash = "#forum";
  });
});

/* Mobile nav toggle */
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

/* Hero video: swap between primary and tiger clip */
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  const heroSources = [heroVideo.dataset.srcPrimary, heroVideo.dataset.srcAlt].filter(Boolean);
  let heroIndex = 0;

  heroVideo.addEventListener("ended", () => {
    if (heroSources.length < 2) {
      heroVideo.currentTime = 0;
      heroVideo.play();
      return;
    }
    heroIndex = (heroIndex + 1) % heroSources.length;
    heroVideo.src = heroSources[heroIndex];
    heroVideo.currentTime = 0;
    heroVideo.play();
  });
}

/* Metric animation */
const metrics = document.querySelectorAll(".metric-value");
const animateMetrics = () => {
  metrics.forEach((el) => {
    const target = Number(el.dataset.target);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = current;
      requestAnimationFrame(tick);
    };
    tick();
  });
};
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateMetrics();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(document.querySelector("#home"));
} else {
  animateMetrics();
}

/* Contact form validation */
const form = document.getElementById("contactForm");
const errors = {
  name: document.getElementById("err-name"),
  email: document.getElementById("err-email"),
  phone: document.getElementById("err-phone"),
  role: document.getElementById("err-role"),
  channel: document.getElementById("err-channel"),
  message: document.getElementById("err-message"),
  terms: document.getElementById("err-terms")
};

const isEmailBasic = (value) => value.includes("@") && value.split("@")[1]?.includes(".");
const isPhoneBasic = (value) => {
  let digits = 0;
  for (const ch of value) {
    if (ch >= "0" && ch <= "9") digits += 1;
  }
  return digits >= 9 && digits <= 14;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const name = form.name.value.trim();
  if (name.length < 3) {
    errors.name.textContent = "Name should be at least 3 characters.";
    valid = false;
  } else {
    errors.name.textContent = "";
  }

  const email = form.email.value.trim();
  if (!isEmailBasic(email)) {
    errors.email.textContent = "Enter a reachable email (name@domain).";
    valid = false;
  } else {
    errors.email.textContent = "";
  }

  const phone = form.phone.value.trim();
  if (!isPhoneBasic(phone)) {
    errors.phone.textContent = "Phone should contain 9-14 digits.";
    valid = false;
  } else {
    errors.phone.textContent = "";
  }

  const role = form.role.value;
  if (!role) {
    errors.role.textContent = "Choose your focus.";
    valid = false;
  } else {
    errors.role.textContent = "";
  }

  const channel = form.querySelector('input[name="channel"]:checked');
  if (!channel) {
    errors.channel.textContent = "Pick a preferred channel.";
    valid = false;
  } else {
    errors.channel.textContent = "";
  }

  const message = form.message.value.trim();
  if (message.length < 12) {
    errors.message.textContent = "Tell us a bit more about your mission.";
    valid = false;
  } else {
    errors.message.textContent = "";
  }

  if (!form.terms.checked) {
    errors.terms.textContent = "You must agree to continue.";
    valid = false;
  } else {
    errors.terms.textContent = "";
  }

  if (valid) {
    alert("Request sent. Our contact center will respond soon.");
    form.reset();
  }
});

/* Store badge alerts */
document.querySelectorAll('.badge[data-store]').forEach((badge) => {
  badge.addEventListener("click", (e) => {
    e.preventDefault();
    const store = badge.dataset.store || "store";
    alert(`Opening ${store} soon. Stay tuned!`);
  });
});

document.querySelectorAll('.badge[data-partner]').forEach((badge) => {
  badge.addEventListener("click", (e) => {
    e.preventDefault();
    const partner = badge.dataset.partner || "partner";
    alert(`Redirecting to ${partner} soon. Stay tuned!`);
  });
});
