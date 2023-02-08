import { searchBarFilter, checkboxFilter, checksOn, createCards, createChecks, preventDefault } from "./module/functions.js"

const events = data.events
const actualDate = data.currentDate
const upcomingCardContainer = document.getElementById("upcoming-card-container")
const searchBar = document.getElementById("search-bar")
const categoryChecksContainer = document.getElementById("filter")
const form = document.getElementById("form")

function upcomingFilter(events){
  let upcomingEvents = []
  for(let event of events){
    if(actualDate < event.date){
      upcomingEvents.push(event)
    }
  }
  return upcomingEvents
}

let upcomingEvents = upcomingFilter(events)


// CHECKBOX LISTENER
categoryChecksContainer.addEventListener("click", (e) => {
  if (e.target.localName === "input") {
    let searchValue = searchBar.childNodes[1].value.toLowerCase()
    let categoryCheckeds = checksOn() // return an array of inputs with check
    let filterEvents = checkboxFilter(upcomingEvents, categoryCheckeds) // return an array of events wich matches that category with value of checks
    let filterBySearch = searchBarFilter(filterEvents, searchValue) // return an array of events that matches checks and searchbar values
    let eventsBySearch = searchBarFilter(upcomingEvents, searchValue)
    createCards(filterBySearch, upcomingCardContainer)
    
    let anyChecks = Boolean(...checksOn()) // true or false depends on if any check is checked
    let anyMatch = Boolean(...filterBySearch)
    let anySearch = Boolean(...eventsBySearch)

    if(!anyChecks && searchValue === ""){
      createCards(events, upcomingCardContainer)
    }else if(!anyChecks && anySearch){
      createCards(eventsBySearch, upcomingCardContainer)
    }else if (!anyMatch) {
      upcomingCardContainer.innerHTML = `
        <p>NO MATCHES FOUND</p>
      `
    }
  }
})


// SEARCHBAR LISTENER
searchBar.addEventListener("keyup", (e) => {
  let search = e.target.value.toLowerCase()
  let categoryCheckeds = checksOn() // return an array of inputs with check
  let filterEvents = searchBarFilter(upcomingEvents, search) // return an array of events wich matches with the search
  let filterByChecks = checkboxFilter(filterEvents, categoryCheckeds) // return an array of events that matches checks and searchbar values
  
  let anyChecks = Boolean(...checksOn())
  let anyMatchWithoutChecks = Boolean(...filterEvents)
  let anyMatchWithChecks = Boolean(...filterByChecks)
  
  if (!anyChecks && anyMatchWithoutChecks) {
    createCards(filterEvents, upcomingCardContainer)
  } else if (anyChecks && anyMatchWithChecks) {
    createCards(filterByChecks, upcomingCardContainer)
  } else if ((anyChecks && !anyMatchWithChecks) || (!anyChecks && !anyMatchWithoutChecks)) {
    upcomingCardContainer.innerHTML = `
    <p>NO MATCHES FOUND</p>
    `
  }
})


createCards(upcomingEvents,upcomingCardContainer)
createChecks(events)
preventDefault(form)