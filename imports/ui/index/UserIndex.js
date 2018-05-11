import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import TimeChart from '../visualization/TimeChart.js';

import "./UserIndex.css";

export default class UserIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedAgency: ""
        };
        this.fetchRoutes = this.fetchRoutes.bind(this);
        this.handleAgencySelection = this.handleAgencySelection.bind(this);
        this.data = this.props.getData();
    }

    fetchRoutes(agencyName) {
        let tag = null;
        this.state.data.forEach((d) => {
            if (d.title === this.state.selected) tag = d.tag;
        });
        if (tag) Meteor.call('buses.getRoutesByAgency', this.state.selectedAgency);
        else throw new Error();
    }

    handleAgencySelection(e) {
        this.setState({selectedAgency: e.target.value});
    }

    render() {
        return (
            <div className="row justify-content-around">
                <h1 className="col-12">THE BOILERPLATE</h1>
                <div className="col-md-6 col-12">
                    <TimeChart data={this.data}/>
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