let email = document.getElementById("email");
let pass = document.getElementById("password");
let passCon = document.getElementById("passwordCon");
let Fname = document.getElementById("Fname");
let Lname = document.getElementById("Lname");
let forBtn = document.getElementById("forBtn");
let btn = document.getElementById("btn");

btn.disabled = true;

function req0() {
  let errors = document.querySelectorAll(".error");

  if (Fname.value === "") {
    errors[0].innerHTML = "يرجى إدخال الاسم الأول";
    Fname.style.border = "2px solid red";
  } else {
    errors[0].innerHTML = "";
    Fname.style.border = "";
  }
}
function req01() {
  let errors = document.querySelectorAll(".error");
  if (Lname.value === "") {
    errors[1].innerHTML = "يرجى إدخال الاسم الأخير";
    Lname.style.border = "2px solid red";
  } else {
    errors[1].innerHTML = "";
    Lname.style.border = "";
  }
  formValidation();
}

function req1() {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let mail = email.value;
  let errors = document.querySelectorAll(".error");

  if (mail === "") {
    errors[2].innerHTML = "يرجى إدخال البريد الإلكتروني";
    email.style.border = "2px solid red";
  } else if (!regex.test(mail)) {
    errors[2].innerHTML = "البريد الإلكتروني غير صالح";
    email.style.border = "2px solid red";
  } else {
    errors[2].innerHTML = "";
    email.style.border = "";
  }
  formValidation();
}

function req2() {
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@.#$!%*?&])[a-zA-Z\d@.#$!%*?&]{8,15}$/;
  let validPass = pass.value;
  const errors = document.querySelectorAll(".error");
  if (validPass === "") {
    errors[3].innerHTML = "يرجى إدخال كلمة المرور";
    pass.style.border = "2px solid red";
  } else if (!regex.test(validPass)) {
    errors[3].innerHTML =
      "كلمة المرور ضعيفة. يجب أن تتكون من 8-15 حرفًا وتحتوي على حرف واحد على الأقل، ورقم، ورمز خاص.";
    pass.style.border = "2px solid red";
  } else {
    errors[3].innerHTML = "";
    pass.style.border = "";
  }
  formValidation();
}

function req3() {
  let errors = document.querySelectorAll(".error");

  if (passCon.value !== pass.value) {
    errors[4].innerHTML = "كلمات المرور غير متطابقة";
    passCon.style.border = "2px solid red";
  } else {
    errors[4].innerHTML = "";
    passCon.style.border = "";
  }
  formValidation();
}
function formValidation() {
  if (
    email.value !== "" &&
    pass.value !== "" &&
    pass.value === passCon.value &&
    pass.value.length >= 7 &&
    Fname.value !== "" &&
    Lname.value !== ""
  ) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

email.addEventListener("input", req1);
pass.addEventListener("input", req2);
passCon.addEventListener("input", req3);
Fname.addEventListener("input", req0);
Lname.addEventListener("input", req01);

btn.addEventListener("click", (event) => {
  event.preventDefault();

  let savedUsers = JSON.parse(localStorage.getItem("users")) || [];
  savedUsers.push({
    email: email.value,
    password: pass.value,
    name: Fname.value + " " + Lname.value,
  });
  localStorage.setItem("users", JSON.stringify(savedUsers));

  alert("تم التسجيل بنجاح!");
  setTimeout(() => {
    window.location.href = "LogIn.html";
  }, 1000);
});
