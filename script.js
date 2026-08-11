/* ---------- Setup & references ---------- */
const launchButton = document.getElementById("launchButton");
const countdown = document.getElementById("countdown");
const rocketContainer = document.getElementById("rocketContainer");
const skipIntroBtn = document.getElementById("skipIntroBtn");
const muteToggle = document.getElementById("muteToggle");
const musicPlayer = document.getElementById("musicPlayer");
const musicPlayBtn = document.getElementById("musicPlayBtn");
const bgMusic = document.getElementById("bgMusic");
const sfxIgnition = document.getElementById("sfxIgnition");
const replayBtn = document.getElementById("replayBtn");
const progressDots = document.getElementById("progressDots");
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const confettiLayer = document.getElementById("confettiLayer");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const numbers = [
  "T - 05",
  "T - 04",
  "T - 03",
  "T - 02",
  "T - 01",
  "IGNITION",
  "LIFTOFF"
];

// Durasi animasi CSS yang harus ditunggu SETELAH langkah "LIFTOFF" tampil,
// supaya sequence ruang angkasa gak mulai sebelum roket & transisi langit selesai.
// - .rocket-liftoff (di style.css) durasinya 2.5s
// - .to-space (di style.css) durasinya 3s
// Diambil yang paling lama, ditambah sedikit jeda (200ms) biar mulus.
const LIFTOFF_ANIM_MS = 2500;
const SKY_TRANSITION_MS = 3000;
const POST_LIFTOFF_BUFFER_MS = 200;
const WAIT_AFTER_LIFTOFF_MS = Math.max(LIFTOFF_ANIM_MS, SKY_TRANSITION_MS) + POST_LIFTOFF_BUFFER_MS;

// Kalau user minta reduced motion, sequence tetap terjadi (state akhirnya sama)
// tapi jeda antar-langkah dipangkas jauh supaya nggak "maksa" nunggu ~13 detik.
const COUNTDOWN_STEP_MS = prefersReducedMotion ? 120 : 1000;
const WAIT_AFTER_LIFTOFF_EFFECTIVE_MS = prefersReducedMotion ? 250 : WAIT_AFTER_LIFTOFF_MS;
const DEEP_SPACE_REVEAL_MS = prefersReducedMotion ? 300 : 3500;

let audioUnlocked = false;
let isMuted = false;
let sequenceStarted = false;

launchButton.addEventListener("click", handleLaunchClick);
skipIntroBtn.addEventListener("click", skipIntro);
muteToggle.addEventListener("click", toggleMute);
musicPlayBtn.addEventListener("click", toggleMusic);
replayBtn.addEventListener("click", resetAndReplay);

/* ---------- Image fallback ---------- */
// SVG placeholder ringan (bintang) dipakai kalau foto asli gagal dimuat,
// supaya gak nampilin broken-image icon browser.
const FALLBACK_IMG_SRC =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">' +
    '<rect width="300" height="300" fill="#1d3d7a"/>' +
    '<path d="M150 70 L168 122 L224 122 L179 155 L196 208 L150 175 L104 208 L121 155 L76 122 L132 122 Z" fill="#F8FAFC" opacity="0.85"/>' +
    '</svg>'
  );

function attachImageFallbacks() {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener(
      "error",
      function onError() {
        img.removeEventListener("error", onError);
        img.src = FALLBACK_IMG_SRC;
        img.alt = img.alt || "Foto tidak dapat dimuat";
        img.classList.add("img-fallback");
      },
      { once: true }
    );
  });
}
attachImageFallbacks();

/* ---------- Skip intro ---------- */
skipIntroBtn.classList.remove("hidden");

function skipIntro() {
  // Lompat langsung ke keadaan akhir sequence tanpa animasi.
  launchButton.style.display = "none";
  countdown.style.display = "none";
  rocketContainer.style.display = "none";

  const landingSection = document.getElementById("landing");
  if (landingSection) landingSection.style.display = "none";

  const spaceContainer = document.getElementById("spaceContainer");
  if (spaceContainer) spaceContainer.classList.add("active");

  const moonGroup = document.querySelector(".moon-group");
  if (moonGroup) moonGroup.classList.add("active");

  document.body.classList.add("in-deep-space");
  skipIntroBtn.classList.add("hidden");

  showPostLaunchContent();
}

/* ---------- Launch sequence ---------- */
async function handleLaunchClick() {
  if (sequenceStarted) return;
  sequenceStarted = true;
  unlockAudio();
  skipIntroBtn.classList.remove("hidden");
  await startLaunch();
  await sleep(WAIT_AFTER_LIFTOFF_EFFECTIVE_MS);
  triggerDeepSpaceSequence();
}

async function startLaunch() {
  launchButton.style.display = "none";
  countdown.style.display = "block";
  rocketContainer.style.display = "block";

  for (const item of numbers) {
    countdown.textContent = item;

    if (item === "T - 04") {
      rocketContainer.classList.add("engine-start");
    }
    if (item === "IGNITION") {
      rocketContainer.classList.add("rocket-shake");
      document.body.classList.add("camera-shake");
      playSfx(sfxIgnition);
    }
    if (item === "LIFTOFF") {
      rocketContainer.classList.remove("rocket-shake");
      document.body.classList.remove("camera-shake");
      rocketContainer.classList.add("rocket-liftoff");
      document.body.classList.add("to-space");
    }
    await sleep(COUNTDOWN_STEP_MS);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function triggerDeepSpaceSequence() {
  const spaceContainer = document.getElementById("spaceContainer");
  const moonGroup = document.querySelector(".moon-group");
  const landingSection = document.getElementById("landing");

  if (landingSection) {
    landingSection.style.transition = "opacity 1s ease";
    landingSection.style.opacity = "0";
    setTimeout(() => {
      landingSection.style.display = "none";
    }, prefersReducedMotion ? 50 : 1000);
  }

  if (spaceContainer) {
    spaceContainer.classList.add("active");
  }

  setTimeout(() => {
    if (moonGroup) moonGroup.classList.add("active");
  }, prefersReducedMotion ? 60 : 400);

  setTimeout(() => {
    document.body.classList.add("in-deep-space");
    startMeteorShower();
  }, prefersReducedMotion ? 100 : 1200);

  setTimeout(() => {
    showPostLaunchContent();
    skipIntroBtn.classList.add("hidden");
  }, DEEP_SPACE_REVEAL_MS);
}

function showPostLaunchContent() {
  const postContent = document.getElementById("postLaunchContent");
  if (postContent) {
    postContent.classList.remove("hidden");
    void postContent.offsetWidth;
    postContent.style.opacity = "1";
    initScrollObserver();
    initProgressDots();
    progressDots.classList.remove("hidden");
  }
  fadeInMusicPlayer();
}

function initScrollObserver() {
  const fadeElements = document.querySelectorAll(".fade-on-scroll");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          if (entry.target.id === "endingBlock") {
            spawnConfetti();
          }
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );
  fadeElements.forEach((el) => observer.observe(el));
}

/* ---------- Progress dots ---------- */
function initProgressDots() {
  const sections = document.querySelectorAll(".story-section");
  const dots = document.querySelectorAll(".dot");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);
      const target = document.querySelector(
        `.story-section[data-section-index="${index}"]`
      );
      if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  });

  const dotObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.sectionIndex;
          dots.forEach((d) => d.classList.toggle("active", d.dataset.index === index));
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach((s) => dotObserver.observe(s));
}

/* ---------- Lightbox (klik foto = full screen) ---------- */
function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || "";
  lightboxOverlay.classList.remove("hidden");
}

function closeLightbox() {
  lightboxOverlay.classList.add("hidden");
  lightboxImage.src = "";
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest(".lightbox-trigger");
  if (trigger) openLightbox(trigger.src, trigger.alt);
});

document.addEventListener("keydown", (e) => {
  if (e.target.classList && e.target.classList.contains("lightbox-trigger") && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    openLightbox(e.target.src, e.target.alt);
  }
  if (e.key === "Escape") closeLightbox();
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxOverlay.addEventListener("click", (e) => {
  if (e.target === lightboxOverlay) closeLightbox();
});

/* ---------- Shooting stars / meteors ---------- */
function startMeteorShower() {
  if (prefersReducedMotion) return; // ambient decorative motion skipped
  const layer = document.getElementById("layerMeteors");
  if (!layer) return;

  function spawnMeteor() {
    const startX = 300 + Math.random() * 1300;
    const startY = 60 + Math.random() * 300;
    const length = 90 + Math.random() * 60;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", startX - length);
    line.setAttribute("y2", startY + length * 0.55);
    line.setAttribute("class", "meteor");
    layer.appendChild(line);

    requestAnimationFrame(() => {
      line.classList.add("fire");
    });

    setTimeout(() => line.remove(), 1800);
  }

  spawnMeteor();
  window.__meteorInterval = setInterval(() => {
    if (document.body.classList.contains("in-deep-space")) {
      spawnMeteor();
    }
  }, 4500 + Math.random() * 3000);
}

function stopMeteorShower() {
  if (window.__meteorInterval) {
    clearInterval(window.__meteorInterval);
    window.__meteorInterval = null;
  }
  const layer = document.getElementById("layerMeteors");
  if (layer) layer.innerHTML = "";
}

/* ---------- Confetti / falling hearts on ending ---------- */
function spawnConfetti() {
  if (!confettiLayer || confettiLayer.dataset.done === "true") return;
  confettiLayer.dataset.done = "true";

  if (prefersReducedMotion) return;

  const symbols = ["🤍", "✨", "⭐", "🤍", "✨"];
  const pieces = 26;

  for (let i = 0; i < pieces; i++) {
    const span = document.createElement("span");
    span.className = "confetti-piece";
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = Math.random() * 100 + "%";
    span.style.animationDuration = 3 + Math.random() * 3 + "s";
    span.style.animationDelay = Math.random() * 1.5 + "s";
    span.style.fontSize = 12 + Math.random() * 14 + "px";
    confettiLayer.appendChild(span);
    setTimeout(() => span.remove(), 8000);
  }
}

/* ---------- Audio: background music + sfx + mute ---------- */
function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;
  muteToggle.classList.remove("hidden");

  if (bgMusic) {
    bgMusic.volume = 0.35;
    bgMusic.play().catch(() => {
      // Autoplay diblokir atau file asset belum ada — sembunyikan player, gak masalah.
      musicPlayer.classList.add("hidden");
    });
  }
}

function fadeInMusicPlayer() {
  if (!bgMusic) return;
  // Hanya tampilkan mini player kalau musiknya berhasil kepasang & jalan.
  bgMusic.addEventListener(
    "canplay",
    () => {
      if (!bgMusic.error) musicPlayer.classList.remove("hidden");
    },
    { once: true }
  );
  bgMusic.addEventListener(
    "error",
    () => {
      musicPlayer.classList.add("hidden");
    },
    { once: true }
  );
  if (bgMusic.readyState >= 2 && !bgMusic.error) {
    musicPlayer.classList.remove("hidden");
  }
}

function toggleMusic() {
  if (!bgMusic) return;
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    musicPlayBtn.textContent = "🎵";
  } else {
    bgMusic.pause();
    musicPlayBtn.textContent = "▶";
  }
}

function toggleMute() {
  isMuted = !isMuted;
  if (bgMusic) bgMusic.muted = isMuted;
  if (sfxIgnition) sfxIgnition.muted = isMuted;
  muteToggle.textContent = isMuted ? "🔇" : "🔊";
  muteToggle.setAttribute("aria-pressed", String(isMuted));
}

function playSfx(el) {
  if (!el || isMuted) return;
  el.currentTime = 0;
  el.play().catch(() => {
    /* Asset suara belum ada / diblokir browser — abaikan dengan tenang. */
  });
}

/* ---------- Replay ---------- */
function resetAndReplay() {
  stopMeteorShower();
  confettiLayer.innerHTML = "";
  confettiLayer.dataset.done = "false";

  document.querySelectorAll(".fade-on-scroll").forEach((el) => el.classList.remove("visible"));

  const postContent = document.getElementById("postLaunchContent");
  postContent.style.opacity = "0";
  postContent.classList.add("hidden");
  progressDots.classList.add("hidden");

  const landingSection = document.getElementById("landing");
  landingSection.style.display = "flex";
  landingSection.style.opacity = "1";

  document.body.classList.remove("in-deep-space", "to-space", "camera-shake");
  const spaceContainer = document.getElementById("spaceContainer");
  spaceContainer.classList.remove("active");
  document.querySelector(".moon-group").classList.remove("active");

  rocketContainer.classList.remove("engine-start", "rocket-shake", "rocket-liftoff");
  rocketContainer.style.display = "none";
  countdown.style.display = "none";
  countdown.textContent = "";
  launchButton.style.display = "inline-block";

  window.scrollTo({ top: 0, behavior: "auto" });
  sequenceStarted = false;
}
