---
layout: "post"
title:  "County Level Election Simulator"
subtitle: "Choose which types of counties you want to count, and see how your choices effect the election."
short-hand: "choose-counties-simulator"
tags: "politics"
top-loads: [<script src="https://d3js.org/d3.v5.min.js"></script>, 
        <script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js" integrity="sha512-4UKI/XKm3xrvJ6pZS5oTRvIQGIzZFoXR71rRBb1y2N+PbwAsKa5tPl2J6WvbEvwN3TxQCm8hMzsl/pO+82iRlg==" crossorigin="anonymous"></script>]
bottom-loads: [<script type="text/javascript" src="/post-assets/choose-counties-simulator/new-map.js"></script>]
permalink: "articles/choose-counties-simulator" 
old_css: "True"
---

You can use the input boxes below to select the attributes of counties you wish to include in final vote tallies. Once you are done, click regenerate map. In your chosen scenario, you can see what the final electoral vote counts for each candidate would be under your map. If you are on desktop, you can hover over each state for more details.

<div class="input-groups">
<div class="input-group">
  <p>Pct. White</p>
  <div class="input-buttons">
    <input type="text" id="WhiteMin" name="WhiteMin" value="0"><br>
    <input type="text" id="WhiteMax" name="WhiteMax" value="100"><br><br>
  </div>
</div>

<div class="input-group">
  <p>Pct. Black</p>
  <div class="input-buttons">
    <input type="text" id="BlackMin" name="WhiteMin" value="0"><br>
    <input type="text" id="BlackMax" name="WhiteMax" value="100"><br><br>
  </div>
</div>

<div class="input-group">
  <p>Pct. Latino</p>
  <div class="input-buttons">
    <input type="text" id="LatinoMin" name="WhiteMin" value="0"><br>
    <input type="text" id="LatinoMax" name="WhiteMax" value="100"><br><br>
  </div>
</div>

<div class="input-group">
  <p>Pct. with Bachelors</p>
  <div class="input-buttons">
    <input type="text" id="BachMin" name="WhiteMin" value="0"><br>
    <input type="text" id="BachMax" name="WhiteMax" value="100"><br><br>
  </div>
</div>

<div class="input-group">
  <p>Pct. in Poverty</p>
  <div class="input-buttons">
    <input type="text" id="PovMin" name="WhiteMin" value="0"><br>
    <input type="text" id="PovMax" name="WhiteMax" value="100"><br><br>
  </div>
</div>

<div class="input-group">
  <p>Median Household Income</p>
  <div class="input-buttons">
    <input type="text" id="MHIMin" name="WhiteMin" value="0"><br>
    <input type="text" id="MHIMax" name="WhiteMax" value="136269"><br><br>
  </div>
</div>

<div class="input-group">
  <p>Pct. Employed</p>
  <div class="input-buttons">
    <input type="text" id="LaborMin" name="WhiteMin" value="0"><br>
    <input type="text" id="LaborMax" name="WhiteMax" value="100"><br><br>
  </div>
</div>

<div class="input-group">
  <p>Pct. with Health Insurance</p>
  <div class="input-buttons">
    <input type="text" id="HealthMin" name="WhiteMin" value="0"><br>
    <input type="text" id="HealthMax" name="WhiteMax" value="100"><br><br>
  </div>
</div>
</div>

<div class="button-container">
<button type="button" id="new-map-button">Regenerate Map!</button>
</div>

<div id="chart-1" style="margin: auto;"></div>

<div class="candidate-votes">
<h1 id="biden-votes"></h1>
<h1 id="trump-votes"></h1>
</div>

Because Alaska does not tabulate its votes by county, I was unable to include it in this web app. For that reason, total electoral votes will add to 535 instead of 538.