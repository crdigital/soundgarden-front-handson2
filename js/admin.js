// Listar eventos
const eventos = D.querySelector('#eventos');

const options = {
    method: 'GET',
    redirect: 'follow'
};

const selecionarEventos = async () => {
    return await fetch(`${BASE_URL}/events`, options).then(response => {
        return response.json();
    }).then(result => result);
};

D.addEventListener('DOMContentLoaded', async () => {

    const resposta = await selecionarEventos();    

    const eventosApi = resposta.map((item, id) => {

        return `
        <tr>
        <th scope="row">${id + 1}</th>
        <td>${new Date(item.scheduled).toLocaleDateString(
            "pt-BR"
        )}</td>
        <td>${item.name}</td>
        <td>${item.attractions}</td>
        <td>
            <a href="reservas-evento.html?id=${item._id}&evento=${item.name}" class="btn btn-dark">ver reservas</a>
            <a href="editar-evento.html?id=${item._id}" class="btn btn-secondary">editar</a>
            <a href="excluir-evento.html?id=${item._id}" class="btn btn-danger">excluir</a>
        </td>
    </tr>
        `;
    });

    eventos.innerHTML = eventosApi;
});

// getReservasId()
const janelaModal = D.getElementById('modal');
const formModalReservas = D.getElementById('formModalReservas');
const eventoIdModal = D.getElementById('eventoIdModal');
const corpoReservas = D.getElementById('corpoReservas');
const btnModalFechar = D.getElementById('btnModalFechar');

const getReservasId = async (id) => {
    return await fetch(`${BASE_URL}/bookings/event/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json();
    }).then(result => result);
};

$('#modal').on('show.bs.modal', async () => {

    if (eventoIdModal.value !== '') {        
        corpoReservas.innerHTML = `
        <tr>
        <td colspan="3">
            <div class="d-flex justify-content-center">
                <div class="spinner-border"
                    style="color:#c2185b;width: 3rem; height: 3rem;" role=" status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                </div>
            </td>
        </tr>
        `;

        const respostaReservas = await getReservasId(eventoIdModal.value);

        const reservasEvento = respostaReservas.map((item, id) => {

            return `
                <tr>
                    <th scopr="row">${id + 1}</th>
                    <td>${item.owner_name}</td>
                    <td>
                    <a href="excluir-evento.html?id=${item._id}" class="btn btn-danger" id="btnModalExcluirReserva">excluir</a>
                    </td>
                </tr>
            `;
        });

        corpoReservas.innerHTML = reservasEvento;
    } else {
        
        corpoReservas.innerHTML = `<tr><td colspan="3" style="color:#c2185b;">Sem reservas para este evento.</td></tr>`;
    }

});

btnModalFechar.addEventListener('click', () => {
    corpoReservas.innerHTML = '';
});
