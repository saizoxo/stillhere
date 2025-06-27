document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");
  const muteBtn = document.getElementById("mute-btn");
  const bgMusic = document.getElementById("bgMusic");

  envelopes.forEach((env) => {
    const placeholder = env.getAttribute("data-placeholder") || "open me";
    const paperSlide = env.querySelector(".paper-slide");
    const realPaper = env.querySelector(".paper");

    env.setAttribute("data-placeholder-original", placeholder);
    env.dataset.stage = "0";

    env.addEventListener("click", (e) => {
      e.stopPropagation();

      // Close all other envelopes
      envelopes.forEach((otherEnv) => {
        if (otherEnv !== env) {
          otherEnv.classList.remove("open");
          const otherSlide = otherEnv.querySelector(".paper-slide");
          const otherPaper = otherEnv.querySelector(".paper");

          if (otherSlide) otherSlide.style.display = "none";
          if (otherPaper) {
            otherPaper.classList.remove("show");
            otherPaper.style.transform = "scale(1)";
            otherPaper.style.zIndex = "5";
          }

          otherEnv.setAttribute("data-placeholder", otherEnv.getAttribute("data-placeholder-original"));
          otherEnv.dataset.stage = "0";
        }
      });

      // Current stage
      let stage = parseInt(env.dataset.stage || "0");

      switch (stage) {
        case 0:
          // STEP 1: Flap reveal
          env.classList.add("open");
          env.setAttribute("data-placeholder", "");
          if (paperSlide) paperSlide.style.display = "block";
          env.dataset.stage = "1";
          break;

        case 1:
          // STEP 2: Show paper
          if (realPaper) {
            realPaper.classList.add("show");
            realPaper.style.transform = "scale(1)";
            realPaper.style.zIndex = "5";
            env.dataset.stage = "2";
          }
          break;

        case 2:
          // STEP 3: Zoom
          if (realPaper) {
            realPaper.style.transform = "scale(1.15)";
            realPaper.style.zIndex = "10";
            env.dataset.stage = "3";
          }
          break;

        case 3:
          // STEP 4: Unzoom
          if (realPaper) {
            realPaper.style.transform = "scale(1)";
            realPaper.style.zIndex = "5";
            env.dataset.stage = "2";
          }
          break;
      }
    });
  });

  // Mute / Unmute logic
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
document.querySelectorAll('.envelope').forEach(envelope => {
  const paper = envelope.querySelector('.paper');
  
  envelope.addEventListener('click', () => {
    // Stage 0 to 1
    if (!envelope.classList.contains('open')) {
      envelope.classList.add('open');
      paper.classList.add('show');
    }
    // Stage 1 to 2 (fullscreen)
    else if (!paper.classList.contains('fullscreen')) {
      paper.classList.add('fullscreen');
    }
    // Stage 2 to 0
    else {
      envelope.classList.remove('open');
      paper.classList.remove('show');
      paper.classList.remove('fullscreen');
    }
  });
});
