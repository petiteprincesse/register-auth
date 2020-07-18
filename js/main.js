"use strict";

let validation = function (n) {
  if (
    n.replace(/([^а-яА-ЯёЁ\s]+$)/, "") !== "" &&
    n.trim().split(" ").length === 2
  ) {
    return true;
  } else {
    return false;
  }
};

let formatDate = function () {
  let date = new Date();
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleString("ru", options);
};

const usersArr = localStorage.usersArr ? JSON.parse(localStorage.usersArr) : [];

let list = document.getElementById("list");

let render = function () {
  list.textContent = "";
  usersArr.forEach(function (item, i) {
    if (usersArr[i] === null) {
      usersArr.splice(i, 1);
    }
    let li = document.createElement("li");
    li.innerHTML =
      "<div>" +
      "<p>Имя: " +
      usersArr[i].firstName +
      ", фамилия: " +
      usersArr[i].lastName +
      ", зарегистрирован(a): " +
      usersArr[i].regDate +
      "</p>" +
      '<button id="deleteUser">Удалить</button>' +
      "</div>";
    list.append(li);
    let removeBtn = li.querySelector("#deleteUser");
    removeBtn.addEventListener("click", function () {
      usersArr.splice(i, 1);
      render();
    });
  });
  localStorage.usersArr = JSON.stringify(usersArr);
};

let register = function () {
  let user = {};
  let userNameSurname;
  do {
    userNameSurname = prompt("Введите через пробел Имя и Фамилию пользователя");
  } while (!validation(userNameSurname));
  userNameSurname = userNameSurname.split(" ");
  user.firstName = userNameSurname[0];
  user.lastName = userNameSurname[1];
  user.login = prompt("Придумайте логин");
  user.password = prompt("Придумайте пароль");
  user.regDate = formatDate();
  usersArr.push(user);
  localStorage.usersArr = JSON.stringify(usersArr);
  render();
};

let logIn = function () {
  let inputLogin = prompt("Введите логин");
  let inputPassword = prompt("Введите пароль");
  let count = usersArr.length;
  usersArr.forEach(function (item, i) {
    if (item.login === inputLogin && item.password === inputPassword) {
      document.getElementById("username").textContent = item.firstName;
      return;
    }
    if (i===count-1) {
      document.getElementById("username").textContent = 'Аноним';
      alert('Пользователь не найден');
      return;
    }
  });
};

let reg = document.getElementById("registerUser");
reg.addEventListener("click", register);

let auth = document.getElementById("login");
login.addEventListener("click", logIn);

render();
