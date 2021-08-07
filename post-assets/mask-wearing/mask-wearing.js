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
			  .range(["rgb(255, 34, 18)","rgb(62, 230, 87)"])
			  .domain([2.3, 4.8]);

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

d3.json('https://raw.githubusercontent.com/singerep/data/main/gz_2010_us_050_00_500k.json').then(
	(data, error) => {
		if(error){
			console.log(error)
		}
		else{
			countyData = data
			d3.json('https://raw.githubusercontent.com/singerep/MWI-trump-share/main/mask-wearing-data.json').then(
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
									countyData.features[j].properties.MWI = votingData[i].MWI
									countyData.features[j].properties.OutputSentence = votingData[i].OutputSentence
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
		var value = d.properties.MWI;

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
	var NewNodeTopText = document.createTextNode('Mask Wearing Index');
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
	NewParaDeaths.setAttribute("id", "mask-wearing-index");
	var NewNodeDeaths = document.createTextNode(d.properties.MWI);
	NewParaDeaths.appendChild(NewNodeDeaths);
	var element = document.getElementById("tooltip");
	var OldParaDeaths = document.getElementById("mask-wearing-index");
	if (OldParaDeaths){
		element.replaceChild(NewParaDeaths, OldParaDeaths)
	}
	else {
		element.appendChild(NewParaDeaths);
	}

	/* Add or replace COVID deaths */
	var NewParaDeaths = document.createElement("p");
	NewParaDeaths.setAttribute("class", "tooltip-text");
	NewParaDeaths.setAttribute("id", "above-or-below");
	var NewNodeDeaths = document.createTextNode(d.properties.OutputSentence);
	NewParaDeaths.appendChild(NewNodeDeaths);
	var element = document.getElementById("tooltip");
	var OldParaDeaths = document.getElementById("above-or-below");
	if (OldParaDeaths){
		element.replaceChild(NewParaDeaths, OldParaDeaths)
	}
	else {
		element.appendChild(NewParaDeaths);
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

