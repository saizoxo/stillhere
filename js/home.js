document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");
  const muteBtn = document.getElementById("mute-btn");
  const bgMusic = document.getElementById("bgMusic");

  envelopes.forEach((env) => {
    let stage = 0;
    const placeholder = env.getAttribute("data-placeholder") || "open me";
    const paperSlide = env.querySelector(".paper-slide");
    const realPaper = env.querySelector(".paper");

    env.setAttribute("data-placeholder", placeholder);

    env.addEventListener("click", (e) => {
      e.stopPropagation();

      // 💥 Close all other envelopes first
      envelopes.forEach((otherEnv) => {
        if (otherEnv !== env) {
          otherEnv.classList.remove("open");
          otherEnv.setAttribute("data-placeholder", otherEnv.getAttribute("data-placeholder-original") || "open me");

          const otherSlide = otherEnv.querySelector(".paper-slide");
          const otherPaper = otherEnv.querySelector(".paper");

          if (otherSlide) otherSlide.style.display = "none";
          if (otherPaper) {
            otherPaper.classList.remove("show");
            otherPaper.style.transform = "scale(1)";
            otherPaper.style.zIndex = "5";
          }

          // Reset stage of other envelopes
          otherEnv.dataset.stage = "0";
        }
      });

      // 🌀 Step control using dataset
      stage = parseInt(env.dataset.stage || "0");

      // STEP 0 → Show flap and mini paper
      if (stage === 0) {
        env.classList.add("open");
        env.setAttribute("data-placeholder", "");
        if (paperSlide) paperSlide.style.display = "block";
        env.dataset.stage = "1";
        return;
      }

      // STEP 1 → Show full letter
      if (stage === 1) {
        if (realPaper) {
          realPaper.classList.add("show");
          env.dataset.stage = "2";
        }
        return;
      }

      // STEP 2 → Fullscreen zoom
      if (stage === 2) {
        if (realPaper) {
          realPaper.style.transform = "scale(1.15)";
          realPaper.style.zIndex = "10";
          env.dataset.stage = "3";
        }
        return;
      }

      // STEP 3 → Restore zoom
      if (stage === 3) {
        if (realPaper) {
          realPaper.style.transform = "scale(1)";
          realPaper.style.zIndex = "5";
          env.dataset.stage = "2";
        }
      }
    });
  });

  // 🎵 Mute / Unmute Button
  muteBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      muteBtn.textContent = "mute";
    } else {
      bgMusic.pause();
      muteBtn.textContent = "unmute";
    }
  });
});
