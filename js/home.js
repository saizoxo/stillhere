document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");
  const muteBtn = document.getElementById("mute-btn");
  const bgMusic = document.getElementById("bgMusic");

  envelopes.forEach((env) => {
    let stage = 0;
    const placeholder = env.getAttribute("data-placeholder") || "open me";

    // STEP 0 - Initial state
    env.textContent = "";
    env.setAttribute("data-placeholder", placeholder);

    // STEP HANDLER
    env.addEventListener("click", () => {
      const entry = env.closest(".letter-entry");

      // STEP 0 → Flip envelope + show flap and tab-paper
      if (stage === 0) {
        env.classList.add("open"); // flap appears via CSS
        env.setAttribute("data-placeholder", "");
        const fakePaper = env.querySelector(".fake-paper");
        if (fakePaper) fakePaper.style.display = "block";
        stage = 1;
        return;
      }

      // STEP 1 → Insert real paper with message
      if (stage === 1) {
        const realPaper = entry.querySelector(".paper");
        if (realPaper) return; // avoid duplication

        const paper = document.createElement("div");
        paper.className = "paper show";
        paper.innerHTML = `
          <div class="fullscreen-hint">click to full screen</div>
          <p>This is a beautiful note from Vera 💌</p>
          <p>Don't forget how loved you are, Bolt. Always.</p>
        `;
        entry.appendChild(paper);
        stage = 2;

        // STEP 2 → Zooming logic
        paper.addEventListener("click", () => {
          if (stage === 2) {
            paper.style.transform = "scale(1.15)";
            paper.style.zIndex = "10";
            stage = 3;
          } else if (stage === 3) {
            paper.style.transform = "scale(1)";
            paper.style.zIndex = "5";
            stage = 2;
          }
        });

        return;
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
