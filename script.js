let dailys = document.querySelector("#dailys");
let weeklys = document.querySelector("#weeklys");
let monthlys = document.querySelector("#monthlys");

dailys.addEventListener("toggle", () => console.log("Placeholder for now"));

window.addEventListener("load", () => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    const isChecked = localStorage.getItem(checkbox.id);

    if (isChecked === "true") {
      checkbox.checked = true;
      crossOutEvents(checkbox);
    }
  });
});

const eventsJson = fetch("rs3Events.json")
  .then((response) => response.json())
  .then((json) => {
    return json;
  });

const setAllEvents = async () => {
  const eventObj = await eventsJson;
  setEvent("dailys", eventObj);
  setEvent("weeklys", eventObj);
  setEvent("monthlys", eventObj);
};

function setEvent(eventType, eventObj) {
  eventObj[eventType].map((event) => {
    const singleEvent = document.createElement("div");
    const eventName = document.createElement("label");
    const eventCheckbox = document.createElement("input");
    const eventDisc = document.createElement("p");

    eventName.htmlFor = event.name;

    eventCheckbox.type = "checkbox";
    eventCheckbox.id = event.name;
    eventCheckbox.addEventListener("change", () => {
      localStorage.setItem(eventCheckbox.id, eventCheckbox.checked);
      crossOutEvents(eventCheckbox);
    });

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

function crossOutEvents(eventCheckbox) {
  if (eventCheckbox.checked === true) {
    //this is selecting the label inside event div
    eventCheckbox.nextSibling.setAttribute(
      "style",
      "text-decoration: line-through;"
    );
    //this is selecting the paragraph inside event div
    eventCheckbox.nextSibling.nextSibling.setAttribute(
      "style",
      "text-decoration: line-through;"
    );
  } else {
    eventCheckbox.nextSibling.removeAttribute("style", "text-decoration;");
    eventCheckbox.nextSibling.nextSibling.removeAttribute(
      "style",
      "text-decoration;"
    );
  }
}

setAllEvents();
