import React, {Component} from "react";
import * as d3 from "d3";

import "./TimeChart.css";

export default class TimeChart extends Component {
    constructor(props) {
        super(props);
        this.margin = ({top: 20, right: 30, bottom: 30, left: 150});
        this.update = this.update.bind(this);
    }

    parseData(selectedRoute){
        let buses = [];
        for (let bus of selectedRoute.tr) {
            let route = bus.stop.filter((d) => d.content !== "--");
            route.forEach((d) => d.date = new Date(+d.epochTime));
            buses.push(route);
        }

        return buses;
    }

    componentWillUpdate(props){
        this.update(props.data);
    }

    componentDidMount() {
        this.height = 500;
        this.width = 900;
        this.svgC = d3.select(this.svg);
        this.x = d3.scaleTime()
            .range([this.margin.left, this.width - this.margin.right]);
        this.y = d3.scaleBand()
            .rangeRound([this.height - this.margin.bottom, this.margin.top]);

        this.svgC.append("g").attr("class","xAxis");
        this.svgC.append("g").attr("class","yAxis");

        this.update();
        //return svg.node();
    }

    update(data){
        let selectedRoute = this.props.data.length>0?this.props.data:data?data:[];
        console.log(selectedRoute);
        if(!selectedRoute || selectedRoute.length===0)return;
        let buses = this.parseData(selectedRoute);

        let minDate = d3.min(buses[1], (d) => d.date);
        let maxDate = new Date(minDate.getTime() + 22 * 60 * 60 * 1000); // minDate + 24 hours

        this.x.domain([minDate, maxDate]);
        this.y.domain(d3.range(buses[1].length));

        const xAxis = g => g
            .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(this.x));
            //.call(g => g.select(".domain").remove());
        const yAxis = g => g
            .attr("transform", `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(this.y)
                .tickFormat((d) => selectedRoute.header.stop[d].content));

        const line = d3.line()
            .x(d => this.x(d.date))
            .y((d, i) => this.y(i) + this.y.bandwidth() / 2);

        this.svgC.select(".xAxis")
            .call(xAxis);

        this.svgC.select(".yAxis")
            .call(yAxis);

        let routes = this.svgC.selectAll(".routes")
            .data(buses);
        let routesEnter = routes.enter();

        routesEnter.append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);

        routes.select("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);

        routes.exit().remove();
    }

    render() {
        return (
            <svg width={900}
                 height={500}
                 ref={(svg) => this.svg = svg}
            ></svg>
        );
    }
}