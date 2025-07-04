const USERNAME = "drdexe";

async function getData(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

function getRepos(data) {
  data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const repos = [];
  for (const repo of data) {
    if (!repo.has_pages) continue;
    repos.push({
      name: repo.name,
      html_url: repo.html_url,
      pages_url: `https://${USERNAME}.github.io/${repo.name}/`,
    });
  }
  return repos;
}

function getRandomColor() {
  // Get random color that has good contrast with white
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 41) + 60;  // 60-100%
  const l = Math.floor(Math.random() * 16) + 20;  // 20-35%
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function getRepoCard(repo) {
  const projectCard = document.createElement("li");
  projectCard.classList.add("project-card");
  projectCard.innerHTML = `
    <div class="project-screenshot" style="background-color: ${getRandomColor()}">
      <p>screenshot of project</p>
    </div>
    <div class="project-name">
      <h3>${repo.name}</h3>
      <a href="${repo.html_url}"><img src="assets/icons/github.svg" alt="View source on GitHub" width="25" height="25"></a>
      <a href="${repo.pages_url}" target="_blank" rel="noopener noreferrer"><img src="assets/icons/open-in-new.svg" alt="Open project in new tab" width="25" height="25"></a>
    </div>
    <p class="project-description">Short description of the project. Just a couple sentences will do.</p>
  `;
  return projectCard;
}

function createRepoList(repos) {
  const projectList = document.querySelector(".project-list");
  repos.forEach(repo => {
    projectList.appendChild(getRepoCard(repo));
  });
}

(async() => {
  const data = await getData(USERNAME);
  const repos = getRepos(data);
  createRepoList(repos);
})();
