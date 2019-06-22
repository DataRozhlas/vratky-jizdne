import "./byeie"; // loučíme se s IE

fetch("https://data.irozhlas.cz/vratky-jizdne/js/data/data.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });