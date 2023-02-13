import { getData, upcomingFilter, pastFilter, highestPercentageOfAttendance, lowestPercentageOfAttendance, largerCapacity, upcomingEventsStatistics } from "./module/functions.js";

const data = getData()

const eventStatistics = document.getElementById("event-statistics")
const upcomingStatistics = document.getElementById("upcoming-statistics")

data.then( (response) => {
    console.log(response)
    let upcomingEvents = upcomingFilter(response.events, response.currentDate)
    let pastEvents = pastFilter(response.events, response.currentDate)
    
    let highestPercentageOfAttendanceEvent = highestPercentageOfAttendance(pastEvents)
    let lowestPercentageOfAttendanceEvent = lowestPercentageOfAttendance(pastEvents)
    let largerCapacityEvent = largerCapacity(response.events)
    eventStatistics.innerHTML += `
    <tr>
        <th>"${highestPercentageOfAttendanceEvent.name}" with ${((highestPercentageOfAttendanceEvent.assistance*100)/highestPercentageOfAttendanceEvent.capacity).toFixed(1)}%</th>
        <th>"${lowestPercentageOfAttendanceEvent.name}" with ${((lowestPercentageOfAttendanceEvent.assistance*100)/lowestPercentageOfAttendanceEvent.capacity).toFixed(1)}%</th>
        <th>"${largerCapacityEvent.name}" with ${largerCapacityEvent.capacity} capacity</th>
    </tr>
    `

    upcomingEventsStatistics(upcomingEvents)

})