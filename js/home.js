document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");
  const muteBtn = document.getElementById("mute-btn");
  const bgMusic = document.getElementById("bgMusic");

  // 💌 Envelope Open Interaction
  envelopes.forEach((env) => {
    env.addEventListener("click", () => {
      if (env.classList.contains("opened")) return;

      env.classList.add("opened");

      const paper = document.createElement("div");
      paper.className = "paper";
      paper.innerHTML = `
        <p>This is a placeholder message 💌</p>
        <p>You’ll replace this with something beautiful, Bolt. Just like your thoughts.</p>
      `;

      // Insert after envelope
      env.parentNode.insertBefore(paper, env.nextSibling);

      // Auto-scroll to the opened letter (mobile-friendly)
      paper.scrollIntoView({ behavior: "smooth", block: "center" });
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
