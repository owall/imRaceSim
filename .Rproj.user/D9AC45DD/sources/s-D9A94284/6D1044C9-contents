HTMLWidgets.widget({

  name: 'imRaceSim',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    var race;
    var force;


    return {

      renderValue: function(x) {

var color = d3.scaleOrdinal()
    .domain(['me (Jimmy)','passed','passed by'])
    .range(['#ff0000', '#BBB', '#000']);

var margin = {top: 20, right: 5, bottom: 100, left: 60};

//create a scale for the x axis relative to the width
var xa = d3.scaleLinear()
    .range([0, width]);

//create a scale for the y axis relatie to the height
var ya = d3.scaleLinear()
    .range([0, height]);

//set the scale of the x axis
var xAxis = d3.axisBottom(xa);

//set the scale of the y axis
var yAxis = d3.axisLeft(ya);

//create the plot
race = d3.select(el).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

force = d3.forceSimulation();

  var divis = 92;
  var t1Marker = 2*(divis-2)/9*width/divis;
  var bikeMarker = (2*(divis-2)/9+1)*width/divis;
  var t2Marker = (6*(divis-2)/9+1)*width/divis;
  var runMarker = (6*(divis-2)/9+2)*width/divis;



  race.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("class", "y axis")
    .attr("y", 16)
    .attr("dy", ".71em")
    .attr("dx", "-0.71em")
    .style("text-anchor", "end")
    .text("place");

//-- add marker for start
  race.append("text")
    .attr("class", "markerLabel")
    .attr("transform", "translate( 3 " + (height+5) + ") rotate(-90)")
    .style("text-anchor", "end")
    .text("Start");

  //-- text label for swim
  race.append("text")
    .attr("class", "markerLabel")
    .attr("transform", "translate(" + t1Marker/2 + " " + (height+12) + ")")
    .style("text-anchor", "middle")
    .text("Swim 3.9km");

  //-- add marker for t-1
  race.append("line")
    .attr("x1",t1Marker )
    .attr("y1",0)
    .attr("x2",t1Marker )
    .attr("y2",height)
    .attr("stroke-width", 0.5)
    .attr("stroke", "gray")
    .style("stroke-dasharray", ("3,3"));
  race.append("text")
    .attr("class", "markerLabel")
    .attr("transform", "translate(" + (t1Marker+bikeMarker)/2 + " " + (height+12) + ") rotate(0)")
    .style("text-anchor", "middle")
    .text("T-1");

    //-- add marker for bike
  race.append("line")
    .attr("x1",bikeMarker)
    .attr("y1",0)
    .attr("x2",bikeMarker)
    .attr("y2",height)
    .attr("stroke-width", 0.5)
    .attr("stroke", "gray")
    .style("stroke-dasharray", ("3,3"));
  race.append("text")
    .attr("class", "markerLabel")
    .attr("transform", "translate(" + (bikeMarker+t2Marker)/2 + " " + (height+12) + ") rotate(0)")
    .style("text-anchor", "middle")
    .text("Bike 180km");

    //-- add marker for t-2
  race.append("line")
    .attr("x1", t2Marker)
    .attr("y1",0)
    .attr("x2", t2Marker )
    .attr("y2",height)
    .attr("stroke-width", 0.5)
    .attr("stroke", "gray")
    .style("stroke-dasharray", ("3,3"));
  race.append("text")
    .attr("class", "markerLabel")
    .attr("transform", "translate(" + (t2Marker+runMarker)/2 + " " + (height+12) + ") rotate(0)")
    .style("text-anchor", "middle")
    .text("T-2");

     //-- add marker for run
  race.append("line")
    .attr("x1", runMarker)
    .attr("y1",0)
    .attr("x2", runMarker )
    .attr("y2",height)
    .attr("stroke-width", 0.5)
    .attr("stroke", "gray")
    .style("stroke-dasharray", ("3,3"));
  race.append("text")
    .attr("class", "markerLabel")
    .attr("transform", "translate(" + (runMarker+width)/2 + " " + (height+12) + ") rotate(0)")
    .style("text-anchor", "middle")
    .text("Run 42.2km");

  //-- add marker for finish
  race.append("line")
      .attr("x1",width)
      .attr("y1",0)
      .attr("x2", width )
      .attr("y2",height)
      .attr("stroke-width", 0.5)
      .attr("stroke", "black");
  race.append("text")
      .attr("class", "markerLabel")
      .attr("transform", "translate(" + (width+2) + " " + (height+5) + ") rotate(-90)")
      .style("text-anchor", "end")
      .text("Finish");


  xa.domain(d3.extent(x.data, function(d) {
  	return d.overall;
  })).nice();

  ya.domain(d3.extent(x.data, function(d) {
  	return d.order;
  })).nice();

  var athletes = race.selectAll(".dot")
    .data(x.data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 2.5)
      .attr("cx", 0)
      .attr("cy", function(d) { return ya(d.order); });


  function raceAnimation() {
    var timeMultiplier = 20;
    athletes.attr("cx", 0);
    swimPortion = athletes.transition()
        .attr("cx", t1Marker)
        .duration( function(d) { return xa(d.swim*timeMultiplier); } );
    t1Portion = swimPortion.transition()
        .attr("cx",bikeMarker)
        .duration( function(d) {return xa(d.t1*timeMultiplier); } );
    bikePortion = t1Portion. transition()
        .attr("cx",t2Marker)
        .duration( function(d) {return xa(d.bike*timeMultiplier); } );
    t2Portion = bikePortion.transition()
        .attr("cx",runMarker)
        .duration( function(d) {return xa(d.t2*timeMultiplier); } );
    runPortion = t2Portion.transition()
        .attr("cx",width)
        .duration( function(d) {return xa(d.run*timeMultiplier); } );
  }

  function waveColors() {
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    athletes.style("fill", function(d) {
      switch (d.division) {
        case 'Pro' : return color(1);
        case '70-74': return color(2);
        case '65-69': return color(3);
        case '60-64': return color(4);
        case '55-59': return color(5);
        case '50-54': return color(6);
        case '45-49': return color(7);
        case '40-44': return color(8);
        case '35-39': return color(9);
        case '30-35': return color(10);
        case '25-29': return color(11);
        case '20-25': return color(12);
        default:
          return d3.rgb("#888");
      }
    });
  }


  function setIndividualAthletes() {
    var individualAthlete = athletes.filter( function (a) {if (a.name=="Owen Wallace"){return a}});
    individualAthlete.attr("id", "individualAthlete")
      .style('fill', d3.rgb("#FF5050"))
      .style('stroke', d3.rgb("#333"))
      .attr('r', 5);
  }

  waveColors();
  setIndividualAthletes();
  raceAnimation(); //-- begin animation

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      d3.select(el).select("svg")
        .attr("width", width)
        .attr("height", height);

      force.size([width, height]).resume();
      }

    };
  }


});
