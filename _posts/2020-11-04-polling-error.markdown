---
layout: post
title:  "Polling Error Simulator"
short-hand: "polling-error"
subtitle: "Choose your own level of polling error and see how it affects the electoral outcome."
top-loads: [<script src="https://d3js.org/d3.v3.min.js"></script>,
        <script src="https://cdnjs.cloudflare.com/ajax/libs/rangeslider.js/2.3.3/rangeslider.min.css"></script>]
bottom-loads: [<script type="text/javascript" src="/post-assets/polling-error/Polling error charts.js"></script>,
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>]
tags: "politics"
permalink: "articles/polling-error"
old_css: "True"
---
 <div id="top-slider">
    <p style="text-align: center;">Add polling error using the slider below:</p>
    <label class="map-checkbox">Use 2016 polling errors as a baseline?</label>
    <div class="slidecontainer">
        <input type="range" min="0" max="20" value="10" step="1" class="slider" id="timeslide">
    </div>
    <p class="under-slider" id="range">0</p>
</div>
    
<div class="chart-block">
    <div class="chart" id="chart-1" style="margin: auto;"></div>
    <div id="vote-totals">
        <h1 id="bidenEV" style="color:rgb(6, 78, 150);"></h1>
        <h1 id="trumpEV" style="color: rgb(230, 69, 69);"></h1>
    </div>
</div>

Current poll data are pulled from 538's state by state polling averages and are updated daily. 2016 polling errors are calculated using 538's final election day prediction. Graphic built in d3.js.