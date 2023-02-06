const cardContainer = document.getElementById("home-card-container")
const events = data.events
const cards = document.getElementsByClassName("card")
const searchBar = document.getElementById("search-bar")
const categoryChecksContainer = document.getElementById("filter")


// FUNCTION TO CREATE ALL CARDS OF AN ARRAY OF EVENTS

function createHomeCards(events) {
  cardContainer.innerHTML = ""
  let aux = ""
  for (let event of events) {
    aux += writeCard(event)
  }
  cardContainer.innerHTML += aux
}

function writeCard(event) {
  return `
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

createHomeCards(events)


// CREATION OF DYNAMIC CHECKBOXS

function createChecks(events) {
  let checks = Array.from(new Set(events.map(event => event.category)))
  let cont = 1
  for (let check of checks) {
    writeChecks(check, cont)
    cont++
  }
}

function writeChecks(check, cont) {
  categoryChecksContainer.innerHTML += `
    <div>
      <input type="checkbox" name="category" id="${cont}" value="${check}">
      <label for="${cont}">${check}</label>
    </div>  
  `
}

createChecks(events)


// CHECKBOX LISTENER

categoryChecksContainer.addEventListener("click", (e) => {
  if(e.target.localName === "input"){

    let categoryCheckeds = checksOn() // return an array of inputs with check
    let filterEvents = checkboxFilter(events,categoryCheckeds) // return an array of events wich matches that category with value of checks
    let filterBySearch = searchBarFilter(filterEvents,searchBar.childNodes[1].value) // return an array of events that matches checks and searchbar values
    createHomeCards(filterBySearch)
    
    let noChecks = Boolean(... checksOn()) // true or false depends on if any check is checked
    if(!noChecks){  // if no checks checked, create all cards
      createHomeCards(events)
    }
  }
})


// SEARCHBAR LISTENER

searchBar.addEventListener("keyup", (e) => {
  let search = e.target.value.toLowerCase()
  let categoryCheckeds = checksOn() // return an array of inputs with check
  let noChecks = Boolean(... checksOn())
  let filterEvents = searchBarFilter(events,search) // return an array of events wich matches with the search
  
  let anySearch = Boolean(... filterEvents)

  if(!anySearch){
    cardContainer.innerHTML = `
      <p>NO SE ENCONTRARON RESULTADOS</p>
    `
  } else if(!noChecks && anySearch){
    createHomeCards(filterEvents)
  } else{
    let filterByChecks = checkboxFilter(filterEvents,categoryCheckeds) // return an array of events that matches checks and searchbar values
    createHomeCards(filterByChecks)
  }
})


// CHECK AND SEARCH FILTER

function searchBarFilter(events,value){
  let filterEvents = events.filter((event) => event.name.toLowerCase().includes(value.toLowerCase()))
  return filterEvents
}

function checkboxFilter(events,value){
  let filterEvents = events.filter((event) => {
    for(let check of value){
      if(check.value === event.category){
        return event
      }
    }
  })
  return filterEvents
}

function checksOn(){
  let checks = Array.from(categoryChecksContainer.elements).filter((check) => check.checked)
  return checks
}