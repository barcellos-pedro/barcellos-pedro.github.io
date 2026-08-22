const terminal = document.querySelector("#terminal-body");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (terminal && !reduceMotion) {
  const lines = [...terminal.querySelectorAll(".terminal-line")];
  terminal.classList.add("terminal-ready");

  lines.forEach((line, index) => {
    window.setTimeout(() => line.classList.add("is-visible"), 260 + index * (index < 2 ? 260 : 160));
  });
}
