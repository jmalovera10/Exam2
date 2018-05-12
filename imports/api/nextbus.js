import {Meteor} from "meteor/meteor";
import {HTTP} from "meteor/http";
import {Mongo} from "meteor/mongo";

export const Buses = new Mongo.Collection('buses');

const callService = (type, url, options) => new Promise((resolve, reject) => {
    HTTP.call(type, url, options, (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result);
        }
    });
});


Meteor.methods({

    'buses.getAgencyList'() {
        return callService(
            'GET',
            'http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList'
        ).then((result) => {
            let json = JSON.parse(result.content);
            return json;
        }).then((result) => {
            //Buses.update({_id:"s2TkLoe7WuivT66ht"}, {$set:{agencies: result.agency}});
            let agencies = result.agency;
            return agencies;
        }).catch((error) => {
            throw new Meteor.Error('500', `${error.message}`);
        });
    },

    'buses.getRoutesByAgency'(agencyTag) {
        let url = 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=' + agencyTag;
        return callService(
            'GET',
            url
        ).then((result) => {
            return JSON.parse(result.content);
        }).then(((result) =>{
            let routes = result.route;
            return routes;
        })).catch((error) => {
            throw new Meteor.Error('500', `${error.message}`);
        });
    },

    'buses.getTimeStops'(agencyTag,routeName) {
        let url = 'http://webservices.nextbus.com/service/publicJSONFeed?command=schedule&a='+agencyTag+'&r='+routeName;
        return callService(
            'GET',
            url
        ).then((result) => {
            let json = JSON.parse(result.content);
            return json;
        }).then((result) => {
            let route = result.route[0];
            console.log(route);
            return route;
        }).catch((error) => {
            throw new Meteor.Error('500', `${error.message}`);
        });
    }
});

if (Meteor.isServer) {

    /*let data = Meteor.call('buses.getTimeStops');*/
    //Meteor.call('buses.getAgencyList');
    /*let exists = Buses.find();
    console.log(exists);
    if (!exists) {
        console.log("NOT EXISTS");
        //Buses.insert({type: "timestops", data: data, agencies: agencies});
    } else {
        console.log("EXISTS");
        //Buses.update({_id: }, {$set:{agencies: agencies}});
    }*/

    // This code only runs on the server
    Meteor.publish('buses', function tasksPublication() {
        return Buses.find();
    });
}