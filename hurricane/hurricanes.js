//MAP
let map = L.map('map',{ center: [18,-64],zoom :3});
//2 layers
const carte1 = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

const carte2 =L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
carte1.addTo(map);

//MAP button switcher
let baseMaps = {
    " carte1 ": carte1 ,
    " carte2 ": carte2
    }
    L.control.layers(baseMaps).addTo(map);
     
  //Clusters
let clusterHurricane = L.markerClusterGroup();
clusterHurricane.addTo(map);
 
//Display data on the map
    let select = document.querySelector('select');
    select.addEventListener('change', setDisplay);
    function setDisplay() {
      let choice = select.value;
      if (choice === 'displayHurricanes') {
        clusterHurricane.addTo(map);
     } else {
        clusterHurricane.remove();}}
     setDisplay();


    //icons
    let hurricane = L.icon({
        iconUrl: 'markerHurricane.png',
        shadowUrl: "",
        iconSize: [40,50],
        iconAnchor: [0,0],
    });

      //Storms data & function 
      function Hurricane() {
        d3.json("../hurricane/hurricanes.json").then(function(data) {
          for (let i = 0; i < data.length; i++) {
            let longitude = data[i].location.LONGITUDE;
            let latitude = data[i].location.LATITUDE;
            let year = data[i].details.YEAR;
            let mois = data[i].details.MONTH_NAME;
            let details = data[i].details.FLOOD_CAUSE;
            let ville = data[i].details.STATE;
            let marker = L.marker([latitude, longitude], { icon: hurricane });
            marker.bindPopup(HurricanePopup());
            marker.addTo(clusterHurricane);
            // Display a specified popup
            function HurricanePopup() {
              let popup = ("Hurricane details:" + "</br>Location: &nbsp" + ville + "</br>Date: &nbsp" + mois + ",&nbsp" + year + "</br>Latitude: &nbsp" + latitude + "</br>" + "Longitude &nbsp" + longitude);
              return popup;
            }
            // Display the popup content in the website
            marker.addEventListener("click", function() {
              let div = document.getElementById("d1");
              div.innerHTML = "<img class='details mt-4 rounded' src='../hurricane/hurricanes.jpg'><h1>Hurricane details</h1><br><p><ul><li>Date :" + mois + ",&nbsp" + year + "</li>" + "<br><li>Location :" + ville + "</li>" + "<br><li>Reason :" + details + "</li>" + "<br><li>Longitude :" + longitude + "</li>" + "<br><li>Latitude :" + latitude + "</li></ul></p>";
              let button = document.getElementById("btn");
              button.style.display = "block"; // Show the button
            });
          }
        });
      }
      Hurricane();
// Identity sheet
    let d1= document.getElementById("d1");
    let button = document.getElementById("btn");
    button.addEventListener("click", () => {
if(d1.style.display != "none"){
d1.style.display = "none"; 
button.innerHTML ="Click me to show details";
} else { 
d1.style.display = "block";
button.innerHTML= "Click me to hide";
}})
        const dataUrl = '../hurricane/hurricanes.json';

        // Fonction pour charger les données JSON
        async function fetchFatalityData() {
            const response = await fetch(dataUrl);
            const data = await response.json();
            return data;
        }

        const fatalityTypeMapping = {
          "D": "Direct",
          "I": "Indirect"
      };

      // Fonction pour transformer les données
      function processFatalityData(data) {
          const fatalities = data.flatMap(event => event.fatalities);
          const fatalityTypes = fatalities.map(f => f.FATALITY_TYPE);
          const fatalityCounts = d3.rollup(fatalityTypes, v => v.length, d => d);
          return Array.from(fatalityCounts, ([key, value]) => ({
              type: fatalityTypeMapping[key] || key,
              count: value
          }));
      }

      // Fonction pour créer le graphique en secteurs
      async function createPieChart() {
          const data = await fetchFatalityData();
          const processedData = processFatalityData(data);

          const width = 960;
          const height = 500;
          const radius = Math.min(width, height) / 2;

          const color = d3.scaleOrdinal()
                          .domain(processedData.map(d => d.type))
                          .range(d3.schemeCategory10);

          const arc = d3.arc()
                        .outerRadius(radius - 10)
                        .innerRadius(0);

          const labelArc = d3.arc()
                             .outerRadius(radius - 40)
                             .innerRadius(radius - 40);

          const pie = d3.pie()
                        .sort(null)
                        .value(d => d.count);

          const svg = d3.select(".chart-container").append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

          const g = svg.selectAll(".arc")
                       .data(pie(processedData))
                       .enter().append("g")
                       .attr("class", "arc");

          g.append("path")
           .attr("d", arc)
           .style("fill", d => color(d.data.type));

          g.append("text")
           .attr("transform", d => "translate(" + labelArc.centroid(d) + ")")
           .attr("dy", ".35em")
           .text(d => d.data.type + ": " + d.data.count);
      }

      createPieChart();