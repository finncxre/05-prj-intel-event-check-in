//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const progressBar = document.getElementById("progressBar");
const attendeeCount = document.getElementById("attendeeCount");
const greeting = document.getElementById("greeting");
const attendeeListContainer = document.getElementById("attendeeListContainer");

//Track attendance
let count = 0;
const maxCount = 50;
const teamIds = ["water", "zero", "power"];
let attendees = [];

//Map team IDs to full team names
const teamNames = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables",
};

//Display attendee list
function displayAttendees() {
  attendeeListContainer.innerHTML = "";
  attendees.forEach(function (attendee) {
    const attendeeItem = document.createElement("div");
    attendeeItem.className = "attendee-item";
    attendeeItem.textContent = attendee.name + " - " + attendee.team;
    attendeeListContainer.appendChild(attendeeItem);
  });
}

//Load counts from local storage
function loadCounts() {
  const savedCount = localStorage.getItem("totalCount");
  if (savedCount) {
    count = parseInt(savedCount);
  }

  teamIds.forEach(function (teamId) {
    const savedTeamCount = localStorage.getItem(teamId + "Count");
    if (savedTeamCount) {
      const teamCounter = document.getElementById(teamId + "Count");
      teamCounter.textContent = savedTeamCount;
    }
  });

  const savedAttendees = localStorage.getItem("attendees");
  if (savedAttendees) {
    attendees = JSON.parse(savedAttendees);
    displayAttendees();
  }

  attendeeCount.textContent = count;
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
}

//Load counts when page loads
loadCounts();

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  //Increment count
  count++;
  console.log("Total check-ins: ", count);
  localStorage.setItem("totalCount", count);

  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
  attendeeCount.textContent = count;
  console.log("Progress: " + percentage);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  const newTeamCount = parseInt(teamCounter.textContent) + 1;
  teamCounter.textContent = newTeamCount;
  localStorage.setItem(team + "Count", newTeamCount);

  //Add attendee to list
  const attendee = {
    name: name,
    team: teamName,
  };
  attendees.push(attendee);
  localStorage.setItem("attendees", JSON.stringify(attendees));
  displayAttendees();

  //Show Welcome message
  const message = `Welcome, ${name} from ${teamName}!`;
  greeting.textContent = message;
  alert(`Welcome, ${name} from ${teamName}!`);

  form.reset();
});
