const formCadastro = document.querySelector("#form-cadastro");
const submitCadastro = document.querySelector("#submit-cadastro");

submitCadastro.addEventListener("click", (e) => {
  e.preventDefault();
  cadastrar(formCadastro.elements);
});

function cadastrar(elements) {
  let username = elements["username"].value;
  let age = elements["age"].value;
  let profission = elements["profission"].value;
  let contactPhone = elements["contact-phone"].value;
  let password = elements["password"].value;

  if (!(username && age && profission && contactPhone && password)) {
    return alert("preencha todos os campos para o cadastro.");
  }

  const newUser = new Object();
  newUser.username = username;
  newUser.age = age;
  newUser.profission = profission;
  newUser.contactPhone = contactPhone;
  newUser.password = password;

  if (!sessionStorage.getItem("cadastrados")) {
    const cadastrados = [];
    cadastrados.push(newUser);
    sessionStorage.setItem("cadastrados", JSON.stringify(cadastrados));
    alert("Usuário cadastrado.");
    return (window.location.href = "login.html");
  }

  let cadastrados = JSON.parse(sessionStorage.getItem("cadastrados"));

  cadastrados.push(newUser);

  sessionStorage.setItem("cadastrados", JSON.stringify(cadastrados));

  alert("Usuário cadastrado.");
  return (window.location.href = "login.html");
}
