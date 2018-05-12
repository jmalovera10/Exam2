import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import Index from "./index/Index.js";
import UserIndex from "./index/UserIndex.js";
import AuthManager from "./authentication/AuthManager.js";
import NavbarUser from "./navbar/NavbarUser.js";
import AuthNavbar from "./navbar/AuthNavbar.js";
import {Buses} from "../api/nextbus.js";
import {UserHistory} from "../api/userHistory";

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "index",
            userLocation: "index"
        };

        this.goToIndex = this.goToIndex.bind(this);
        this.goToIndexUser = this.goToIndexUser.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
    }

    goToIndex() {
        this.setState({location: "index"});
    }

    goToIndexUser() {
        this.setState({userLocation: "index"});
    }

    goToSignUp() {
        this.setState({location: "SignUp"});
    }

    goToLogin() {
        this.setState({location: "Login"});
    }

    handleLogoutSubmit() {
        Meteor.logout();
    }

    render() {
        return (
            <div className="app-content">
                {
                    this.props.currentUser ?
                        <NavbarUser onLogoutCallback={this.handleLogoutSubmit}/>
                        : this.state.location !== "index" ? <AuthNavbar goToIndex={this.goToIndex}/> : null
                }
                {
                    (this.props.currentUser ?
                        <UserIndex history={this.props.history}
                        />
                        : (this.state.location === "index" ?
                            <Index goToSignUp={this.goToSignUp} goToLogin={this.goToLogin}/>
                            : <AuthManager isLogin={this.state.location !== "SignUp"} typeAuth={this.state.location}/>))

                }
            </div>
        );
    }
}

export default withTracker(() => {
    if (Meteor.user()) {
        Meteor.subscribe('userHistory');
        let history = UserHistory.find().fetch();
        return {
            currentUser: Meteor.user(),
            history:history
        };
    }
    else {
        return {
            currentUser: null,
        };
    }
})(App);