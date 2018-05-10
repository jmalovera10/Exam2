import React, {Component} from "react";
import * as d3 from "d3";

import "./BarChart.css";

export default class BarChart extends Component {

    constructor(props) {
        super(props);
        this.margin = {top: 20, right: 20, bottom: 30, left: 40};
        this.state = {};
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        const svg = d3.select(this.svg);

        this.width = +svg.attr("width") - this.margin.left - this.margin.right;
        this.height = +svg.attr("height") - this.margin.top - this.margin.bottom;

        this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
        this.y = d3.scaleLinear().rangeRound([this.height, 0]);

        this.g = svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.update();
    }

    update() {
        data = this.props.data;
        if (!data) return;
        console.log(data);

        this.x.domain(data.map(function (d) {
            return d.letter;
        }));
        this.y.domain([0, d3.max(data, function (d) {
            return d.frequency;
        })]);

        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x));

        this.g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(this.y).ticks(10, "%"))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");

        this.g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d) => {
                return this.x(d.letter);
            })
            .attr("y", (d) => {
                return this.y(d.frequency);
            })
            .attr("width", this.x.bandwidth())
            .attr("height", (d) => {
                return this.height - this.y(d.frequency);
            });
    }

    render() {
        return (
            <div>
                <h2>This is a Barchart</h2>
                <svg width={800}
                     height={400}
                     ref={(svg) => this.svg = svg}
                ></svg>
            </div>
        );
    }
}