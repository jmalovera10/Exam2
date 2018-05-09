import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import BarChart from "./visualization/BarChart.js";

import "./App.css";

class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Exam 2</h1>
                <BarChart/>
            </div>
        );
    }
}

export default withTracker(() => {
    /*if(Meteor.user()) {
        Meteor.subscribe('tones');
        let all = Tones.find().fetch();
        console.log(all);

        return {
            currentUser: Meteor.user(),
            tones: all,
        }
    }
    else{
        return{tones:[]}
    }*/
})(App);