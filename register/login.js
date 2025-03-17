let email = document.getElementById("email");
let pass = document.getElementById("password");
let forBtn = document.getElementById("forBtn");
let err;

function req0() {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let mail = email.value;
  let errors = document.querySelectorAll(".error");
  if (mail === "") {
    errors[0].innerHTML = "يرجى إدخال البريد الإلكتروني";
    email.style.border = "2px solid red";
  } else {
    if (regex.test(mail)) {
      errors[0].innerHTML = "";
      email.style.border = "";
    } 
  }
}

function emailStorage() {
  let errors = document.querySelectorAll(".error");
  let btn = document.getElementById("btn");
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let userFound = users.find(
    (user) => user.email === email.value && user.password === pass.value
  );

  if (userFound) {
    errors[1].innerHTML = "";
    btn.disabled = false;
  } else {
    errors[1].innerHTML =
      "عذراً، يبدو أن البريد الإلكتروني أو كلمة المرور غير صحيحة.";
    btn.disabled = true;
  }
}

function req1() {
  let errors = document.querySelectorAll(".error");
  if (pass.value === "") {
    errors[1].innerHTML = "يرجى إدخال كلمة المرور";
    pass.style.border = "2px solid red";
  } else {
    errors[1].innerHTML = "";
    pass.style.border = "";
  }
}

email.addEventListener("input", req0);
email.addEventListener("input", emailStorage);
pass.addEventListener("input", emailStorage);
pass.addEventListener("input", req1);

email.addEventListener("blur", emailStorage);
pass.addEventListener("blur", emailStorage);

if (btn) {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    let savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    savedUsers.push({
      email: email.value,
      password: pass.value,
    });
    sessionStorage.setItem("users", JSON.stringify(savedUsers));
    window.location.href = "../index.html";
  });
}
