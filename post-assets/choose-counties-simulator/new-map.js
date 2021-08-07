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
			  .domain([-50,-5,0,5,50]);

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
var newMapButton = document.getElementById("new-map-button");
newMap()
newMapButton.addEventListener("click", newMap);


function newMap () {

d3.selectAll("svg > *").remove();

var WhiteMin = document.getElementById("WhiteMin").value;
var WhiteMax = document.getElementById("WhiteMax").value;
var BlackMin = document.getElementById("BlackMin").value;
var BlackMax = document.getElementById("BlackMax").value;
var LatinoMin = document.getElementById("LatinoMin").value;
var LatinoMax = document.getElementById("LatinoMax").value;
var BachMin = document.getElementById("BachMin").value;
var BachMax = document.getElementById("BachMax").value;
var PovMin = document.getElementById("PovMin").value;
var PovMax = document.getElementById("PovMax").value;
var MHIMin = document.getElementById("MHIMin").value;
var MHIMax = document.getElementById("MHIMax").value;
var LaborMin = document.getElementById("LaborMin").value;
var LaborMax = document.getElementById("LaborMax").value;
var HealthMin = document.getElementById("HealthMin").value;
var HealthMax = document.getElementById("HealthMax").value;

var StateResults = {'00': [0, 0, 0, 0], '01': [0, 0, 0, 0], '02': [0, 0, 0, 0], '03': [0, 0, 0, 0], '04': [0, 0, 0, 0], '05': [0, 0, 0, 0], '06': [0, 0, 0, 0], '07': [0, 0, 0, 0], '08': [0, 0, 0, 0], '09': [0, 0, 0, 0], '10': [0, 0, 0, 0], '11': [0, 0, 0, 0], '12': [0, 0, 0, 0], '13': [0, 0, 0, 0], '14': [0, 0, 0, 0], '15': [0, 0, 0, 0], '16': [0, 0, 0, 0], '17': [0, 0, 0, 0], '18': [0, 0, 0, 0], '19': [0, 0, 0, 0], '20': [0, 0, 0, 0], '21': [0, 0, 0, 0], '22': [0, 0, 0, 0], '23': [0, 0, 0, 0], '24': [0, 0, 0, 0], '25': [0, 0, 0, 0], '26': [0, 0, 0, 0], '27': [0, 0, 0, 0], '28': [0, 0, 0, 0], '29': [0, 0, 0, 0], '30': [0, 0, 0, 0], '31': [0, 0, 0, 0], '32': [0, 0, 0, 0], '33': [0, 0, 0, 0], '34': [0, 0, 0, 0], '35': [0, 0, 0, 0], '36': [0, 0, 0, 0], '37': [0, 0, 0, 0], '38': [0, 0, 0, 0], '39': [0, 0, 0, 0], '40': [0, 0, 0, 0], '41': [0, 0, 0, 0], '42': [0, 0, 0, 0], '43': [0, 0, 0, 0], '44': [0, 0, 0, 0], '45': [0, 0, 0, 0], '46': [0, 0, 0, 0], '47': [0, 0, 0, 0], '48': [0, 0, 0, 0], '49': [0, 0, 0, 0], '50': [0, 0, 0, 0], '51': [0, 0, 0, 0], '52': [0, 0, 0, 0], '53': [0, 0, 0, 0], '54': [0, 0, 0, 0], '55': [0, 0, 0, 0], '56': [0, 0, 0, 0], '57': [0, 0, 0, 0], '58': [0, 0, 0, 0], '59': [0, 0, 0, 0], '60': [0, 0, 0, 0], '61': [0, 0, 0, 0]}

var CandidateVotes = [0, 0]

d3.json('https://raw.githubusercontent.com/singerep/data/main/gz_2010_us_040_00_500k.json').then(
	(data, error) => {
		if(error){
			console.log(error)
		}
		else{
            stateData = data
			d3.json('https://raw.githubusercontent.com/singerep/choose-counties-simulator/main/county-votes-demos.json').then(
				(data, error) => {
					if(error){
						console.log(error)
					}
					else{
						votingData = data
						for (var i=0; i < votingData.length; i++) {
							if (WhiteMin < 100*votingData[i].White && 100*votingData[i].White < WhiteMax &&
								BlackMin < 100*votingData[i].Black && 100*votingData[i].Black < BlackMax &&
								LatinoMin < 100*votingData[i].Latino && 100*votingData[i].Latino < LatinoMax &&
								BachMin < 100*votingData[i].Bachelors && 100*votingData[i].Bachelors < BachMax &&
								PovMin < 100*votingData[i].Poverty && 100*votingData[i].Poverty < PovMax &&
								MHIMin < votingData[i].MHI && votingData[i].MHI < MHIMax &&
								LaborMin < 100*votingData[i].Employed && 100*votingData[i].Employed < LaborMax &&
								HealthMin < 100*votingData[i].Health && 100*votingData[i].Health < HealthMax) {
								
                                StateResults[votingData[i].State][0] += votingData[i].Votes
                                StateResults[votingData[i].State][1] += votingData[i].Biden
								StateResults[votingData[i].State][2] += votingData[i].Trump
								StateResults[votingData[i].State][3] += 1

                                if (votingData[i].District == 'ME-01') {
                                    StateResults["57"][0] += votingData[i].Votes
                                    StateResults["57"][1] += votingData[i].Biden
									StateResults["57"][2] += votingData[i].Trump
									StateResults["57"][3] += 1
                                }
                                else if (votingData[i].District == 'ME-02') {
                                    StateResults["58"][0] += votingData[i].Votes
                                    StateResults["58"][1] += votingData[i].Biden
									StateResults["58"][2] += votingData[i].Trump
									StateResults["58"][3] += 1
                                }
                                else if (votingData[i].District == 'NE-01') {
                                    StateResults["59"][0] += votingData[i].Votes
                                    StateResults["59"][1] += votingData[i].Biden
									StateResults["59"][2] += votingData[i].Trump
									StateResults["59"][3] += 1
                                }
                                else if (votingData[i].District == 'NE-02') {
                                    StateResults["60"][0] += votingData[i].Votes
                                    StateResults["60"][1] += votingData[i].Biden
									StateResults["60"][2] += votingData[i].Trump
									StateResults["60"][3] += 1
                                }
                                else if (votingData[i].District == 'NE-03') {
                                    StateResults["61"][0] += votingData[i].Votes
                                    StateResults["61"][1] += votingData[i].Biden
									StateResults["61"][2] += votingData[i].Trump
									StateResults["61"][3] += 1
                                }
                            }
						}
						d3.json('https://raw.githubusercontent.com/singerep/data/main/state-ev.json').then(
							(data, error) => {
								if (error) {
									console.log(error)
								}
								else {
									evData = data
									for (state in StateResults) {
										if (+state in evData) {
											if (StateResults[state][1] > StateResults[state][2]) {
												CandidateVotes[0] += +evData[+state]["VOTES"]
											}
											else if (StateResults[state][1] < StateResults[state][2]){
												CandidateVotes[1] += +evData[+state]["VOTES"]
											}
										}
										for (var j=0; j < stateData.features.length; j++) {
											var stateDataID = stateData.features[j].properties.STATE
											if (stateDataID == state) {
												stateData.features[j].properties.Biden = StateResults[state][1]/StateResults[state][0]
												stateData.features[j].properties.Trump = StateResults[state][2]/StateResults[state][0]
												stateData.features[j].properties.NumCounties = StateResults[state][3]
											}
										}
									}
									drawMap()
									document.getElementById("biden-votes").innerHTML = CandidateVotes[0];
									document.getElementById("trump-votes").innerHTML = CandidateVotes[1];
								}
							}
						)
						console.log(CandidateVotes)
					}
				}
			)
		}
	}
)

let drawMap = () => {
	svg.selectAll("g")
	.data(stateData.features)
	.enter()
	.append("path")
  	.attr("d", path)
	.style("stroke", "white")
  	.style("stroke-width", ".25")
  	.style("fill", function(d) {
		// Get data value
		var value = 100*d.properties.Biden - 100*d.properties.Trump;

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

	if (d.properties.NAME) {

	var parent = document.getElementById("tooltip");
	var child = document.getElementById("no-data");

	if (child) {
		parent.removeChild(child);
	}
	
	/* Add or replace top text */
	var NewParaTopText = document.createElement("p");
	NewParaTopText.setAttribute("id", "top-text");
	NewParaTopText.setAttribute("class", "tooltip-text");
	var NewNodeTopText = document.createTextNode("Biden: " + good_round(100*d.properties.Biden, 2) + ', Trump: ' + good_round(100*d.properties.Trump, 1));
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
	var NewNodeCounty = document.createTextNode(d.properties.NAME + ' has ' + d.properties.NumCounties + ' counties that meet your criteria.');
	NewParaCounty.appendChild(NewNodeCounty);
	var element = document.getElementById("tooltip");
	var OldParaCounty = document.getElementById("county-name");
	if (OldParaCounty){
		element.replaceChild(NewParaCounty, OldParaCounty)
	}
	else {
		element.appendChild(NewParaCounty);
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

}