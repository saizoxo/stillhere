document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");

  envelopes.forEach((env) => {
    env.addEventListener("click", () => {
      if (env.classList.contains("opened")) return;
      env.classList.add("opened");

      const paper = document.createElement("div");
      paper.className = "paper";
      paper.innerHTML = "<p>This is a placeholder message 💌</p>";
      env.appendChild(paper);

      setTimeout(() => {
        paper.classList.add("show");
      }, 100); // tiny delay for smooth transition
    });
  });
});
