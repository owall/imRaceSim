HTMLWidgets.widget({

    name: 'imRaceSim',

    type: 'output',

    factory: function(el, width, height) {

        var el = el;
        var force = d3.forceSimulation();
        var margin = {top: 20, right: 5, bottom: 20, left: 60};
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

                    athletes.attr("cx", 0);

                    swimPortion = athletes.transition()
                        .attr("cx", xa(endOfSwim))
                        .ease(d3.easeLinear)
                        .duration(function(d) {
                            return d.swim * speedUp;
                        }).transition()
                        .attr("cx", xa(endOfT1))
                        .ease(d3.easeLinear)
                        .duration(function(d) {
                            return d.t1 * speedUp;
                        }).transition()
                        .attr("cx", xa(endOfBike))
                        .ease(d3.easeLinear)
                        .duration(function(d) {
                            return d.bike * speedUp;
                        }).transition()
                        .attr("cx", xa(endOfT2))
                        .ease(d3.easeLinear)
                        .duration(function(d) {
                            return d.t2 * speedUp;
                        }).transition()
                        .attr("cx", xa(endOfRun))
                        .ease(d3.easeLinear)
                        .duration(function(d) {
                            return d.run * speedUp;
                        });
                }

                function waveColors() {
                    var color = d3.scaleOrdinal(d3.schemeCategory20);
                    athletes.style("fill", function(d) {
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


                function setIndividualAthletes() {

                    //console.log("in setIndividualAthletes num = " + x.indivdual);

                    //list of objects
                    var ia_list = x.indivdual;
                    if (!!ia_list) {
                      var individualAthlete = athletes.filter(function(a) {
                        //if a in ia_list
                      for (var i = 0; i < ia_list.length; i++) {
                        //console.log(ia_list[i].name);
                        if (ia_list[i].name == a.name)
                          return a;
                        }

                      });

                      individualAthlete.attr("id", "individualAthlete")
                        .style('fill', d3.rgb("#FF5050"))
                        .style('stroke', d3.rgb("#333"))
                        .attr('r', 10);
                    }

                }

                //start of actual function

                console.log("in Java script function = " + width + " height = " + height);

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
                    .domain([0, endOfRun])
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
                    .data(x.data)
                    .enter().append("circle")
                    .attr("class", "dot")
                    .attr("r", 2.5)
                    .attr("cx", 0)
                    .attr("cy", function(d) {
                        return ya(d.order);
                    })
                    .style('stroke', d3.rgb("#333"));


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
                    .attr("y", height/2)
                    .style("text-anchor", "middle")
                    .text("Swim 3.9km");
                race.append("text")
                    .attr("class", "plotLabel")
                    .attr("x", xa(endOfT1))
                    .attr("y", height)
                    .style("text-anchor", "middle")
                    .text("T-1");
                race.append("text")
                    .attr("class", "plotLabel")
                    .attr("x", xa(endOfSwim + (bikeDistance / 2)))
                    .attr("y", height/2)
                    .style("text-anchor", "middle")
                    .text("Bike 180km");
                race.append("text")
                    .attr("class", "plotLabel")
                    .attr("x", xa(endOfT2))
                    .attr("y", height)
                    .style("x", "middle")
                    .text("T-2");
                race.append("text")
                    .attr("class", "plotlabel")
                    .attr("x", xa(endOfBike + (runDistance / 2)))
                    .attr("y", height/2)
                    .style("text-anchor", "middle")
                    .text("Run 42.2km");
                race.append("text")
                    .attr("class", "plotlabel")
                    .attr("x", xa(endOfRun))
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
                race.append("line")
                    .attr("x1", xa(endOfT1))
                    .attr("y1", 0)
                    .attr("x2", xa(endOfT1))
                    .attr("y2", height)
                    .attr("stroke-width", 0.5)
                    .attr("stroke", "gray")
                    .style("stroke-dasharray", ("3,3"));
                race.append("line")
                    .attr("x1", xa(endOfBike))
                    .attr("y1", 0)
                    .attr("x2", xa(endOfBike))
                    .attr("y2", height)
                    .attr("stroke-width", 0.5)
                    .attr("stroke", "gray")
                    .style("stroke-dasharray", ("3,3"));
                race.append("line")
                    .attr("x1", xa(endOfT2))
                    .attr("y1", 0)
                    .attr("x2", xa(endOfT2))
                    .attr("y2", height)
                    .attr("stroke-width", 0.5)
                    .attr("stroke", "gray")
                    .style("stroke-dasharray", ("3,3"));
                race.append("line")
                    .attr("x1", xa(endOfRun))
                    .attr("y1", 0)
                    .attr("x2", xa(endOfRun))
                    .attr("y2", height)
                    .attr("stroke-width", 0.5)
                    .attr("stroke", "gray")
                    .style("stroke-dasharray", ("3,3"));

                waveColors();
                setIndividualAthletes();
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
