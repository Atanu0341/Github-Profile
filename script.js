// script.js
const main = document.getElementById("main");
const APIURL = "https://api.github.com/users/";

const getUser = async (username) => {
  try {
    const response = await fetch(APIURL + username);
    if (response.ok) {
      const data = await response.json();
      displayUserData(data);
      getRepos(username);
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

const displayUserData = (data) => {
  const card = `
        <div class="card">
            <div class="avatar">
                <img src="${data.avatar_url}" alt="Avatar">
            </div>
            <div class="user_info">
                <h2>${data.name}</h2>
                <p><i class="fa-solid fa-location-dot"></i> ${data.location}</p>
                <p><i class="fa-solid fa-building"></i> <strong>Company</strong>: ${data.company}</p>
                <p>${data.bio}</p>
                <ul class="info">
                    <li>${data.followers} <strong>Followers</strong> </li>
                    <li>${data.following} <strong>Following</strong> </li>
                    <li>${data.public_repos} <strong>Repos</strong> </li>
                </ul>
            </div>
        </div>
    `;
  main.innerHTML = card;
};

const getRepos = async (username) => {
  try {
    const response = await fetch(APIURL + username + "/repos");
    if (response.ok) {
      const repoData = await response.json();
      const repos = document.createElement("div");
      repos.setAttribute("id", "repos");
      main.appendChild(repos);

      for (let i = 0; i < repoData.length; i++) {
        let a = document.createElement("a");
        a.setAttribute("href", `${repoData[i].svn_url}`);
        a.setAttribute("target", "_blank");
        a.innerText = `${repoData[i].name}`;
        repos.appendChild(a);
      }
    } else {
      throw new Error("User's repositories not found");
    }
  } catch (error) {
    console.error("Error fetching user's repositories:", error.message);
  }
};

const form = document.getElementById("search");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form.querySelector("input[type=search]");
  getUser(input.value);
  input.value = ""; // Clear the input field after submitting
});
