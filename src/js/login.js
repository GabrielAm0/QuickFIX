const form = document.querySelector("#form");
const submit = document.querySelector("#submit");
submit.addEventListener("click", (e) => {
  e.preventDefault(); //Evitando comportamento padrão do formulário de atualizar a página
  handleLogin(form.elements);
});

function handleLogin(elementos) {
  let username = elementos["username"].value;
  let password = elementos["password"].value;
  let match = false;
  let type = undefined;

  if (!(username && password)) {
    return alert("preencha os campos para o login!");
  }

  const cadastrados = JSON.parse(sessionStorage.getItem("cadastrados"));

  cadastrados?.forEach((user) => {
    if (username === user.username && password === user.password) {
      match = true;
      type = user.type;

      const userInfo = new Object();
      userInfo.username = user.username;
      userInfo.age = user.age;
      userInfo.profission = user.profission;
      userInfo.contactPhone = user.contactPhone;

      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  });

  if (match) {
    sessionStorage.setItem("logged", true);
    window.location.href = "home.html";
  } else {
    alert("O usuário com as informações dadas não existe");
    elementos["username"].value = null;
    elementos["password"].value = null;
  }
}
