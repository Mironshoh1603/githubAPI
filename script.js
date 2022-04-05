let inputUsername = document.querySelector("#ghusername");
let addDiv = document.querySelector("#ghapidata");
const pulBtn = document.querySelector(".pull__btn");
let getInfo = async function (username) {
  const data = await fetch(`https://api.github.com/users/${username}`);
  const data2 = await data.json();
  return data2;
};

pulBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let input = inputUsername.value;
  getInfo(input).then((val) => {
    console.log(val);
    let html;
    html = `<h2>
      ${input}
      <span class="smallname"
        >(@<a href="https://github.com/${input}" target="_blank">${input}</a
        >)</span
      >
    </h2>
    <div class="ghcontent">
      <div class="avi">
        <a href="https://github.com/${input}" target="_blank"
          ><img
            src="${val.avatar_url}"
            width="100%"
            alt="${input}"
        /></a>
      </div>
      <div class="infoUser">
        <h2>Followers: ${val.followers}</h2>
        <h2>Following: ${val.following}</h2>
        <h2>Repos: ${val.public_repos}</h2>
      </div>
    </div>`;
    addDiv.innerHTML = "";
    addDiv.insertAdjacentHTML("beforeend", html);
    let arr = fetch(val.repos_url)
      .then((val) => val.json())
      .then((res) => {
        return res;
      });

    let html2;
    arr.then((val2) => {
      console.log(val2);
      val2.map(function (value) {
        html2 = `<div class="repolist">
        <ul>
          <li>
            <a
              class="repo-name"
              href="${value.url}"
              target="_blank"
              >${value.name}</a
            >
            <div class="repo__info">
              <a href="" class="fork">fork ${value.forks}</a>
              <a href="" class="watcher">watcher ${value.watchers}</a>
              <a href="" class="star">star ${value.stargazers_count}</a>
            </div>
          </li>
        </ul>
      </div>`;
        addDiv.insertAdjacentHTML("beforeend", html2);
      });
      // for(let i=0;i<val.public_repos;i++){

      // }
    });
  });
});
