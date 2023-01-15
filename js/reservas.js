const reservasGeral = D.querySelector('#reservasGeral');

function removeEmptyProperties(obj) {

  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

}

// listando todas as reservas
const getReservas = async () => {

  const reservas = await fetch(`${BASE_URL}/bookings`, {
    method: "GET",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((result) =>
    result.json()
  );

  reservas.forEach((reserva, id) => {   

    const tr = document.createElement("tr");
    tr.innerHTML = `
          <tr>
          <th scope="row">${id + 1}</th>
          <td>${reserva.owner_name}</td>
          <td>${reserva.owner_email}</td>
          <td><span style="color:#c2185b;">${reserva.event.name}</span> - <span style="color:blue;">${new Date(reserva.event.scheduled).toLocaleDateString(
      "pt-BR"
    )}</span></td>
        </tr>`;
    reservasGeral.appendChild(tr);
  });
};

getReservas();