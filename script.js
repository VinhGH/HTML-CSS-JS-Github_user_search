// ====== THEME TOGGLE ======
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") body.classList.add("dark");

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const theme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

// ====== GITHUB SEARCH ======
const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const userCard = document.querySelector(".user-card");
const loaderGrid = document.querySelector(".loader-grid");
const emptyState = document.querySelector("#empty-state");

// ====== RENDER USER ======
const renderUser = (data) => {
  userCard.classList.add("active");
  userCard.innerHTML = `
    <div class="user-logo">
      <img class="logo-img" src="${data.avatar_url}" alt="${data.login}" />
    </div>
    <div class="user-inf">
      <h1>${data.name || data.login}</h1>
      <p>@${data.login}</p>
    </div>
    <div class="group-infor">
      <div class="group-item"><div class="item-number">${data.public_repos}</div><div>Repositories</div></div>
      <div class="group-item"><div class="item-number">${data.followers}</div><div>Followers</div></div>
      <div class="group-item"><div class="item-number">${data.following}</div><div>Following</div></div>
    </div>
    <a href="https://github.com/${data.login}" target="_blank">View Profile</a>
  `;
};

// ====== RENDER REPOS ======
const renderRepos = (repos) => {
  let repoList = document.querySelector(".repo-list");
  if (repoList) repoList.remove();

  repoList = document.createElement("div");
  repoList.className = "repo-list";
  repoList.innerHTML = `
    <h3 class="repo-title">Public Repositories</h3>
    ${repos
      .map(
        (repo) => `
      <a href="${repo.html_url}" target="_blank" class="repo-card">
        <h4>${repo.name}</h4>
        <div class="repo-meta">
          ${
            repo.language
              ? `<span class="lang" data-lang="${repo.language}"><> ${repo.language}</span>`
              : `<span class="lang" data-lang="Unknown"><> Unknown</span>`
          }
          <span>⭐ ${repo.stargazers_count}</span>
        </div>
      </a>`
      )
      .join("")}
  `;
  loaderGrid.appendChild(repoList);
};


// ====== FETCH DATA ======
async function getData() {
  const username = searchInput.value.trim();
  if (!username) return;

  // Reset
  emptyState.style.display = "none";
  userCard.classList.remove("active");
  const oldRepo = document.querySelector(".repo-list");
  if (oldRepo) oldRepo.remove();

  loaderGrid.style.display = "flex";

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error("User not found");
    const userData = await userRes.json();

    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated`
    );
    const reposData = await repoRes.json();

    renderUser(userData);
    renderRepos(reposData);
  } catch (error) {
    loaderGrid.style.display = "none";
    emptyState.style.display = "flex";
    emptyState.querySelector("p").innerText = error.message;
  }
}

// ====== EVENT ======
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
});
