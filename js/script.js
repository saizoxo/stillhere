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
  // Mouse events
  loginBox.addEventListener("mousemove", handleTilt);
  loginBox.addEventListener("mouseleave", resetTilt);

  // Touch events
  loginBox.addEventListener("touchmove", handleTiltTouch);
  loginBox.addEventListener("touchend", resetTilt);
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

// 🧠 Tilt Effect (Mouse)
function handleTilt(e) {
  const { width, height, left, top } = loginBox.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;

  const rotateX = ((y / height) - 0.5) * -20;
  const rotateY = ((x / width) - 0.5) * 20;

  loginBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// 🧠 Tilt Effect (Touch)
function handleTiltTouch(e) {
  const touch = e.touches[0];
  const { width, height, left, top } = loginBox.getBoundingClientRect();
  const x = touch.clientX - left;
  const y = touch.clientY - top;

  const rotateX = ((y / height) - 0.5) * -20;
  const rotateY = ((x / width) - 0.5) * 20;

  loginBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// 🔁 Reset Tilt
function resetTilt() {
  loginBox.style.transform = "rotateX(0deg) rotateY(0deg)";
}
