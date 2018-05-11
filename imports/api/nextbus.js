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


if (Meteor.isServer) {

    // This code only runs on the server
    Meteor.publish('buses', function tasksPublication() {
        return Buses.find();
    });

}

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
    }
});