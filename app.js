// const xhr = new XMLHttpRequest();
// xhr.open("GET", "https://jsonplaceholder.typicode.com/posts?_limit=8", true);
// xhr.onreadystatechange = function () {
//   if (this.readyState === 4 && this.status === 200) {
//     const data = JSON.parse(this.responseText);
//     data.forEach((post) => {
//       addPostToDOM(post);
//     });
//   }
// };
// xhr.send();
const sectionEl = document.querySelector(".container");
const apiUrl = "https://jsonplaceholder.typicode.com/posts";
const generatePosts = (apiUrl) => {
  fetch(apiUrl + "?_limit=4")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((post) => {
        addPostToDOM(post);
      });
    });
};

const addPostToDOM = (post) => {
  const divEl = document.createElement("div");
  const h4El = document.createElement("h4");
  const pEl = document.createElement("p");
  const closeEl = document.createElement("div");

  h4El.appendChild(document.createTextNode(post.title));
  pEl.appendChild(document.createTextNode(post.body));
  divEl.className = "card";
  divEl.setAttribute("data-id", post.id);
  closeEl.className = "close";
  closeEl.addEventListener("click", deletePost);
  divEl.appendChild(closeEl);
  divEl.appendChild(h4El);
  divEl.appendChild(pEl);

  sectionEl.appendChild(divEl);
};
const createPost = (e) => {
  const title = document.querySelector(".post-title");
  const body = document.querySelector(".post-body");

  if (title.value === "" && body.value === "") {
    alert("please fill in fields");
  } else {
    const newPost = {
      title: title.value,
      body: body.value,
    };
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        addPostToDOM(data);
      });
  }
};
const deletePost = (e) => {
  const id = e.target.parentElement.dataset.id;
  fetch(`${apiUrl}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      e.target.parentElement.remove();
    });
};
document.querySelector(".btn-post").addEventListener("click", createPost);
generatePosts(apiUrl);
