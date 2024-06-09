let map = L.map('map', { center: [18, -64], zoom: 3 });

// Maps
const carte1 = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});
const carte2 = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
carte2.addTo(map);

// Maps switcher
let baseMaps = {
  "carte1": carte1,
  "carte2": carte2
};
L.control.layers(baseMaps).addTo(map);

// Clusters
let clusterTsunami = L.markerClusterGroup();
clusterTsunami.addTo(map);

let clusterEarthquake = L.markerClusterGroup();
clusterEarthquake.addTo(map);

let clusterHurricane = L.markerClusterGroup();
clusterHurricane.addTo(map);

// Display the kind of data I want
let select = document.querySelector('select');
select.addEventListener('change', setDisplay);
function setDisplay() {
  let choice = select.value;
  if (choice === 'all') {
    clusterTsunami.addTo(map);
    clusterEarthquake.addTo(map);
    clusterHurricane.addTo(map);
  } else if (choice === 'tsunamis') {
    clusterTsunami.addTo(map);
    clusterHurricane.remove();
    clusterEarthquake.remove();
  } else if (choice === 'earthquakes') {
    clusterEarthquake.addTo(map);
    clusterTsunami.remove();
    clusterHurricane.remove();
  } else if (choice === 'hurricanes') {
    clusterHurricane.addTo(map);
    clusterTsunami.remove();
    clusterEarthquake.remove();
  } else {
    choice = "";
  }
}
setDisplay();

// Icons
let tsunami = L.icon({
  iconUrl: "./tsunami/markerTsunami.png",
  iconSize: [40, 50],
  iconAnchor: [0, 0],
});

let earthquake = L.icon({
  iconUrl: './earthquake/markerEarthquake.png',
  iconSize: [40, 50],
  iconAnchor: [0, 0],
});

let hurricane = L.icon({
  iconUrl: './hurricane/markerHurricane.png',
  iconSize: [40, 50],
  iconAnchor: [0, 0],
});

// Tsunami data & function
function Tsunami() {
  d3.tsv("./tsunami/tsunamis.tsv").then(function(data) {
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
        div.innerHTML = "<img class='mt-4 details rounded' src='./tsunami/tsunamis.jpg'><h1>Tsunami details</h1><br><p><ul><li>Hour :" + hour + "</li>" + "<br><li>Mins :" + min + "</li>" + "<br><li>Year :" + year + "</li>" + "<br><li>Longitude :" + longitude + "</li>" + "<br><li>Latitude :" + latitude + "</li>"+ "<br><li>Location :" + pays + "</li></ul></p>";
        let button = document.getElementById("btn");
        button.style.display = "block"; // Show the button
      });
    }
  });
}
Tsunami();

// Earthquakes data & function
function Earthquake() {
  d3.tsv("./earthquake/earthquakes.tsv").then(function(data) {
    for (let i = 0; i < data.length; i++) {
      let longitude = data[i].Longitude;
      let latitude = data[i].Latitude;
      let year = data[i].Year;
      let hour = data[i].Hr;
      let min = data[i].Mn;
      let marker = L.marker([latitude, longitude], { icon: earthquake });
      marker.bindPopup(EarthquakePopup());
      marker.addTo(clusterEarthquake);
      // Display a specified popup
      function EarthquakePopup() {
        let popup = ("Earthquake details:" + "</br>Hour:&nbsp" + hour + "</br>Mins:&nbsp" + min + "</br>Year:&nbsp" + year + "</br>Latitude:&nbsp" + latitude + "</br>" + "Longitude:&nbsp" + longitude);
        return popup;
      }
      // Display the popup content in the website
      marker.addEventListener("click", function() {
        let div = document.getElementById("d1");
        div.innerHTML = "<img class='details mt-4 rounded' src='./earthquake/earthquake.jpg'><h1>Earthquake details</h1><br><p><ul><li>Hour :" + hour + "</li>" + "<br><li>Mins :" + min + "</li>" + "<br><li>Year :" + year + "</li>" + "<br><li>Longitude :" + longitude + "</li>" + "<br><li>Latitude :" + latitude + "</li></ul></p>";
        let button = document.getElementById("btn");
        button.style.display = "block"; // Show the button
      });
    }
  });
}
Earthquake();

// Storms data & function
function Hurricane() {
  d3.json("./hurricane/hurricanes.json").then(function(data) {
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
        div.innerHTML = "<img class='details mt-4 rounded' src='./hurricane/hurricanes.jpg'><h1>Hurricane details</h1><br><p><ul><li>Date :" + mois + ",&nbsp" + year + "</li>" + "<br><li>Location :" + ville + "</li>" + "<br><li>Reason :" + details + "</li>" + "<br><li>Longitude :" + longitude + "</li>" + "<br><li>Latitude :" + latitude + "</li></ul></p>";
        let button = document.getElementById("btn");
        button.style.display = "block"; // Show the button
      });
    }
  });
}
Hurricane();

// Toggle display of d1 content
let d1 = document.getElementById("d1");
let button = document.getElementById("btn");

button.addEventListener("click", () => {
  if (d1.style.display != "none") {
    d1.style.display = "none";
    button.innerHTML = "Click me to show details";
  } else {
    d1.style.display = "block";
    button.innerHTML = "Click me to hide";
  }
});
