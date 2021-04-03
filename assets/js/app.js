//----- Import csv Data -----
// Notes: +data reassigns data type in csv data.obesity back as an integer
d3.csv("assets/data/data.csv").then(function(CensusData) {
    CensusData.forEach(function(data) { 
          data.obesity = +data.obesity;
          data.smokes = +data.smokes;
    console.log(data);
 });

//----- Set Up Chart Area Using SVG Container -----
// Notes: Use variables to calculate margins and chart height/width

var svgHeight = 700;
var svgWidth = 900;

var margin = {
  top: 20,
  bottom: 60,
  left: 40,
  right: 10,
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;


//----- Create a SVG "wrapper" -----
// Notes: Allows chart to be dynamically resized
var svg = d3
    .select("#scatter")  // divID "scatter" in HTML to place chart
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .classed("stateCircle", true)
    .attr("opacity", 0.75);



// Notes: use "g" (group) element to group shapes; must use "transform, translate" with "g" to support x/y axis attribute such as margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


//----- Create Scales -----
// Notes:  d, i = data and index | scaleLinear = for obesity and smokes columns
var xScale = d3.scaleLinear() 
    .domain(d3.extent(CensusData, d => d.obesity)) // use d3.extend to return min and max range of data.obesity
    .range([0, width])
    .nice(); // rounds axis values

var yScale = d3.scaleLinear()
    .domain(d3.extent(CensusData, d => d.smokes))
    //.domain([6,d3.max(CensusData, d => d.smokes)]) // use d3.max to return max range of data.smokes
    .range([height, 0])
    .nice(); // rounds axis values
  

//----- Create Scatter Plot -----
chartGroup.selectAll("circle")
    .data(CensusData)
    .enter()
    .append("circle")
        .attr("cx", d=>xScale(d.obesity)) // Replaces data with data.obesity on xScale
        .attr("cy", d=>yScale(d.smokes)) // Replaces data with data.smokes on yScale
        .attr("r", "15")
        //.style("fill", "#164270") //to change circle colors
        .attr("opacity", ".75");


//----- Create Axes -----
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);


//----- Add Axes to chartGroup ("g") -----
// Notes: transform moves axis to the bottom of the visualization
chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
chartGroup.append("g").call(yAxis);


//----- Add Labels to Datapoints -----
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
        .attr("font-size", "14px")
        .attr("alignment-baseline", "central"); // centers State in circles
  
        
//----- Add Axes Titles -----
  chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 10})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .text("Population % Obesity");


        
  chartGroup.append("text")
        .attr("y", 0 - ((margin.left / 2) + 2))
        .attr("x", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("dy", "1em")
        .text("Smokers (%)")
        .attr("transform", "rotate(-90)");

 

});

