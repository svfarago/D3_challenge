//============Set up chart area =====================

var margin = {
  top: 20,
  bottom: 60,
  left: 20,
  right: 20,
};

// Way to calculate margins and chart height/width using variables
// Potato - can any of this be hardcoded to var svg below to simplify code?
var svgHeight = 600;
var svgWidth = 800;

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;


// ====Create an SVG wrapper so chart can be dynamically resized,append an SVG group that will hold chart and set margins=====
var svg = d3
  .select("#scatter")  // divID "scatter" in HTML to place chart
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  var chartGroup = svg.append("g") // use g element to group shapes; must use "transform, translate" with "g" to support x/y axis attribute such as margins
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// ==========Import csv data related to age and smoking =======================
d3.csv("assets/data/data.csv").then(function(CensusData) {
  CensusData.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
    console.log(data);
  });

  // ==============Create Scales====================
  // Exercise 16/2/4 on 4/1
  // d, i = data and index
  const xScale = d3.scaleLinear()
    .domain(d3.extent(CensusData, d => d.age)) // use d3.extend to return min and max range of data.age
    .range([0, width])
    .nice(); // rounds values

  const yScale = d3.scaleLinear()
    .domain(d3.extent(CensusData, d => d.smokes))
    //.domain([6,d3.max(CensusData, d => d.smokes)]) // use d3.max to return max range of data.smokes
    .range([height, 0])
    .nice(); // rounds values
  

//============Generate scatter plot=========
chartGroup.selectAll("circle")
.data(CensusData)
.enter()
.append("circle")
.attr("cx", d=>xScale(d.age)) // Replace data with data.age on xScale
.attr("cy", d=>yScale(d.smokes)) // Replace data with data.smokes on yScale
.attr("r", "15")



//}).catch(function(error) {
//  console.log(error);
});





// This code snippet might be useful later - embed in Axes labels
    // Create tooltip in the chart
    //chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
    //circlesGroup.on("mouseover", function(data) {
    //  toolTip.show(data, this);
   // })
      // onmouseout event
    //  .on("mouseout", function(data, index) {
    //    toolTip.hide(data);
    //  });