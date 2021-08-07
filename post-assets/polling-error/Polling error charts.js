/*  This visualization was made possible by modifying code provided by:

Scott Murray, Choropleth example from "Interactive Data Visualization for the Web" 
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html   
		
Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

Mike Bostock, Pie Chart Legend
http://bl.ocks.org/mbostock/3888852  */

function good_round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

var inputValue = null;
var margins = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,+2,3,4,5,6,7,8,9,10];

var forButton = 10

// when the input range changes update the value 
d3.select("#timeslide").on("input", function() {
	var id = "range"
	forButton = +this.value
    update(+this.value, id, include);
});


var include = 0

var box = document.createElement("INPUT");
box.setAttribute("type", "checkbox");
box.setAttribute("id", "checkbox")
// 2. Append somewhere
var body = document.getElementsByClassName("map-checkbox")[0];
body.appendChild(box);

box.addEventListener ("click", function() {
	if (include == 0) {
		include = 1
	}
	else {
		include = 0
	}
	update(forButton, "range", include);
});

// update the fill of each SVG of class "incident" with value
function update(value, id, stateMargin) {
	if (stateMargin == 1) {
		var stateError = "2016's error "
		var noError = "2016's error"
	}
	else {
		var stateError = ''
		var noError = 0
	}
	if (margins[value] > 0) {
		document.getElementById(id).innerHTML=stateError + "+" + margins[value] + "D";
	}
	else if (margins[value] < 0) {
		document.getElementById(id).innerHTML=stateError + "+" + Math.abs(margins[value]) + "R";
	}
	else {
		document.getElementById(id).innerHTML= noError;
	}
    inputValue = margins[value];
    matchError(inputValue, stateMargin)

}

var mq = window.matchMedia( "(min-width: 1000px)" );
    if (mq.matches) {
		var desk = 1;
        var width = 800;
		var height = 500;
		var scale = 1000;
		var toolTipFS = 19;
    }
    else {
		var desk = 0
        var width = 350;
		var height = 200;
		var scale = 425;
		var toolTipFS = 8;
    }

// D3 Projection
var projection = d3.geo.albersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([scale]);          // scale things down so see entire US
        
// Define path generator
var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection

		
// Define linear scale for output
var color = d3.scale.linear()
			  .range(["rgb(207, 0, 0)","rgb(230, 69, 69)","rgb(232, 232, 232)","rgb(63, 136, 209)", "rgb(6, 78, 150)"]);


//Create SVG element and append map to the SVG
var svg = d3.selectAll("#chart-1")
      .append("svg")
      .attr("id", "us-map")
			.attr("width", width)
      .attr("height", height);

// Append Div for tooltip to SVG
var tooltip = d3.select("body")
  .append("div")
	.attr('class', 'tooltip')
    .style("position", "absolute")
	.style("visibility", "hidden")
	.style("fill", "#eee")
	.style("background-color", "#eee")
	.style("border-radius", "10px");

var EV_data;

d3.csv("/post-assets/polling-error/statedata.csv", function(data){
   statedata=data;
   });
setTimeout(function(){
console.log(EV_data);
},200);
        
matchError(0, 0)

function matchError(inputValue, stateMargin) {

// Load in my states data!
d3.csv("https://projects.fivethirtyeight.com/2020-general-data/presidential_poll_averages_2020.csv", function(data) {
color.domain([-50,-5,0,5,50]); // setting the range of the input data

// Load GeoJSON data and merge with states data
d3.json("/post-assets/polling-error/us-states.json", function(json) {

// Loop through each state data value in the .csv file

var tEV = 0

var bEV = 0

for (var i = 0; i <= 55; i++) {

	var MoE = +statedata[55-i].error

	if (stateMargin == 1) {
		var stateError = MoE
	}
	else {
		var stateError = 0
	}

		// Grab State Name
	var dataState = data[i].state;

	// Grab Trump pct
	var bidenPct = data[i].pct_estimate
	
	// Grab Trump pct
	var trumpPct = data[i + 56].pct_estimate

		// Grab data value 
	var dataValue = bidenPct - trumpPct + stateError + inputValue;
	
	// Grab electoral votes
	if (dataValue > 0) {
		var bEV = bEV + +statedata[55-i].ev
	}

	else {
		var tEV = tEV + +statedata[55-i].ev
	}

	console.log(+statedata[55-i].ev)

		// Find the corresponding state inside the GeoJSON
		for (var j = 0; j < json.features.length; j++)  {
			var jsonState = json.features[j].properties.name;

			if (dataState == jsonState) {

			// Copy the data value into the JSON
			json.features[j].properties.margin = dataValue; 

			// Stop looking through the JSON
			break;
			}
	}
}

// Bind the data to the SVG and create one path per GeoJSON feature
d3.selectAll("svg > *").remove();

svg.selectAll("g")
	.data(json.features)
	.enter()
	.append("path")
  .attr("d", path)
  .attr("id", "spec-state")
	.style("stroke", "#fff")
  .style("stroke-width", "1.5")
  .style("fill", "#fff")
  .style("fill", function(d) {
    // Get data value
    var value = d.properties.margin;

    if (value) {
    //If value exists…
    return color(value);
    } else {
    //If value is undefined…
    return "rgb(213,222,217)";
    }
  })
  .on('mouseover', mouseOver)
  .on("mouseout", mouseLeave)
  .on("mousemove", mouseMove);;

document.getElementById("bidenEV").innerHTML = "Biden:<br>" + bEV;
document.getElementById("trumpEV").innerHTML = "Trump:<br>" + tEV;

function mouseOver(d) {
  d3.select(this)
      .style('opacity', '.7');
  return tooltip
	.style("visibility", "visible")
}

function mouseLeave(d) {
  d3.select(this)
      .style('opacity', '1');
    
  return tooltip
    .style("visibility", "hidden")
}

var pollingError = 0
var Winner = 0

function mouseMove(d) {
	if (good_round(d.properties.margin, 1) > 0) {
		var Winner = "Biden wins<br>" + d.properties.name + " by " + good_round(Math.abs(d.properties.margin), 1) + " points.";
	}
	else if (good_round(d.properties.margin, 1) < 0) {
		var Winner = "Trump wins<br>" + d.properties.name + " by " + good_round(Math.abs(d.properties.margin), 1) + " points.";
	}
	else {
		var Winner = "Trump and biden are<br>" +"tied in " + d.properties.name;
	}

	if (inputValue > 0) {
		var pollingError = "+" + inputValue + "D";
	}
	else if (inputValue < 0) {
		var pollingError = "+" + Math.abs(inputValue) + "R";
	}
	else if (stateMargin == 1){
		var pollingError = 'alone';
	}
	else {
		var pollingError = 'no'
	}
	if (stateMargin == 1) {
		output = "With 2016's polling error " + pollingError + ", " + Winner;
	}
	else {
		output = "With " + pollingError + " polling error, " + Winner;
	}

	if (desk == 1){
		var fontSize = "18px";
		var lnHeight = "25px";
		var xAdd = 50;
		var yAdd = 50;
	}
	else {
		var fontSize = "9px";
		var lnHeight = "10px";
		var xAdd = -70;
		var yAdd = 60;
	}

    return tooltip
      .style("left", event.pageX + xAdd + "px")
	  .style("top", event.pageY - yAdd + "px")
	  .style("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)")
	  .style("padding", "20px")
	  .html(output)
		.style("padding", "10px")
		.style("font-family", "Montserrat, sans-serif")
		.style("font-size", fontSize)
		.style("font-weight", "500")
		.style("line-height", lnHeight)
	//   font-size: 18px;
	//   color: #6A93C0;
	//   font-weight: 700;)
  }

});

});
}