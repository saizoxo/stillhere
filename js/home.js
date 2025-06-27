document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");
  const muteBtn = document.getElementById("mute-btn");
  const bgMusic = document.getElementById("bgMusic");

  envelopes.forEach((env) => {
    let stage = 0; // 0 = back of envelope with triangle flap, 1 = flipped front, 2 = opened with paper, 3 = zoomed paper
    const placeholder = env.getAttribute("data-placeholder") || "Open when you're sad";

    // Start with just the back showing
    env.textContent = "";
    env.setAttribute("data-placeholder", placeholder);

    env.addEventListener("click", () => {
      // Stage 0 → Flip envelope
      if (stage === 0) {
        env.classList.add("flipped");
        env.textContent = "Letter from Vera 💌";
        env.setAttribute("data-placeholder", "");
        stage = 1;
        return;
      }

      // Stage 1 → Open envelope and show paper
      if (stage === 1) {
        env.classList.add("opened");
        env.textContent = "";

        const paper = document.createElement("div");
        paper.className = "paper";
        paper.innerHTML = `
          <p>This is a placeholder message 💌</p>
          <p>You’ll replace this with something beautiful, Bolt. Just like your thoughts.</p>
        `;
        env.parentNode.insertBefore(paper, env.nextSibling);
        setTimeout(() => paper.classList.add("show"), 100);
        stage = 2;

        // Stage 2 → Zoom in on paper
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

  // 🎵 Mute / Unmute Toggle
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
