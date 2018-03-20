HTMLWidgets.widget({

    name: 'imSwimSim',

    type: 'output',

    factory: function(el, width, height) {

        var el = el;
        var force = d3.forceSimulation();
        var margin = {
            top: 20,
            right: 5,
            bottom: 20,
            left: 60
        };
        var race = d3.select(el).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        return {

            renderValue: function(x) {

                function raceAnimation() {

                    var toMilliSecs = 1000;
                    var speedUp = toMilliSecs / 600;

                    speedUp = speedUp * 4;

                    circles.attr("cx", 0);

                    swimPortion = circles.transition()
                        .attr("cx", xa(endOfSwim))
                        .ease(d3.easeLinear)
                        .duration(function(d) {
                            return d.swim * speedUp;
                        }).transition();
                }

                function waveColors() {
                    var color = d3.scaleOrdinal(d3.schemeCategory20);
                    circles.style("fill", function(d) {
                        switch (d.division) {
                            case 'Pro':
                                return color(1);
                            case '70-74':
                                return color(2);
                            case '65-69':
                                return color(3);
                            case '60-64':
                                return color(4);
                            case '55-59':
                                return color(5);
                            case '50-54':
                                return color(6);
                            case '45-49':
                                return color(7);
                            case '40-44':
                                return color(8);
                            case '35-39':
                                return color(9);
                            case '30-35':
                                return color(10);
                            case '25-29':
                                return color(11);
                            case '20-25':
                                return color(12);
                            default:
                                return d3.rgb("#888");
                        }
                    });
                }

                function isIndividualAthlete(name) {
                  var ia_list = x.indivdual;
                  if (!!ia_list) {
                    for (var i = 0; i < ia_list.length; i++) {
                      //console.log(ia_list[i].name);
                      if (ia_list[i].name == name) {
                          return true;
                      }
                    }
                  }
                  return false;
                }

                //start of actual function

                var swimDistance = 3.86;
                var t1Distance = 1;
                var bikeDistance = 180.25;
                var t2Distance = 1;
                var runDistance = 42.2;

                var endOfSwim = swimDistance;
                var endOfT1 = swimDistance + t1Distance;
                var endOfBike = endOfT1 + bikeDistance;
                var endOfT2 = endOfBike + t2Distance;
                var endOfRun = endOfT2 + runDistance;

                //create a scale for the x axis relative to the width
                var xa = d3.scaleLinear()
                    .domain([0, endOfSwim])
                    .range([0, width]);

                //create a scale for the y axis relatie to the height
                var ya = d3.scaleLinear()
                    .domain([0, x.data.length])
                    .range([0, height]);

                //set the scale of the x axis
                var xAxis = d3.axisBottom(xa);

                //set the scale of the y axis
                var yAxis = d3.axisLeft(ya);


                //remove any excisting data for svg
                race.selectAll("*").remove();

                var athletes = race.selectAll(".dot")
                    .data(x.data).enter().append('g');

                var circles = athletes.append("circle")
                    .attr("class", "dot")
                    .attr("r", function(d) {return (isIndividualAthlete(d.name) ? 10:2.5)} )
                    .attr("cx", 0)
                    .attr("cy", function(d) {
                        return ya(d.order);
                    })
                    .style('stroke', d3.rgb("#333"));

                var texts = athletes.append('text')
                    .attr("class", "label")
                    .attr("transform", function(d) {
                      return "translate(" + 0 + "," + ya(d.order) + ")";
                    })
                    .text(function (d) {return d.name})
                    //.style("visibility", "hidden")
                    .style("visibility", function(d) {return (isIndividualAthlete(d.name) ? "visible":"hidden")});

                //create the plot

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

                //Name each section
                race.append("text")
                    .attr("class", "plotlabel")
                    .attr("x", 0).attr("y", height)
                    .style("text-anchor", "end")
                    .text("Start");
                race.append("text")
                    .attr("class", "plotLabel")
                    .attr("x", xa(endOfSwim / 2))
                    .attr("y", height / 2)
                    .style("text-anchor", "middle")
                    .text("Swim 3.9km");
                race.append("text")
                    .attr("class", "plotlabel")
                    .attr("x", xa(endOfSwim))
                    .attr("y", height)
                    .style("text-anchor", "end")
                    .text("Finish");

                //Lines
                race.append("line")
                    .attr("x1", xa(endOfSwim))
                    .attr("y1", 0)
                    .attr("x2", xa(endOfSwim))
                    .attr("y2", height)
                    .attr("stroke-width", 0.5)
                    .attr("stroke", "gray")
                    .style("stroke-dasharray", ("3,3"));

                console.log("imSwimSim");
                waveColors();
                raceAnimation();

            },

            resize: function(width, height) {
                //console.log("in Java script function = " + width + " height = " + height);
                d3.select(el).select("svg")
                    .attr("width", width)
                    .attr("height", height);
            }

        };
    }


});
