import React, {Component} from 'react';
import PropTypes from "prop-types";

import "./Index.css";

export default class Index extends Component {
    render() {
        return (
            <div className="row justify-content-around main">
                <div className="col-md-6 main-visualization center-items">
                    <h1>Nextbus Analyzer</h1>
                </div>
                <div className="col-md-6 main-interactions center-items">
                    <div className="col-m-12 interactions-content">
                        <h1 className="slogan">
                            Visualize your routes
                        </h1>
                        <div className="col-md-12">
                            <h3 className="invitation">
                                Be part of Nextbus Analyzer.
                            </h3>
                        </div>
                        <div className="col-md-12 sign-up-button-container">
                            <button className="btn sign-up-button col-md-12 btn-signup" onClick={this.props.goToSignUp}>
                                Sign Up
                            </button>
                        </div>
                        <div className="col-md-12 login-button-container">
                            <button className="btn login-button col-md-12 btn-login" onClick={this.props.goToLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    goToSignUp: PropTypes.func.isRequired,
    goToLogin: PropTypes.func.isRequired,
};