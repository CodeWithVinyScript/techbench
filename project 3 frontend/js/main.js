// ================= NAVIGATION =================
function goToPage(page) {
  window.location.href = page;
}

function goToCustomize() {
  window.location.href = "customize.html";
}

// ================= SMOOTH SCROLL =================
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// ================= SCROLL ANIMATION =================
window.addEventListener("scroll", () => {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});

// ================= NAVBAR SCROLL EFFECT =================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.style.background = "#020617";
    navbar.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5)";
  } else {
    navbar.style.background = "transparent";
    navbar.style.boxShadow = "none";
  }
});


// ================= ACTIVE NAV LINK =================
const links = document.querySelectorAll("nav a");

links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});


// ================= BUTTON RIPPLE EFFECT =================
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", function(e) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    let x = e.clientX - this.offsetLeft;
    let y = e.clientY - this.offsetTop;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// ================= SIMPLE LOADER =================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.display = "none";
  }
});

// ================= FORM VALIDATION (GENERIC) =================
function validateEmail(email) {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return pattern.test(email);
}

// ================= ALERT MESSAGE =================
function showAlert(message, type = "success") {
  const alertBox = document.createElement("div");

  alertBox.innerText = message;
  alertBox.style.position = "fixed";
  alertBox.style.top = "20px";
  alertBox.style.right = "20px";
  alertBox.style.padding = "10px 20px";
  alertBox.style.borderRadius = "5px";
  alertBox.style.color = "white";
  alertBox.style.zIndex = "1000";

  if (type === "success") {
    alertBox.style.background = "green";
  } else {
    alertBox.style.background = "red";
  }

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}
