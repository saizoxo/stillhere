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
const loginBox = document.querySelector(".login-box");

// ====== EVENT BINDING ======
unlockBtn?.addEventListener("click", validatePassword);
muteBtn?.addEventListener("click", toggleMusic);
window.addEventListener("load", handleAutoplay);

if (loginBox) {
  loginBox.addEventListener("mousemove", handleTilt);
  loginBox.addEventListener("mouseleave", resetTilt);
  loginBox.addEventListener("mouseenter", applyScale);

  loginBox.addEventListener("touchmove", handleTiltTouch);
  loginBox.addEventListener("touchend", resetTilt);
  loginBox.addEventListener("touchstart", applyScale);
}

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
  container.style.transition = "opacity 1.2s ease";
  container.style.opacity = 0;
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

// 🎧 Handle Autoplay on Load
function handleAutoplay() {
  try {
    bgMusic.play().catch(() => {
      console.warn("Autoplay blocked.");
    });
  } catch (err) {
    console.error("Audio failed to load:", err);
  }
}

// 🎯 Tilt Logic (Shared)
function computeTilt(x, y, width, height) {
  const rotateX = ((y / height) - 0.5) * -20;
  const rotateY = ((x / width) - 0.5) * 20;
  return { rotateX, rotateY };
}

// 🧠 Tilt Effect (Mouse)
function handleTilt(e) {
  const { width, height, left, top } = loginBox.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;
  const { rotateX, rotateY } = computeTilt(x, y, width, height);
  loginBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
}

// 🧠 Tilt Effect (Touch)
function handleTiltTouch(e) {
  const touch = e.touches[0];
  const { width, height, left, top } = loginBox.getBoundingClientRect();
  const x = touch.clientX - left;
  const y = touch.clientY - top;
  const { rotateX, rotateY } = computeTilt(x, y, width, height);
  loginBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
}

// ⚡ Scale on hover/tap
function applyScale() {
  loginBox.style.transition = "transform 0.2s ease";
  loginBox.style.transform += " scale(1.03)";
}

// 🔁 Reset Tilt
function resetTilt() {
  loginBox.style.transition = "transform 0.4s ease";
  loginBox.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
}
