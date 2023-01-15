// listando reservas pelo id do evento
const reservasIdEvento = D.querySelector('#reservasIdEvento');
const tituloReservas = D.getElementById('tituloReservas');
const nomeEvento = D.getElementById('nomeEvento');

const params = new URLSearchParams(window.location.search);
const idEvento = params.get("id");
const evento = params.get("evento");
nomeEvento.innerText = evento;

const getReservasIdEvento = async (id) => {
  return await fetch(`${BASE_URL}/bookings/event/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    return response.json();
  }).then(result => result);
};

D.addEventListener('DOMContentLoaded', async () => {  

  const resposta = await getReservasIdEvento(idEvento);

  const reservasApi = resposta.map((item,id) => {

    return `

    <tr>
      <th scope="row">${id+1}</th>
      <td>${item.owner_name}</td>
      <td>${item.owner_email}</td>
      <td><span style="color:#c2185b;">${item.event.name}</span> - <span style="color:blue;">${new Date(item.event.scheduled).toLocaleDateString(
        "pt-BR"
      )}</span></td>
   </tr>
  `;
  });

  reservasIdEvento.innerHTML = reservasApi;
});
