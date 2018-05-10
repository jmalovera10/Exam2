import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import BarChart from "./visualization/BarChart.js";

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[
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
            ]
        };
    }

    render() {
        return (
            <div>
                <h1>Exam 2</h1>
                <BarChart data={this.state.data}/>
            </div>
        );
    }
}

export default withTracker(() => {
    if(Meteor.user()) {
        /*Meteor.subscribe('tones');
        let all = Tones.find().fetch();
        console.log(all);

        return {
            currentUser: Meteor.user(),
            tones: all,
        }*/
        console.log("hola");
    }
    else{
        return{tones:[]}
    }
})(App);