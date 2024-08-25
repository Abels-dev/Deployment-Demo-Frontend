let signup = document.querySelector(".signup-btn");
let login = document.querySelector(".login-btn");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login_form");
  const signupForm = document.getElementById("signup_form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = loginForm.querySelector(".name").value;
    const password = loginForm.querySelector(".password").value;

    try {
      const response = await fetch(
        "https://deployment-demo-backend-sj4g.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        window.location.href = "home.html";
        console.log("Token:", data.token);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  });

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = signupForm.querySelector(".name").value;
    const email = signupForm.querySelector(".email").value;
    const password = signupForm.querySelector(".password").value;

    try {
      const response = await fetch(
        "https://deployment-demo-backend-sj4g.onrender.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  });
});
