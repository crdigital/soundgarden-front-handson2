
// cadastrar eventos
const formInsereEvento = D.querySelector('#formInsereEvento');

formInsereEvento.addEventListener('submit', async (form) => {
    form.preventDefault();

        const formData = new FormData(formInsereEvento);
        const data = Object.fromEntries(formData);
        data.attractions = [data.attractions];
        data.number_tickets = parseInt(data.number_tickets);
        

       const insercao = await fetch(`${BASE_URL}/events`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(result => result)
        .catch(error => error);

        if(insercao.status == 201){
            alert('Evento inserido com sucesso!');
            window.location = "admin.html";
        }else{
            alert('Erro na inserção do evento.');
        }

});