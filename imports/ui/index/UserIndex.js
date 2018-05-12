import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import TimeChart from '../visualization/TimeChart.js';
import History from '../interactions/History.js';

import "./UserIndex.css";

export default class UserIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAgency: "",
            selectedRoute: "",
            agencies: [],
            routes: [],
            data: [],
            comments: [],
            history: []
        };
        this.addAgencies = this.addAgencies.bind(this);
        this.addRoutes = this.addRoutes.bind(this);
        this.addTimeStops = this.addTimeStops.bind(this);
        this.fetchRoutes = this.fetchRoutes.bind(this);
        this.fetchTimeStops = this.fetchTimeStops.bind(this);
        this.handleAgencySelection = this.handleAgencySelection.bind(this);
    }

    componentDidMount() {
        if (this.state.agencies.length === 0) {
            Meteor.call('buses.getAgencyList', (error, result) => {
                if (error) console.log(error);
                else this.addAgencies(result);
            });
        }
    }

    addAgencies(agencies) {
        this.setState({agencies: agencies});
    }

    addRoutes(routes) {
        this.setState({routes: routes});
    }

    addTimeStops(data) {
        this.setState({data: data});
    }

    fetchRoutes() {
        let tag = null;
        if (this.state.selectedAgency !== "") {
            this.state.agencies.forEach((d) => {
                if (d.title === this.state.selectedAgency) {
                    tag = d.tag;
                    return;
                }
            });
            if (tag) Meteor.call('buses.getRoutesByAgency', tag, (error, result) => {
                if (error) console.log(error);
                else this.addRoutes(result);
            });
            else throw new Error();
        }
    }

    fetchTimeStops() {
        let agencyTag = null;
        let routeTag = null;
        if (this.state.selectedAgency !== "" && this.state.selectedRoute !== "") {
            this.state.agencies.forEach((d) => {
                if (d.title === this.state.selectedAgency) {
                    agencyTag = d.tag;
                    return;
                }
            });
            this.state.routes.forEach((d) => {
                if (d.title === this.state.selectedRoute) {
                    routeTag = d.tag;
                    return;
                }
            });
            if (agencyTag && routeTag) Meteor.call('buses.getTimeStops', agencyTag, routeTag,
                (error, result) => {
                    if (error) console.log(error);
                    else this.addTimeStops(result);
                });
            else throw new Error();
        }
    }

    handleAgencySelection(e) {
        let val = e.target.value;
        this.setState({selectedAgency: val}, () => {
            this.fetchRoutes();
        });
    }

    handleRouteSelection(e) {
        let val = e.target.value;
        this.setState({selectedRoute: val}, () => {
            this.fetchTimeStops();
        });
    }

    render() {
        let agenciesOptions = [];
        if (this.state.agencies.length > 0) {
            let i = 1;
            this.state.agencies.forEach((a) => {
                agenciesOptions.push(<option key={i}>{a.title}</option>);
                i++;
            });
        }
        let routesOptions = [];
        if (this.state.routes.length > 0) {
            this.state.routes.forEach((r) => {
                routesOptions.push(<option key={r.title}>{r.title}</option>)
            });
        }
        return (
            <div className="row justify-content-around">
                <div className="col-md-9 col-12">
                    <TimeChart data={this.state.data}/>
                </div>
                <div className="col-md-3 col-12">
                    <div className="row">
                        <form onSubmit={this.fetchRoutes}>
                            <div className="form-group">
                                <label htmlFor="sel1">Select an Agency:</label>
                                <select className="form-control" id="sel1"
                                        onChange={this.handleAgencySelection.bind(this)}>
                                    <option key={0}></option>
                                    {agenciesOptions}
                                </select>
                            </div>
                            {
                                this.state.selectedAgency !== "" ? <div className="form-group">
                                    <label htmlFor="sel1">Select a Route:</label>
                                    <select className="form-control" id="sel1"
                                            onChange={this.handleRouteSelection.bind(this)}>
                                        <option key={0}></option>
                                        {routesOptions}
                                    </select>
                                </div> : null
                            }
                        </form>
                    </div>
                    <div className="row">
                        <History data={this.props.history}/>
                    </div>
                </div>
            </div>
        );
    }
}