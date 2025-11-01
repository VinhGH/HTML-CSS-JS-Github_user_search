// Lấy phần tử button
const themeSwitch = document.getElementById("theme-switch");

// Sự kiện click
themeSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    document.querySelector(".icon-light").style.display = "none";
    document.querySelector(".icon-dark").style.display = "block";
  } else {
    localStorage.setItem("theme", "light");
    document.querySelector(".icon-light").style.display = "block";
    document.querySelector(".icon-dark").style.display = "none";
  }
});

// Kiểm tra khi load lại trang
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  document.querySelector(".icon-light").style.display = "none";
  document.querySelector(".icon-dark").style.display = "block";
} else {
  document.body.classList.remove("dark");
  document.querySelector(".icon-light").style.display = "block";
  document.querySelector(".icon-dark").style.display = "none";
}
