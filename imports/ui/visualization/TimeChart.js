import React, {Component} from "react";
import * as d3 from "d3";

import "./TimeChart.css";

export default class TimeChart extends Component {
    constructor(props) {
        super(props);
        this.margin = ({top: 20, right: 30, bottom: 30, left: 150});
    }

    componentDidMount() {
        let selectedRoute = this.props.data;
        let buses = () => {
            let bus = [];
            for (let bus of selectedRoute.tr) {
                let route = bus.stop.filter((d) => d.content !== "--");
                route.forEach((d) => d.date = new Date(+d.epochTime));
                bus.push(route);
            }

            return bus;
        };
        console.log(buses);
        const height = 600;
        const svg = d3.select(this.svg);
        const minDate = d3.min(buses[1], d => d.date);
        const maxDate = new Date(minDate.getTime() + 22 * 60 * 60 * 1000); // minDate + 24 hours
        const x = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([this.margin.left, width - this.margin.right]);
        const y = d3.scaleBand()
            .domain(d3.range(buses[1].length))
            .rangeRound([height - this.margin.bottom, this.margin.top]);

        const xAxis = g => g
            .attr("transform", `translate(0,${height - this.margin.bottom})`)
            .call(d3.axisBottom(x))
        // .call(g => g.select(".domain").remove());
        const yAxis = g => g
            .attr("transform", `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(y)
                .tickFormat((d) => selectedRoute.header.stop[d].content));

        const line = d3.line()
            .x(d => x(d.date))
            .y((d, i) => y(i) + y.bandwidth() / 2);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.selectAll(".routes")
            .data(buses)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);
        return svg.node();
    }

    render() {
        return (
            <svg width={800}
                 height={600}
                 ref={(svg) => this.svg = svg}
            ></svg>
        );
    }
}