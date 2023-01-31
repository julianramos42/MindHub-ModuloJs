function createPastCards() {
    const pastCardContainer = document.getElementById("past-card-container")
    for (let event of data.events) {
      if (data.currentDate > event.date) {
        let card = document.createElement("section")
        writeCard(card,event,pastCardContainer)
      }
    }
}

function writeCard(card,event,container){
    card.innerHTML = `
          <section class="card col-lg-2 col-11">
            <div class="card-img">
              <img src="${event.image}" class="card-img-top" alt="${event.name}">
            </div>
            <div class="card-body p-0 d-flex flex-column justify-content-center">
              <h5 class="card-title text-center m-0">${event.name}</h5>
              <p class="text-center m-0">
                ${event.description}
              </p>
              <div>
                <p class="m-0">Price: $${event.price}</p>
                <a href="../../assets/html/details.html" class="btn p-1">Details</a>
              </div>
            </div>
          </section>
        `
    container.appendChild(card)
}

createPastCards()