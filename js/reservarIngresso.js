// referente ao form de reserva(Janela modal)
const formReservas = D.getElementById('formReservas');
const inputNome = D.getElementById('nome');
const inputEmail = D.getElementById('email');
const btnReservar = D.getElementById('btnReservar');
const btnFechar = D.getElementById('btnFechar');
const janelaModal = D.getElementById('modal');
const btnDismiss = D.getElementById('btnDismiss');
const eventoIdModal = D.getElementById('eventoIdModal');

const statusReservando = (reservando = true) => {
  inputNome.disabled = reservando;
  inputEmail.disabled = reservando;
  btnReservar.disabled = reservando;
  btnFechar.disabled = reservando;
  btnReservar.innerText = reservando ? 'Reservando' : 'Reservar';
};

// evento para reservar ingresso
formReservas.addEventListener('submit', (form) => {
  form.preventDefault();

  statusReservando();

  const body = {
    owner_name: inputNome.value,
    owner_email: inputEmail.value,
    number_tickets: 1,
    event_id: eventoIdModal.value
  };

  fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    redirec: 'follow',
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
      alert("Reserva efetuada com sucesso!");
      $(janelaModal).modal('hide'); // fecha a janela modal com jQuery
    } else {
      alert("Falha ao efetuar reserva.");
    }
  });

  statusReservando(false);

});

btnFechar.addEventListener('click', () => {
  inputNome.value = '';
  inputEmail.value = '';
});

btnDismiss.addEventListener('click', () => {
  inputNome.value = '';
  inputEmail.value = '';
});