let dailys = document.querySelector("#dailys");
let weeklys = document.querySelector("#weeklys");
let monthlys = document.querySelector("#monthlys");

dailys.addEventListener("toggle", () => console.log("Placeholder for now"));

const eventsJson = fetch("rs3Events.json")
  .then((response) => response.json())
  .then((json) => {
    return json;
  });

let setAllEvents = async () => {
  const eventObj = await eventsJson;
  setEvent("dailys", eventObj);
  setEvent("weeklys", eventObj);
  setEvent("monthlys", eventObj);
};

function setEvent(eventType, eventObj) {
  eventObj[eventType].map((event) => {
    let singleEvent = document.createElement("div");
    let eventName = document.createElement("label");
    let eventCheckbox = document.createElement("input");
    let eventDisc = document.createElement("p");

    eventName.htmlFor = event.name;

    eventCheckbox.type = "checkbox";
    eventCheckbox.id = event.name;

    singleEvent.classList.add("event");
    eventName.textContent = event.name;
    eventDisc.textContent = event.description;

    singleEvent.appendChild(eventCheckbox);
    singleEvent.appendChild(eventName);
    singleEvent.appendChild(eventDisc);

    determineEventTypeToSet(eventType, singleEvent);
  });
}

function determineEventTypeToSet(eventType, singleEvent) {
  if (eventType === "dailys") {
    dailys.appendChild(singleEvent);
  } else if (eventType === "weeklys") {
    weeklys.appendChild(singleEvent);
  } else if (eventType === "monthlys") {
    monthlys.appendChild(singleEvent);
  }
}

setAllEvents();
