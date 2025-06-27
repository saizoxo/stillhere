// ===== CONFIGURATION =====
const CORRECT_PASSWORD = "iloveyou";
const MAX_ATTEMPTS = 3;

// ===== STATE VARIABLES =====
let attemptsLeft = MAX_ATTEMPTS;

// ===== DOM ELEMENTS =====
const passwordInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlock-btn");
const errorMsg = document.getElementById("error-msg");
const muteBtn = document.getElementById("mute-btn");
const bgMusic = document.getElementById("bg-music");
const container = document.querySelector(".container");

// ====== EVENT BINDING ======
unlockBtn?.addEventListener("click", validatePassword);
muteBtn?.addEventListener("click", toggleMusic);
window.addEventListener("load", handleAutoplay);

// ====== FUNCTIONS ======

// 🔐 Validate Password
function validatePassword() {
  const entered = passwordInput.value.trim();
  if (entered === CORRECT_PASSWORD) {
    onLoginSuccess();
  } else {
    attemptsLeft--;
    if (attemptsLeft <= 0) {
      window.location.href = "404.html";
    } else {
      showError(`Incorrect password. ${attemptsLeft} attempt(s) left.`);
    }
  }
}

// ✅ On Login Success
function onLoginSuccess() {
  showError("");
  fadeOut(() => {
    window.location.href = "home.html";
  });
}

// 🌀 Fade Out Only the Login UI (not particles)
function fadeOut(callback) {
  if (!container) return callback();

  // Only fade the login UI
  container.style.transition = "opacity 1.2s ease";
  container.style.opacity = 0;

  // Ensure callback after fade
  setTimeout(callback, 1200);
}

// 🎵 Toggle Music
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    muteBtn.textContent = "mute";
  } else {
    bgMusic.pause();
    muteBtn.textContent = "unmute";
  }
}

// 💬 Show Error Message
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.opacity = 1;
}

// 🎧 Handle Autoplay + Particles on Load
function handleAutoplay() {
  try {
    bgMusic.play().catch(() => {
      console.warn("Autoplay blocked.");
    });
  } catch (err) {
    console.error("Audio failed to load:", err);
  }

  loadParticles();
}

// 🌌 Load Particles Background
function loadParticles() {
  if (window.particlesJS) {
    particlesJS.load("particles-js", "js/particles.json", () => {
      console.log("✨ Particles loaded.");
    });

    // Extra: Force canvas visibility
    setTimeout(() => {
      const canvas = document.querySelector("#particles-js canvas");
      if (canvas) canvas.style.opacity = 1;
    }, 1500);
  } else {
    console.warn("⚠️ particlesJS not available");
  }
}
