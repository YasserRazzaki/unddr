<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UNDRR - Home Page</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
  <link rel="stylesheet" href="//unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
  <link rel="stylesheet" href="//unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />
  <?php include('../menu.html') ?>
  <style>  .chart-container {
            width: 960px;
            margin: 0 auto;
        
        }</style>
</head>

<body>
  <h1 class="mt-4" style="text-align: center;"> <b>What are Hurricanes?</b></h1>
  <div style="margin:2% 5%">Hurricanes are large, swirling storms. They produce winds of 119 kilometers per hour (74 mph) or higher. That's faster than a cheetah, the fastest animal on land. <br> Winds from a hurricane can damage buildings and trees.

    Hurricanes form over warm ocean waters. Sometimes they strike land. When a hurricane reaches land, it pushes a wall of ocean water ashore. This wall of water is called a storm surge. Heavy rain and storm surge from a hurricane can cause flooding.

    Once a hurricane forms, weather forecasters predict its path. They also predict how strong it will get. This information helps people get ready for the storm.

    There are five types, or categories, of hurricanes. The categories are based on wind speed. <br>
    - <u><b> Category 1:</b></u> Winds 119-153 km/hr (74-95 mph) - faster than a cheetah <br>
    - <u><b> Category 2:</b></u> Winds 154-177 km/hr (96-110 mph) - as fast or faster than a baseball pitcher's fastball <br>
    - <u><b> Category 3:</b></u> Winds 178-208 km/hr (111-129 mph) - similar, or close, to the serving speed of many professional tennis players <br>
    - <u><b> Category 4:</b></u> Winds 209-251 km/hr (130-156 mph) - faster than the world's fastest rollercoaster <br>
    - <u><b> Category 5:</b></u> Winds more than 252 km/hr (157 mph) - similar, or close, to the speed of some high-speed trains </div>

  <video controls src="Hurricanes.mp4" width="90%" height="80%" style="margin-left: 5%;margin-bottom:30px"></video>
  <div class="bg-dark text-secondary px-4 py-5 text-center">
    <div class="">
      <h2 class="display-5 fw-bold text-white">An Informative Map</h2>
  <div class="container text-white col-16 px-2 ">
    <div class="row flex-lg-row g-5 py-5">
      <div class="col-8">
        <div id="yass">
          <label for="data">Select which data to display </label>
          <select id="data">
            <option value="displayHurricanes">Show Hurricanes</option>
            <option value="HideHurricanes">Hide Hurricanes</option>
          </select>
        </div>
        <div id="map" class=" mt-2 rounded"> </div>
      </div>

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
  </div>  </div></div>

  <?php include('../footer.html'); ?>
  <script src="//d3js.org/d3.v7.min.js"></script>
  <script src="https://canvasjs.com/assets/script/canvasjs.min.js"> </script>
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <script src="//unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
  <script src="./hurricanes.js"></script>
</body>

</html>