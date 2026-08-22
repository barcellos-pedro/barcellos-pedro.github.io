export function matchesProject(project, query, selectedTopic) {
  const matchesSearch = !query || project.name.includes(query) || project.description.includes(query) || project.topics.includes(query);
  const topics = project.topics.split(",");
  const matchesTopic = selectedTopic === "all" || topics.includes(selectedTopic);

  return matchesSearch && matchesTopic;
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
      const project = {
        name: card.dataset.projectName,
        description: card.dataset.projectDescription.toLowerCase(),
        topics: card.dataset.projectTopics,
      };
      const isVisible = matchesProject(project, query, selectedTopic);

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
