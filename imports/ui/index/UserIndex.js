import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import BarChart from "../visualization/BarChart.js";

import "./UserIndex.css";

export default class UserIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    letter: "A",
                    frequency: .08167
                },
                {
                    letter: "B",
                    frequency: .06167
                },
                {
                    letter: "C",
                    frequency: .01167
                },
                {
                    letter: "D",
                    frequency: .03167
                },
                {
                    letter: "E",
                    frequency: .09167
                },
            ],
            selectedAgency: ""
        };
        this.setState({data: Meteor.call('buses.getAgencyList')});
        this.fetchRoutes = this.fetchRoutes.bind(this);
        this.handleAgencySelection = this.handleAgencySelection.bind(this);
    }

    fetchRoutes(agencyName) {
        let tag = null;
        this.state.data.forEach((d)=>{
            if(d.===this.state.selected)
        });
        Meteor.call('buses.getRoutesByAgency',this.state.selectedAgency);
    }

    handleAgencySelection(e) {
        this.setState({selectedAgency: e.target.value});
    }

    render() {
        return (
            <div className="row justify-content-around">
                <h1>THE BOILERPLATE</h1>
                <div className="col-md-6 col-12">
                    <BarChart data={this.props.data}/>
                </div>
                <div className="col-md-6 col-12">
                    <form onSubmit={this.fetchRoutes}>
                        <div className="form-group">
                            <label htmlFor="sel1">Select an Agency:</label>
                            <select className="form-control" id="sel1" onChange={this.handleAgencySelection.bind(this)}>
                                <option></option>
                                <option>ML</option>
                                <option>W</option>
                                <option>FRANCO</option>
                                <option>CP</option>
                                <option>SD</option>
                            </select>
                        </div>
                        <div className="form-group center-items">
                            <button type="submit"
                                    className="btn auth-button"
                                //disabled={this.props.disableButton}
                                    aria-label="submit button">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}