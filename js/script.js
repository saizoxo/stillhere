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

// ===== 3D TILT MAGIC =====
function apply3DTilt(box) {
  if (!box) return;

  // Mouse Movement
  box.addEventListener("mousemove", e => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    box.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    box.style.transition = "transform 0.1s ease";
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    box.style.transition = "transform 0.6s ease";
  });

  // Touch Movement
  box.addEventListener("touchmove", e => {
    const touch = e.touches[0];
    const rect = box.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    box.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    box.style.transition = "transform 0.1s ease";
  });

  box.addEventListener("touchend", () => {
    box.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    box.style.transition = "transform 0.6s ease";
  });
}

apply3DTilt(loginBox);

// ===== LOGIC =====

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

// 🌀 Fade Out
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

// 💬 Show Error
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.opacity = 1;
}

// 🎧 Autoplay Handler
function handleAutoplay() {
  try {
    bgMusic.play().catch(() => {
      console.warn("Autoplay blocked.");
    });
  } catch (err) {
    console.error("Audio failed to load:", err);
  }
}
