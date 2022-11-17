let baseURI = "https://reqres.in/api/";
let form = document.querySelector("form");
//declaring event when clicking submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addUser();
});

creatTable();
//function to create table
function creatTable() {
  let getUsers = new XMLHttpRequest();
  getUsers.open("get", baseURI + "users");
  getUsers.send();
  getUsers.onload = () => {
    let table = document.querySelector(".users-table");
    let allUsers = JSON.parse(getUsers.responseText).data;
    allUsers.forEach((element) => {
      let row = table.insertRow();
      let firstNameCell = row.insertCell();
      firstNameCell.append(element.first_name);
      let lastNameCell = row.insertCell();
      lastNameCell.append(element.last_name);
      let emailCell = row.insertCell();
      emailCell.append(element.email);
      let img = document.createElement("img");
      img.src = element.avatar;
      let avatarCell = row.insertCell();
      avatarCell.append(img);
      let deleteButton = document.createElement("button");
      row.insertCell().append(deleteButton);
      deleteButton.append("Delete");
      deleteButton.addEventListener("click", (event) => {
        //delete user
        let deleteUser = new XMLHttpRequest();
        deleteUser.open("delete", baseURI + "users/" + element.id);
        deleteUser.send();
        //remove row
        deleteUser.onload = () => {
          event.target.parentElement.parentElement.remove();
        };
      });
    });
  };
}
//function to add user
function addUser() {
  let form = document.forms[0];
  let email = form.elements["email"].value;
  let first_name = form.elements["firstName"].value;
  let last_name = form.elements["lastName"].value;
  let avatar = form.elements["image"].value;

  let user = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    avatar: avatar,
  };
  console.dir(user);
  let postUser = new XMLHttpRequest();
  postUser.open("post", baseURI + "users");
  postUser.send(JSON.stringify(user));
  postUser.onload = () => {
    alert("User was created successfully");
    form.reset();
  };
}
