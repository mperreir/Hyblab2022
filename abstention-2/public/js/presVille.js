async function loadPresVille() {
  const screen = document.getElementById('screen');

  // const data = { nom: "Saint-herblain", population: 46268, superficie: 30.02, metier: [0.04, 2.07, 9.05, 13.03, 14.11, 8.82, 21.27, 12.55] };
  selectedCity = "nantes";
  selectedCityData = await fetchCityData(selectedCity);

  const citiesRq = await fetch('api/cities/');
  citiesMap = await citiesRq.json();
  const metropoleRq = await fetch('api/metropole/');
  metropoleData = await metropoleRq.json();
  metropoleData = metropoleData.nantes;

  // barage("barage", selectedCityData.ages);
  // metierdot("metier", selectedCityData.metiers);
  // console.log(metiers);
  const presHtml = await loadTemplate('templates/pres_ville.ejs', selectedCityData);
  container.innerHTML = presHtml;

  beforePrintHandler();
};