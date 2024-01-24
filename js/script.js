import { users } from "./data.js";
const ul = document.querySelector(".contact-list");
const userNum = document.querySelector(".userNum");
const ulPages = document.querySelector(".pagination");

const length = users.length;
userNum.innerText = length;

renderUsers(users.slice(0, 10));
renderPages(users);

// getUsers("https://randomuser.me/api/?results=62");

// async function getUsers(API_URL) {
//   try {
//     const response = await fetch(API_URL);
//     const data = await response.json();

//     const users = data.results;
//     const length = users.length;

//     userNum.innerText = length;

//     renderUsers(users.slice(0, 10));
//     renderPages(users);
//   } catch (error) {
//     console.error(error);
//   }
// }

function renderUsers(usersSegment) {
  for (const child of [...ul.children]) {
    child.remove();
  }

  for (let i = 0; i < usersSegment.length; i++) {
    // const name = usersSegment[i].name.first + " " + usersSegment[i].name.last;
    const name = usersSegment[i].name;
    // const date = new Date(usersSegment[i].registered.date);

    // let year = date.getFullYear();
    // let month = date.getMonth() + 1;
    // let day = date.getDate();

    // if (day < 10) day = "0" + day;
    // if (month < 10) month = "0" + month;

    const li = createUser(
      name,
      // usersSegment[i].picture.thumbnail
      usersSegment[i].image,
      usersSegment[i].joined
      // "Joined " + month + "/" + day + "/" + year
      // usersSegment[i].email
    );

    ul.appendChild(li);
  }
}

function createUser(name, src, joined, email = "") {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const divJoined = document.createElement("div");
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const span = document.createElement("span");
  const spanJoined = document.createElement("span");

  li.className = "contact-item cf";

  div.className = "contact-details";
  divJoined.className = "joined-details";

  img.className = "avatar";
  img.src = src;

  h3.innerText = name;

  // span.className = "email";
  // span.innerText = email;

  spanJoined.className = "date";
  spanJoined.innerText = joined;

  div.appendChild(img);
  div.appendChild(h3);
  div.appendChild(span);

  divJoined.appendChild(spanJoined);

  li.appendChild(div);
  li.appendChild(divJoined);

  return li;
}

function renderPages(users, usersPerPage = 10) {
  const pageNum = Math.ceil(users.length / usersPerPage);

  for (let i = 0; i < pageNum; i++) {
    const liPage = document.createElement("li");
    const a = document.createElement("a");

    a.innerText = i + 1;

    a.addEventListener("click", () => {
      const maxIndex = usersPerPage * (i + 1);
      const minIndex = maxIndex - usersPerPage;
      const usersSlice = users.slice(minIndex, maxIndex);

      renderUsers(usersSlice);
    });

    liPage.appendChild(a);
    ulPages.appendChild(liPage);
  }
}
