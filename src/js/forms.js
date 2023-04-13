const newJobForm = document.querySelector("#newJobForm");
const newJobSubmit = document.querySelector("#registerJob");

newJobSubmit.addEventListener("click", (e) => {
  e.preventDefault(); //Evitando comportamento padrão do formulário de atualizar a página
  newJob(newJobForm.elements);
});

function newJob(elementos) {
  let newJobCity = elementos["newJobCity"].value;
  let newJobType = elementos["newJobType"].value;
  let newJobPrice = elementos["newJobPrice"].value;
  let newJobDesc = elementos["newJobDesc"].value;
  let contactPhone = elementos["contactPhone"].value;

  if (newJobPrice <= 0) {
    return alert("O valor do seu serviço deve ser maior que 0. 😅");
  } else if (!newJobDesc) {
    return alert("Seu serviço precisa de uma descrição.");
  } else if (!contactPhone) {
    return alert("Insira um telefone para contato.");
  }

  const job = new Object();
  job.city = newJobCity;
  job.type = newJobType;
  job.price = newJobPrice;
  job.desc = newJobDesc;
  job.contactPhone = contactPhone;

  const jobsCount = localStorage.length;

  localStorage.setItem(jobsCount, JSON.stringify(job));

  newJobCity.value = "";
  newJobType.value = "";
  newJobPrice.value = "";
  newJobDesc.value = "";
  contactPhone.value = "";

  alert("Serviço cadastrado! 😊");
  location.reload();
}

window.addEventListener("load", createJobsCards());

function createJobsCards() {
  const displayCards = document.querySelector("#result");
  if (localStorage.length > 0) {
    Object.keys(localStorage).forEach((key) => {
      const job = JSON.parse(localStorage.getItem(key));
      displayCards.innerHTML = displayCards.innerHTML += `
            <div class="result-card" id="${job.contactPhone}">
                <div class="row">
                    <h4>${job.type}</h4>
                    <h4>${job.city}</h4>
                </div>
                <p>
                    ${job.desc}
                </p>
                <div class="row">
                    <h4>11/12/2022</h4>
                    <h4>R$${parseFloat(job.price)}/h</h4>
                </div>
            </div>
        `;
    });
    const resultCard = document.querySelectorAll(".result-card");
    resultCard.forEach((item) => {
      item.addEventListener("click", () => {
        alert(
          "O telefone de contato do anunciante deste serviço é: " + item.id
        );
      });
    });
  } else {
    const displayCards = document.querySelector("#result");
    displayCards.innerHTML = displayCards.innerHTML +=
      "<h3 style = 'margin-top:16px; color:gray'>Ainda não existem serviços cadastrados!</h3>";
  }
}

// Tratando o formulário de pesquisa

const searchForm = document.querySelector("#searchForm");
const searchSubmit = document.querySelector("#submit-btn");

searchSubmit.addEventListener("click", (e) => {
  e.preventDefault(); //Evitando comportamento padrão do formulário de atualizar a página
  filterJobs(searchForm.elements);
});

function filterJobs(elementos) {
  let jobCity = elementos["jobCity"].value;
  let jobType = elementos["jobType"].value;
  let jobMaxPrice = elementos["jobMaxPrice"].value;
  const displayCards = document.querySelector("#result");
  displayCards.innerHTML = "<h1 class='box-title'>Resultados</h1>";

  Object.keys(localStorage).forEach((key) => {
    const job = JSON.parse(localStorage.getItem(key));
    if (
      job.city === jobCity &&
      job.type === jobType &&
      parseFloat(job.price) <= parseFloat(jobMaxPrice)
    ) {
      console.log(job);
      displayCards.innerHTML = displayCards.innerHTML += `
            <div class="result-card" id="${job.contactPhone}">
                <div class="row">
                    <h4>${job.type}</h4>
                    <h4>${job.city}</h4>
                </div>
                <p>
                    ${job.desc}
                </p>
                <div class="row">
                    <h4>11/12/2022</h4>
                    <h4>R$${parseFloat(job.price)}/h</h4>
                </div>
            </div>
        `;
      const resultCard = document.querySelectorAll(".result-card");
      resultCard.forEach((item) => {
        item.addEventListener("click", () => {
          alert(
            "O telefone de contato do anunciante deste serviço é: " + item.id
          );
        });
      });
    } else {
      displayCards.innerHTML = displayCards.innerHTML +=
        "<h3 style = 'margin-top:16px; color:gray'>Nenhum resultado para esses filtros.</h3>";
    }
  });
}

const limparFiltros = document.querySelector("#limpar-filtros");

limparFiltros.addEventListener("click", () => location.reload());
