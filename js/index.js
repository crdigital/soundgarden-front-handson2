const divEventos = document.getElementById("eventos");

// listando os três ultimos eventos
const getEvents = async () => {

  const events = await fetch(`${BASE_URL}/events`).then((result) =>
    result.json()
  );

  events
    .sort((eventoA, eventoB) => eventoA.scheduled - eventoB.scheduled)
    .slice(0, 3)
    .forEach((event) => {
      const article = document.createElement("article");
      article.innerHTML = `
      <article class="evento card p-5 m-3">
        <h2>${event.name} - ${new Date(event.scheduled).toLocaleDateString(
        "pt-BR"
      )}</h2>
        <h4>${event.attractions.join(", ")}</h4>
        <p>
          ${event.description}
        </p>
        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#modal"
        data-whatever="${event.name},${event._id}">reservar ingresso</a>
      </article>`;

      divEventos.appendChild(article);
    });
};

getEvents();
