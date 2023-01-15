const formExcluirEvento = D.querySelector('#formExcluirEvento');
const eventoId = D.querySelector('#eventoId');
const nome = D.querySelector('#nome');
const banner = D.querySelector('#banner');
const atracoes = D.querySelector('#atracoes');
const descricao = D.querySelector('#descricao');
const data = D.querySelector('#data');
const lotacao = D.querySelector('#lotacao');

const options = {
    method: 'GET',
    redirect: 'follow'
};

const selecionarEventoId = async (id) => {
    return await fetch(`${BASE_URL}/events/${id}`, options).then(response => {
        return response.json(); 
    }).then(result => result);
};

// Carregando os dados do evento via id passado na url
D.addEventListener('DOMContentLoaded', async () =>{
    
    // pegando o id passado via url
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const idEvento = params.get('id');

    const resposta = await selecionarEventoId(idEvento);

    if(resposta?.message){
        alert('erro ao buscar o evento');
    }else{
        eventoId.value = resposta?._id;
        nome.value = resposta?.name;
        banner.value = resposta?.poster;
        atracoes.value = resposta?.attractions;
        descricao.value = resposta?.description;
        data.value = resposta?.scheduled;
        lotacao.value = resposta?.number_tickets;
    }

});

let requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

const removeEvento = async (id) => {
    return await fetch(`${BASE_URL}/events/${id}`, requestOptions).then(response => response);
}; 

formExcluirEvento.addEventListener('submit', async (form) => {
    form.preventDefault();

    // pegando o valor do nome do evento
    nomeEvento = nome.value;

    const delConfirm = confirm(`Deseja realmente ecluir "${nomeEvento}" da lista de eventos?`);

    if(delConfirm){
        removeEvento(eventoId.value);
        alert(`Evento "${nomeEvento}" excluído com sucesso! :)`);
        window.location = 'admin.html';
    }else if(!delConfirm){
        alert(`Exclusão de "${nomeEvento}" cancelada! :)`);
        window.location = 'admin.html';
    }else{
        alert(`Erro na remoção do evento "${nomeEvento}".`);
    }
});