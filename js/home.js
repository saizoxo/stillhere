document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");
  const muteBtn = document.getElementById("mute-btn");
  const bgMusic = document.getElementById("bgMusic");

  envelopes.forEach((env) => {
    let stage = 0; // 0 = back only, 1 = front (flipped), 2 = paper shown, 3 = paper zoomed

    env.addEventListener("click", () => {
      if (stage === 0) {
        env.classList.add("flipped");
        env.textContent = "Open when you're sad 💔"; // Back text
        stage = 1;
        return;
      }

      if (stage === 1) {
        env.classList.add("opened");
        env.textContent = ""; // Clear front text

        const paper = document.createElement("div");
        paper.className = "paper";
        paper.innerHTML = `
          <p>This is a placeholder message 💌</p>
          <p>You’ll replace this with something beautiful, Bolt. Just like your thoughts.</p>
        `;
        env.parentNode.insertBefore(paper, env.nextSibling);
        setTimeout(() => paper.classList.add("show"), 100);
        stage = 2;

        paper.addEventListener("click", () => {
          if (stage === 2) {
            paper.classList.add("zoomed");
            stage = 3;
          } else if (stage === 3) {
            paper.classList.remove("zoomed");
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
