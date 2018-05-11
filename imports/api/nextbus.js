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
            console.log(result);
            return result.agency;
        }).catch((error) => {
                throw new Meteor.Error('500', `${error.message}`);
            });
    },

    'buses.getRoutesByAgency'(agencyTag) {
        return callService(
            'GET',
            'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=' + agencyTag
        ).then((result) => {
            return JSON.parse(result.content);
        }).catch((error) => {
                throw new Meteor.Error('500', `${error.message}`);
            });
    },

    'buses.getTimeStops'(){
        return callService(
            'GET',
            'http://webservices.nextbus.com/service/publicJSONFeed?command=schedule&a=sf-muni&r=N'
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

    /*let data = Meteor.call('buses.getTimeStops');
    let exists = Buses.findOne({type:"timestops"});
    if(!exists){
        Buses.insert({type:"timestops",data:data});
    }else{
        Buses.update({type:"timestops"},{data:data});
    }*/

    // This code only runs on the server
    Meteor.publish('buses', function tasksPublication() {
        return Buses.find();
    });
}