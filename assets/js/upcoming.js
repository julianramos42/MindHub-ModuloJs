const events = data.events
const actualDate = data.currentDate
const upcomingCardContainer = document.getElementById("upcoming-card-container")

function upcomingFilter(events){
  let upcomingEvents = []
  for(let event of events){
    if(actualDate < event.date){
      upcomingEvents.push(event)
    }
  }
  return upcomingEvents
}

function createCards(list){
  for(let entrie of list){
    writeCard(entrie,upcomingCardContainer)
  }
}

function writeCard(event, container) {
  upcomingCardContainer.innerHTML += `
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

let upcomingEvents = upcomingFilter(events)
createCards(upcomingEvents)