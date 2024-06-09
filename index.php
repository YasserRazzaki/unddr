<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UNDRR - Home Page</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
  <link rel ="stylesheet" href ="//unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css"/>
  <link rel ="stylesheet" href="//unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"/>
    <?php include('./menu.html') ?>
</head>
<body>
<div class="container col-xxl-16 px-4 py-5 text-center">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div class="col-16 align-items-center">
                <h2 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                Hello! Welcome to our website
                </h2>
                <p class="lead">
                The UNDDR (United Nations Office for Disaster Risk Reduction) is dedicated to reducing disaster risks worldwide. In our project, we have collected and analyzed data on natural disasters to better understand their distribution and impact. We use visualization technologies such as Leaflet.js, d3.js, and Charts.js to represent this data interactively and informatively. </p>
                <p class="lead">We gathered data from various sources on natural disasters such as hurricanes, earthquakes, tsunamis, etc. These data are stored in JSON and TSV (Tab-Separated Values) files. Each dataset contains valuable information such as location, magnitude, date, and other relevant details for each event.</p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                </div>
            </div>
        </div>
    </div>
    <div class="bg-dark text-secondary px-4 py-5 text-center">
        <div class="py-5">
            <h2 class="display-5 fw-bold text-white">An Informative Map</h2>
            <div class="col-lg-16 text-center mx-auto">
                <p  class=" text-center fs-5 m-4">Using Leaflet.js and d3.js, we created interactive maps to visualize the geographical distribution of natural disasters. Each type of disaster is represented by a distinct marker on the map, allowing users to explore affected areas and obtain specific information about each event by clicking on the markers.</p>
                <p  class=" text-center fs-5 m-4">Our main objective is to raise awareness about the importance of disaster preparedness and to provide actionable insights for decision-making. By visualizing the data clearly and concisely, we aim to encourage the implementation of risk reduction measures and emergency planning.</p>
                <p class=" text-center fs-5 m-4">These are the different locations of earthquakes, tsunamis and hurricanes in the recent years. <br>
	<img id="icon1" src="./earthquake/markerEarthquake.png" align="middle"> Earthquakes <br>
    <img id="icon2" src="./hurricane/markerHurricane.png" align="middle"> Hurricanes <br>
	<img id="icon3" src="./tsunami/markerTsunami.png" align="middle"> Tsunamis</p>
            </div>
        </div>
    </div>
    <div class="container col-xxl-16 px-2 py-5">
        <div class="row flex-lg-row g-5 py-5">
            <div class="col-8">
            <div id="yass">
		<label for="data">Select which data to display </label>
        <select id="data">
            <option value="all">Show all</option>
            <option value="tsunamis">Tsunamis</option>
            <option value="earthquakes">Earthquakes</option>
            <option value="hurricanes">Hurricanes</option>
        </select>
            </div><div id="map" class=" mt-2 rounded">  </div> </div>

            <div class="col-4">
  <div class="d-grid gap-2">
    <a class="btn btn-outline-info btn-lg me-sm-3 fw-bold" id="btn" style="display: none;">Click me to show details</a>
    <div id="d1" style="display: none;">
      <h2></h2>
      <p></p>
    </div>
  </div>
</div>
</div>
</div>
    
	<?php include ('./footer.html'); ?>
   <script src="//d3js.org/d3.v7.min.js"></script>
   <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
   <script src ="//unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
    <script src="./home.js"></script>
</body>
</html>