// ==========Import csv data related to age and smoking =======================
// POTATO - if errors occur then move this section of code down.
d3.csv("assets/data/data.csv").then(function(CensusData) {
    CensusData.forEach(function(data) { //data could be "d"
      data.obesity = +data.obesity;  //assign whatever data type is in data.obesity back as an integer (that's what the + does)  | in other words cast the data into another type
      data.smokes = +data.smokes;
      console.log(data);
 }); // ends THEn call (put a note of what you are ending - helps keep track)

//============Set up chart area =====================


// SVG Container - Way to calculate margins and chart height/width using variables
// Potato - can any of this be hardcoded to var svg below to simplify code?
var svgHeight = 800;
var svgWidth = 900;

var margin = {
  top: 20,
  bottom: 60,
  left: 40,
  right: 20,
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;


//==== Create an SVG wrapper so chart can be dynamically resized,append an SVG group that will hold chart and set margins=====
var svg = d3
  .select("#scatter")  // divID "scatter" in HTML to place chart
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)
  .classed("stateCircle", true)
  .attr("opacity", 0.75)
  .attr("stroke-width", "2");

  var chartGroup = svg.append("g") // use g (group) element to group shapes; must use "transform, translate" with "g" to support x/y axis attribute such as margins
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


  // ========= Create Scales ====================
  // Exercise 16/2/4 on 4/1 and 16/2/5 on 4/3
  // d, i = data and index
  //POTATO - changed "const" to "var" to play around with it
  var xScale = d3.scaleLinear() //scaleLinear = for obesity column
    .domain(d3.extent(CensusData, d => d.obesity)) // use d3.extend to return min and max range of data.obesity
    .range([0, width])
    .nice(); // rounds axis values

  var yScale = d3.scaleLinear() //scaleLinear = for smokes column
    //POTATO why are both scaleLinear and one not scaleBand? exercise 16/2/6; maybe because we haven't created axes yet of  - assign 16/2/6
    //var yAxis = d3.axisLeft(yScale);
    //var xAxis = d3.axisBottom(xScale);
    .domain(d3.extent(CensusData, d => d.smokes))
    //.domain([6,d3.max(CensusData, d => d.smokes)]) // use d3.max to return max range of data.smokes
    .range([height, 0])
    .nice(); // rounds axis values
  

//=======Generate scatter plot=========
    chartGroup.selectAll("circle")
    .data(CensusData)
    .enter()
    .append("circle")
    .attr("cx", d=>xScale(d.obesity)) // Replaces data with data.obesity on xScale
    .attr("cy", d=>yScale(d.smokes)) // Replaces data with data.smokes on yScale
    .attr("r", "18")
    .style("fill", "#164270")

  //========Create Axes=========================
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);


//=======Append axes to the chartGroup==========
  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
  chartGroup.append("g").call(yAxis);

//=======Add labels to datapoints=========
chartGroup.append("g")
  .selectAll("text")
  .data(CensusData)
  .enter()
  .append("text")
  .text(d=>d.abbr) // Changes full state name to state abbreviation
  .attr("x",d=>xScale(d.obesity))
  .attr("y",d=>yScale(d.smokes))
  .classed(".stateText", true)
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "central"); // centers State in circles
  
  //============add axes titles=========
  chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 10})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")

//        .style("font-weight", "bold")
        .text("Population % Obesity");

        chartGroup.append("text")
        .attr("y", 0 - ((margin.left / 2) + 2))
        .attr("x", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
//        .style("font-weight", "bold")
        .attr("transform", "rotate(-90)")
        .text("Smokers (%)");

  
});

