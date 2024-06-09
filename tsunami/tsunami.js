let map = L.map('map',{ center: [0 ,0],zoom :3});
//Map layers
const carte1 = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

const carte2 = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
carte2.addTo(map);
//Map layers switcher button
let baseMaps = {
    "carte1 ": carte1,
    "carte2 ": carte2
    }
    L.control.layers(baseMaps).addTo(map);
     //Clusters
     let clusterTsunami = L.markerClusterGroup();
     clusterTsunami.addTo(map);

//Display data on the map control
     let select = document.querySelector('select');
             select.addEventListener('change', setDisplay);
             function setDisplay() {
               let choice = select.value;
               if (choice === 'displayTsunamis') {
                 clusterTsunami.addTo(map);
              } else {
                 clusterTsunami.remove();}}
              setDisplay();
 
     //Marker
     let tsunami = L.icon({
        iconUrl: "./markerTsunami.png",
        iconSize: [40,50],
        iconAnchor: [0,0],
    });
    // Tsunami data & function 
    function Tsunami() {
      d3.tsv("../tsunami/tsunamis.tsv").then(function(data) {
        for (let i = 0; i < data.length; i++) {
          let longitude = data[i].Longitude;
          let latitude = data[i].Latitude;
          let pays = data[i].Country;
          let year = data[i].Year;
          let hour = data[i].Hr;
          let min = data[i].Mn;
          let marker = L.marker([latitude, longitude], { icon: tsunami });
          marker.bindPopup(TsunamiPopup());
          marker.addTo(clusterTsunami);
          // Display a specified popup
          function TsunamiPopup() {
            let popup = ("Tsunami details:" + "</br>Country:&nbsp" + pays + "</br>Hour:&nbsp" + hour + "</br>Mins:&nbsp" + min + "</br>Year:&nbsp" + year + "</br>Latitude:&nbsp" + latitude + "</br>" + "Longitude:&nbsp" + longitude);
            return popup;
          }
          // Display the popup content in the website
          marker.addEventListener("click", function() {
            let div = document.getElementById("d1");
            div.innerHTML = "<img class='mt-4 details rounded' src='../tsunami/tsunamis.jpg'><h1>Tsunami details</h1><br><p><ul><li>Hour :" + hour + "</li>" + "<br><li>Mins :" + min + "</li>" + "<br><li>Year :" + year + "</li>" + "<br><li>Longitude :" + longitude + "</li>" + "<br><li>Latitude :" + latitude + "</li>"+ "<br><li>Location :" + pays + "</li></ul></p>";
            let button = document.getElementById("btn");
            button.style.display = "block"; // Show the button
          });
        }
      });
    }
    Tsunami();
    // display data
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

     async function fetchTsunamiData() {
      const response = await fetch('../tsunami/tsunamis.tsv');
      const data = await response.text();
      return d3.tsvParse(data);
  }
  function processTsunamiData(data) {
    const filteredData = data.filter(d => d.Year && +d.Year >= 2000 && +d.Year <= 2021);
    const years = filteredData.map(d => +d.Year);
    const yearCounts = d3.rollup(years, v => v.length, d => d);
    return Array.from(yearCounts, ([key, value]) => ({ year: key, count: value }));
}

async function createYearChart() {
    const data = await fetchTsunamiData();
    const processedData = processTsunamiData(data);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select(".chart-container").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleBand()
                .domain(processedData.map(d => d.year))
                .range([0, width])
                .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(processedData, d => d.count)])
                .nice()
                .range([height, 0]);

    svg.append("g")
       .selectAll("rect")
       .data(processedData)
       .enter().append("rect")
       .attr("x", d => x(d.year))
       .attr("y", d => y(d.count))
       .attr("width", x.bandwidth())
       .attr("height", d => height - y(d.count))
       .attr("fill", "steelblue");

    svg.append("g")
       .attr("class", "x-axis")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
       .attr("class", "y-axis")
       .call(d3.axisLeft(y));

    svg.append("text")
       .attr("class", "x label")
       .attr("text-anchor", "end")
       .attr("x", width / 2)
       .attr("y", height + margin.bottom - 5)
       .text("Année");

    svg.append("text")
       .attr("class", "y label")
       .attr("text-anchor", "end")
       .attr("x", -height / 2)
       .attr("y", -margin.left + 15)
       .attr("transform", "rotate(-90)")
       .text("Nombre de Tsunamis");
}

createYearChart();