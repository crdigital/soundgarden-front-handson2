
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

    const eventosApi = resposta.map(item => {

        return `
        <article class="evento card p-5 m-3">
        <h2>${item.name}</h2>
        <h4>${item.attractions}</h4>
        <p>${item.description}</p>
        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#modal"
        data-whatever="${item.name},${item._id}">reservar ingresso</a>
        </article>
        `
        ;
    });
    
    eventos.innerHTML = eventosApi;
});