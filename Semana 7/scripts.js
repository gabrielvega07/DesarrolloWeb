
var usuarios_div = document.getElementById("users");
usuarios_div.innerHTML = "hola mundo";

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((res) => res.map((user) => user.username))
.then((userNames) => {
    const usuarios_div = document.getElementById("users");
    const bulletPoints = userNames.map((userName) => `<li>${userName}</li>`);
    console.log(bulletPoints);
    usuarios_div.innerHTML = `<ul>${bulletPoints.join("")}</ul>`;
})
  .catch((err) => console.log(err));
