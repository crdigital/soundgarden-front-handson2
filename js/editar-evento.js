const formEditarEvento = D.getElementById("formEditarEvento");
const inputNome = D.getElementById("nome");
const inputBanner = D.getElementById("banner");
const inputAtracoes = D.getElementById("atracoes");
const inputDescricao = D.getElementById("descricao");
const inputData = D.getElementById("data");
const inputLotacao = D.getElementById("lotacao");
const btnEnviar = D.getElementById("btnEnviar");

const carregando = (loading = true) => {
  inputNome.disabled = loading;
  inputBanner.disabled = loading;
  inputAtracoes.disabled = loading;
  inputDescricao.disabled = loading;
  inputData.disabled = loading;
  inputLotacao.disabled = loading;
  btnEnviar.disabled = loading;
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

formEditarEvento.addEventListener("submit", (form) => {
  form.preventDefault();

  carregando();

  const body = {
    name: inputNome.value,
    poster: inputBanner.value,
    attractions: inputAtracoes.value.split(", "),
    description: inputDescricao.value,
    scheduled: inputData.value,
    number_tickets: inputLotacao.value,
  };

  fetch(`${BASE_URL}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
      alert("Evento atualizado com sucesso!");
      window.location = "admin.html";
    } else {
      alert("Falha ao atualizar evento!");
    }
  });

  carregando(false);
});

const obterEvento = async () => {
  carregando();

  const evento = await fetch(`${BASE_URL}/events/${id}`).then((result) =>
    result.json()
  );

  carregando(false);

  console.log(evento.scheduled);

  inputNome.value = evento.name;
  inputBanner.value = evento.poster;
  inputAtracoes.value = evento.attractions.join(", ");
  inputDescricao.value = evento.description;
  inputData.value = evento.scheduled.split(".")[0];
  inputLotacao.value = evento.number_tickets;
};

obterEvento();
