// script.js

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
const pageContainer = document.querySelector(".container");

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

// 💬 Show Error
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.opacity = 1;
}

// 🌀 Fade out Animation
function fadeOut(callback) {
  if (!pageContainer) return callback();
  pageContainer.style.transition = "opacity 1.2s ease";
  pageContainer.style.opacity = 0;
  setTimeout(callback, 1200);
}

// 🎧 Handle Autoplay on Load
function handleAutoplay() {
  try {
    bgMusic.play().catch(() => {
      console.warn("Autoplay blocked.");
    });
  } catch (err) {
    console.error("Audio failed to load:", err);
  }

  loadParticles(); // Load if available
}

// 🌌 Load Particles
function loadParticles() {
  if (window.particlesJS) {
    particlesJS.load("particles-js", "js/particles.json", () => {
      console.log("✨ Particles loaded.");
    });
  }
}
