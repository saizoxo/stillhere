// script.js

// ====== GLOBALS ======
const correctPassword = "iloveyou";  // Change as needed
let attemptsLeft = 3;

// DOM Elements
const passwordInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlockBtn");
const errorMsg = document.getElementById("error");
const pageContent = document.querySelector(".fadeout-container");
const bgMusic = document.getElementById("bgMusic");
const muteBtn = document.getElementById("muteBtn");

// ====== FUNCTIONS ======

// Toggle music mute/unmute
function toggleMute() {
  if (bgMusic.paused) {
    bgMusic.play();
    muteBtn.textContent = "Mute";
  } else {
    bgMusic.pause();
    muteBtn.textContent = "Unmute";
  }
}

// Validate password input
function checkPassword() {
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === correctPassword) {
    unlockSuccess();
  } else {
    attemptsLeft--;
    if (attemptsLeft <= 0) {
      window.location.href = "404.html"; // Redirect to custom error page
    } else {
      showError(`Incorrect password. ${attemptsLeft} attempt(s) left.`);
    }
  }
}

// Handle successful login
function unlockSuccess() {
  errorMsg.textContent = "";
  fadeOutContent(() => {
    window.location.href = "home.html"; // Redirect to home after fade out
  });
}

// Animate content fade-out
function fadeOutContent(callback) {
  if (!pageContent) return callback();

  pageContent.style.transition = "opacity 1.5s ease";
  pageContent.style.opacity = 0;
  setTimeout(callback, 1500); // After fade out
}

// Show error message
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.opacity = 1;
  errorMsg.style.transition = "opacity 0.3s ease";
}

// Optionally initialize particles
function initParticles() {
  if (window.particlesJS) {
    particlesJS.load('particles-js', 'js/particles.json', function () {
      console.log('🎆 Particles loaded.');
    });
  }
}

// ====== EVENT LISTENERS ======
unlockBtn.addEventListener("click", checkPassword);
muteBtn.addEventListener("click", toggleMute);

// Auto-play music if allowed
window.addEventListener("load", () => {
  try {
    bgMusic.play().catch(() => {
      console.warn("Autoplay blocked.");
    });
  } catch (e) {
    console.error("Music failed to start:", e);
  }

  initParticles(); // Load particle animation if available
});
