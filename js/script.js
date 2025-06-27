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

// ===== 3D Tilt Interaction (Mouse + Touch) =====
if (loginBox) {
  // Mouse
  loginBox.addEventListener("mousemove", handleTilt);
  loginBox.addEventListener("mouseleave", resetTilt);

  // Touch
  loginBox.addEventListener("touchmove", handleTiltTouch, { passive: true });
  loginBox.addEventListener("touchend", resetTilt);
}

// 🔄 Tilt on Mouse
function handleTilt(e) {
  const { offsetWidth: w, offsetHeight: h } = loginBox;
  const x = e.offsetX;
  const y = e.offsetY;
  const rotateX = ((h / 2 - y) / h) * 20;
  const rotateY = ((x - w / 2) / w) * 20;

  loginBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  loginBox.style.transition = "transform 0.1s ease-out";
}

// 🔄 Tilt on Touch
function handleTiltTouch(e) {
  const touch = e.touches[0];
  const rect = loginBox.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  const rotateX = ((rect.height / 2 - y) / rect.height) * 20;
  const rotateY = ((x - rect.width / 2) / rect.width) * 20;

  loginBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  loginBox.style.transition = "transform 0.1s ease-out";
}

// 🔁 Reset Tilt
function resetTilt() {
  loginBox.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  loginBox.style.transition = "transform 0.6s ease";
}

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

  // 🌌 No need to load particles manually — handled inline in index.html
}
