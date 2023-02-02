function createHomeCards() {
  const cardContainer = document.getElementById("home-card-container")
  for (let event of data.events) {
    cardContainer.innerHTML += `
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
            <a href="./assets/html/details.html" class="btn p-1">Details</a>
          </div>
        </div>
      </section>
    `
  }
}
createHomeCards()