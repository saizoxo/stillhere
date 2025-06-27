// script.js

// PASSWORD CONFIG
const correctPassword = "iloveyou";
let attemptsLeft = 3;

// DOM ELEMENTS
const unlockBtn = document.getElementById("unlock-btn");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("error-msg");
const audio = document.getElementById("bg-audio");
const muteBtn = document.getElementById("mute-btn");

// PASSWORD CHECK FUNCTION
unlockBtn.addEventListener("click", function () {
  const userInput = passwordInput.value.trim();

  if (userInput === correctPassword) {
    // Optional: fade out effect
    document.querySelector(".login-box").style.opacity = 0;
    setTimeout(() => {
      window.location.href = "home.html"; // Redirect
    }, 500); // Wait for fade out
  } else {
    attemptsLeft--;
    errorMsg.style.display = "block";

    if (attemptsLeft > 0) {
      errorMsg.textContent = `incorrect password • ${attemptsLeft} attempt${attemptsLeft > 1 ? "s" : ""} left`;
    } else {
      // Redirect to 404 if failed 3 times
      window.location.href = "404.html";
    }
  }
});

// MUTE / UNMUTE TOGGLE
muteBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    muteBtn.textContent = "mute";
  } else {
    audio.pause();
    muteBtn.textContent = "unmute";
  }
});

// Auto-play if browser allows
document.addEventListener("DOMContentLoaded", function () {
  // Try to auto-play (some browsers block autoplay)
  audio.play().catch(() => {
    muteBtn.textContent = "unmute";
  });
});
