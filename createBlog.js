document
  .getElementById("blog-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
      if (key === "tags") {
        data[key] = value.split(", ");
      } else {
        data[key] = value;
      }
    }
    try {
      const response = await fetch(
        "https://deployment-demo-backend-sj4g.onrender.com/api/posts",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.status === 201) {
        alert("Blog Post Created Successfully!");
        setTimeout(() => {
          window.location.href = "home.html";
        }, 2000);
      } else {
        const res = await response.json();
        alert(res.error);
      }
    } catch (e) {
      alert(e.message);
    }
  });
