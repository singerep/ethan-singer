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

console.log(screen.width)

var width = screen.width*900/1739
var height = width*560/900
var scale = screen.width*1200/1739

var mq = window.matchMedia( "(max-width: 577px)" );
    if (!!mq.matches) {
        var width = screen.width*350/375;
		var height = screen.width*250/375;
		var scale = screen.width*475/375;
    }

var body = d3.select('body');
	// D3 Projection
var projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([scale]);          // scale things down so see entire US
        
// Define path generator
var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection

		
// Define linear scale for output
var color = d3.scaleLinear()
			  .range(["rgb(207, 0, 0)","rgb(230, 69, 69)","rgb(232, 232, 232)","rgb(63, 136, 209)", "rgb(6, 78, 150)"])
			  .domain([-1400, -50, 0, 50, 150]);

//Create SVG element and append map to the SVG
var svg = d3.selectAll("#chart-1")
      	.append("svg")
		.attr("width", width)
		  .attr("height", height);
		  
var tooltip = body
	.append('div')
	.attr('class', 'tooltip')
	.attr('id', 'tooltip')
	.style('opacity', 0);

let countyData
let votingData

d3.json('/post-assets/covid-votes/gz_2010_us_050_00_500k.json').then(
	(data, error) => {
		if(error){
			console.log(error)
		}
		else{
			countyData = data
			d3.json('https://raw.githubusercontent.com/singerep/COVID-votes/main/covid-vote-data.json').then(
				(data, error) => {
					if(error){
						console.log(error)
					}
					else{
						votingData = data
						for (var i=0; i < votingData.length; i++) {
							var votingDataID = votingData[i].FIPS
							for (var j=0; j < countyData.features.length; j++) {
								var countyDataID = +(countyData.features[j].properties.STATE + countyData.features[j].properties.COUNTY)
								if (countyDataID == votingDataID) {
									countyData.features[j].properties.CountyName = votingData[i].County
									countyData.features[j].properties.StateName = votingData[i].State
									countyData.features[j].properties.Deaths = votingData[i].Deaths
									countyData.features[j].properties.RawBiden = votingData[i].RawBiden
									countyData.features[j].properties.RawTrump = votingData[i].RawTrump
									countyData.features[j].properties.BidenLV = votingData[i].BidenLV
									countyData.features[j].properties.TrumpLV = votingData[i].TrumpLV
									countyData.features[j].properties.Margin = votingData[i].RawBiden - votingData[i].RawTrump
									countyData.features[j].properties.LVMargin = votingData[i].BidenLV - votingData[i].TrumpLV
								}
							}
						}
						drawMap()
					}
				}
			)
		}
	}
)

let drawMap = () => {
	svg.selectAll("g")
	.data(countyData.features)
	.enter()
	.append("path")
  	.attr("d", path)
	.style("stroke", "white")
  	.style("stroke-width", ".25")
  	.style("fill", function(d) {
		// Get data value
		var value = d.properties.LVMargin;

		if (value == 0){
			value = 0.01
		}
	
		if (value) {
		//If value exists…
		return color(value);
		} else {
		//If value is undefined…
		return "rgb(213,222,217)";
		}
	})
	.on('mouseover', mouseOver)
 	.on("mouseout", mouseLeave);
}

function mouseOver(d) {
	tooltip.style('opacity', 0.9);

	if (d.properties.CountyName) {

	var parent = document.getElementById("tooltip");
	var child = document.getElementById("no-data");

	if (child) {
		parent.removeChild(child);
	}
	
	/* Add or replace top text */
	var NewParaTopText = document.createElement("p");
	NewParaTopText.setAttribute("id", "top-text");
	NewParaTopText.setAttribute("class", "tooltip-text");
	var NewNodeTopText = document.createTextNode('PROJECTED LOST VOTES');
	NewParaTopText.appendChild(NewNodeTopText);
	var element = document.getElementById("tooltip");
	var OldParaTopText = document.getElementById("top-text");
	if (OldParaTopText){
		element.replaceChild(NewParaTopText, OldParaTopText)
	}
	else {
		element.appendChild(NewParaTopText);
	}
	
	/* Add or replace name of county */
	var NewParaCounty = document.createElement("p");
	NewParaCounty.setAttribute("class", "tooltip-text");
	NewParaCounty.setAttribute("id", "county-name");
	var NewNodeCounty = document.createTextNode('in ' + d.properties.CountyName + ', ' + d.properties.StateName);
	NewParaCounty.appendChild(NewNodeCounty);
	var element = document.getElementById("tooltip");
	var OldParaCounty = document.getElementById("county-name");
	if (OldParaCounty){
		element.replaceChild(NewParaCounty, OldParaCounty)
	}
	else {
		element.appendChild(NewParaCounty);
	}

	/* Add or replace COVID deaths */
	var NewParaDeaths = document.createElement("p");
	NewParaDeaths.setAttribute("class", "tooltip-text");
	NewParaDeaths.setAttribute("id", "covid-deaths");
	var NewNodeDeaths = document.createTextNode('(' + d.properties.Deaths + ' COVID-19 deaths)');
	NewParaDeaths.appendChild(NewNodeDeaths);
	var element = document.getElementById("tooltip");
	var OldParaDeaths = document.getElementById("covid-deaths");
	if (OldParaDeaths){
		element.replaceChild(NewParaDeaths, OldParaDeaths)
	}
	else {
		element.appendChild(NewParaDeaths);
	}

	/* Add or replace lost voters */
	var NewParaTrumpLV = document.createElement("p");
	NewParaTrumpLV.setAttribute("class", "tooltip-text");
	NewParaTrumpLV.setAttribute("id", "lost-voters");
	var NewNodeTrumpLV = document.createTextNode('Trump: ' + good_round(d.properties.TrumpLV, 0));
	NewParaTrumpLV.appendChild(NewNodeTrumpLV);
	var NewNodeTrumpLV = document.createTextNode(', Biden: ' + good_round(d.properties.BidenLV, 0));
	NewParaTrumpLV.appendChild(NewNodeTrumpLV);
	var element = document.getElementById("tooltip");
	var OldParaTrumpLV = document.getElementById("lost-voters");
	if (OldParaTrumpLV){
		element.replaceChild(NewParaTrumpLV, OldParaTrumpLV)
	}
	else {
		element.appendChild(NewParaTrumpLV);
	}
	}
	else{
		tooltip.html('');
		var NewParaNoData = document.createElement("p");
		NewParaNoData.setAttribute("id", "no-data");
		NewParaNoData.setAttribute("class", "tooltip-text");
		var NewNodeNoData = document.createTextNode('Sorry, no data for this area!');
		NewParaNoData.appendChild(NewNodeNoData);
		var element = document.getElementById("tooltip");
		var OldParaNoData = document.getElementById("no-data");
		if (OldParaNoData){
			element.replaceChild(NewParaNoData, OldParaNoData)
		}
		else {
			element.appendChild(NewParaNoData);
		}
	}
	var tooltipWidth = document.getElementById("tooltip").offsetWidth;
	tooltip
		.style('left', d3.event.pageX - tooltipWidth/2 + 'px')
		.style('top', d3.event.pageY - 120 + 'px');
  }
  
function mouseLeave(d) {
	tooltip.style('opacity', 0);
}
	//   font-size: 18px;
	//   color: #6A93C0;
	//   font-weight: 700;)

/*

.html(output)
		.style("padding", "10px")
		.style("font-family", "Montserrat, sans-serif")
		.style("font-size", fontSize)
		.style("font-weight", "500")
		.style("line-height", lnHeight)

// Load in my states data!
d3.csv("https://projects.fivethirtyeight.com/2020-general-data/presidential_poll_averages_2020.csv", function(data) {
color.domain([-50,-5,0,5,50]); // setting the range of the input data

// Load GeoJSON data and merge with states data
d3.json("us-states.json", function(json) {

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



});

});

*/