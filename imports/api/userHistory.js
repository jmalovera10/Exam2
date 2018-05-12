import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";

export const UserHistory = new Mongo.Collection('userHistory');

if (Meteor.isServer) {
    Meteor.publish('userHistory', function tasksPublication() {
        return UserHistory.find({userId: this.userId}, {sort: {createdAt: -1}});
    });
}

Meteor.methods({
    'userHistory.insert'(agencyTag, routeTag) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        let userHist = UserHistory.find({userId: this.userId});
        if (history) {
            let history = userHist.history;
            history.push({
                agencyTag: agencyTag,
                routeTag: routeTag
            });
            UserHistory.update({_id: userHist._id}, {$set: {history: history}});
        }
        else {
            UserHistory.insert({
                userId:this.userId,
                history:[{
                    agencyTag: agencyTag,
                    routeTag: routeTag
                }]
            });
        }
    }
});