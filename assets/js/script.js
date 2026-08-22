const terminal = document.querySelector("#terminal-body");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (terminal && !reduceMotion) {
  const lines = [...terminal.querySelectorAll(".terminal-line")];
  terminal.classList.add("terminal-ready");

  lines.forEach((line, index) => {
    window.setTimeout(() => line.classList.add("is-visible"), 260 + index * (index < 2 ? 260 : 160));
  });
}

const filter = document.querySelector("[data-project-filter]");

if (filter) {
  const search = filter.querySelector(".project-search");
  const buttons = [...filter.querySelectorAll("[data-topic]")];
  const cards = [...document.querySelectorAll(".archive-grid .project-card")];
  const groups = [...document.querySelectorAll("[data-project-group]")];
  const count = filter.querySelector(".filter-count");
  const empty = document.querySelector("[data-no-results]");
  let selectedTopic = "all";

  function updateProjects() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const matchesSearch = !query || card.dataset.projectName.includes(query) || card.dataset.projectDescription.toLowerCase().includes(query) || card.dataset.projectTopics.includes(query);
      const topics = card.dataset.projectTopics.split(",");
      const matchesTopic = selectedTopic === "all" || topics.includes(selectedTopic);
      const isVisible = matchesSearch && matchesTopic;

      card.classList.toggle("is-hidden", !isVisible);
      card.querySelectorAll(".project-tags span").forEach((tag) => {
        tag.classList.toggle("tag-match", isVisible && selectedTopic !== "all" && tag.textContent.trim().toLowerCase() === selectedTopic);
      });
      if (isVisible) visible += 1;
    });

    groups.forEach((group) => {
      const hasVisibleProjects = group.querySelectorAll(".project-card:not(.is-hidden)").length > 0;
      group.classList.toggle("is-hidden", !hasVisibleProjects);
    });

    count.textContent = `Showing ${visible} project${visible === 1 ? "" : "s"}`;
    empty.classList.toggle("is-hidden", visible !== 0);
  }

  search.addEventListener("input", updateProjects);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedTopic = button.dataset.topic;
      buttons.forEach((item) => {
        const isSelected = item === button;
        item.classList.toggle("is-selected", isSelected);
        item.setAttribute("aria-pressed", String(isSelected));
      });
      updateProjects();
    });
  });
}
