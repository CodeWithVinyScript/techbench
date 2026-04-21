// Register
function registerUser() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem(username, password);
  alert("Registration Successful!");
  window.location.href = "login.html";
}

// Login
function loginUser() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const storedPassword = localStorage.getItem(username);

  if (storedPassword === password) {
    alert("Login Successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid Credentials");
  }
}