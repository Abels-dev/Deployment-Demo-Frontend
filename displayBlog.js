function getQueryParams() {
  const param = window.location.search.substring(1).split("&");
  const pair = param[0].split("=");
  return pair[1];
}

const id = getQueryParams();
const findPost = async (id) => {
  try {
    const response = await fetch(
      `https://deployment-demo-backend-sj4g.onrender.com/api/posts/${id}`
    );
    const post = await response.json();
    if (post) {
      document.getElementById("post-title").innerText = post.title;
      document.getElementById("post-content").innerText = post.content;
      document.getElementById("post-meta").innerText = `Author: ${
        post.author
      } | Date: ${new Date(post.createdAt).toLocaleDateString()}`;
    }
  } catch (e) {
    console.log(e.message);
  }
};

findPost(id);
