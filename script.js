fetch("rs3Events.json")
  .then((response) => response.json())
  .then((json) => console.log(json));
