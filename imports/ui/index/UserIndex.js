import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import TimeChart from '../visualization/TimeChart.js';

import "./UserIndex.css";

export default class UserIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAgency: ""
        };
        this.fetchRoutes = this.fetchRoutes.bind(this);
        this.handleAgencySelection = this.handleAgencySelection.bind(this);
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
        let agenciesOptions = [];
        if(this.props.agencies) {
            this.props.agencies.forEach((a) => {
                agenciesOptions.push(<option key={a.title}>{a.title}</option>)
            });
        }
        return (
            <div className="row justify-content-around">
                <div className="col-md-9 col-12">
                    <TimeChart data={this.props.data}/>
                </div>
                <div className="col-md-3 col-12">
                    <form onSubmit={this.fetchRoutes}>
                        <div className="form-group">
                            <label htmlFor="sel1">Select an Agency:</label>
                            <select className="form-control" id="sel1" onChange={this.handleAgencySelection.bind(this)}>
                                <option key={"0"}></option>
                                {agenciesOptions}
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