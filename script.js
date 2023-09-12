const dailys = document.querySelector("#dailys");
const weeklys = document.querySelector("#weeklys");
const monthlys = document.querySelector("#monthlys");
const dailyClearCheckboxBtn = document.querySelector("#clearDailys");
const weeklyClearCheckboxBtn = document.querySelector("#clearWeeklys");
const monthlyClearCheckboxBtn = document.querySelector("#clearMonthlys");

dailyClearCheckboxBtn.addEventListener("click", () => clearCheckboxes("daily"));

weeklyClearCheckboxBtn.addEventListener("click", () =>
  clearCheckboxes("weekly")
);

monthlyClearCheckboxBtn.addEventListener("click", () =>
  clearCheckboxes("monthly")
);

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

function clearCheckboxes(eventType) {
  switch (eventType) {
    case "daily":
      clearCheckboxHelper(dailys);
      break;
    case "weekly":
      clearCheckboxHelper(weeklys);
      break;
    case "monthly":
      clearCheckboxHelper(monthlys);
      break;
  }
}

function clearCheckboxHelper(eventType) {
  const events = Array.from(eventType.children);
  events.forEach((e) => {
    if (e.className === "event") {
      if (e.firstChild.checked === true) {
        e.firstChild.checked = false;
        crossOutEvents(e.firstChild);
        localStorage.setItem(e.firstChild.id, e.firstChild.checked);
      }
    }
  });
}

setAllEvents();
