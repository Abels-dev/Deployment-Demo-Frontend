(async () => {
  try {
    const response = await fetch(
      "https://deployment-demo-backend-sj4g.onrender.com/api/posts"
    );
    const data = await response.json();
    console.log(data);
    const content = document.getElementById("content");
    content.innerHTML = "";
    data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "blog-post";
      postElement.innerHTML = `<h2 class="text-3xl font-bold text-blue-400"><a href="blogDetails.html?id=${
        post._id
      }">${post.title}</a> </h2>
            <p class="line-clamp-4">${post.content}</p>
            <div class="text-sm text-gray-400">
            <div class="">Author: ${post.author}</div>
            <div class="">Date: ${new Date(
              post.createdAt
            ).toLocaleDateString()}</div>
          </div>
            `;
      const tagContainer = document.createElement("div");
      tagContainer.className = "tagContainer";
      postElement.appendChild(tagContainer);
      post.tags.forEach((tag) => {
        const tagNode = document.createElement("span");
        tagContainer.appendChild(tagNode);
        tagNode.innerText = `${tag}`;
        tagNode.className = "tagNode";
      });
      const buttons = document.createElement("div");
      buttons.innerHTML = `<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 my-5 rounded" onclick=deleteBlog(\`${post._id}\`)>Delete Blog</button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded"><a href="editBlog.html?id=${post._id}">Edit Blog</a> </button>`;
      postElement.append(buttons);
      content.appendChild(postElement);
    });
  } catch (e) {
    console.log(e.message);
  }
})();

const deleteBlog = async (id) => {
  const answer = prompt("Are you sure you want to delete this blog? Y or N");
  if (answer === "Y" || answer === "y") {
    try {
      const response = await fetch(
        `https://deployment-demo-backend-sj4g.onrender.com/api/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 204) {
        alert("Blog post deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const res = await response.json();
        alert(res.error);
      }
    } catch (e) {
      alert(e.message);
    }
  }
};
