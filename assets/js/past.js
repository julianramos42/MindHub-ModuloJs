const events = data.events
const actualDate = data.currentDate
const pastCardContainer = document.getElementById("past-card-container")

function pastFilter(events){
  let pastEvents = []
  for(let event of events){
    if(actualDate > event.date){
      pastEvents.push(event)
    }
  }
  return pastEvents
}

function createCards(list){
  for(let entrie of list){
    writeCard(entrie,pastCardContainer)
  }
}

function writeCard(event, container) {
  pastCardContainer.innerHTML += `
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
}

let pastEvents = pastFilter(events)
createCards(pastEvents)