/**
 * Created by stephencampbell on 05/02/2016.
 */
Template.ownPostsList.helpers({
    // ownPost object returns if the current user is equal to the posts userID
    myPost:function(){
        return this.userId === Meteor.userId();
    },

    posts:function(){
        // if no cate
            // if latest post chosen
            if(Session.get('sort') === 'Latest'){
                // if there is no date filter chosen
                if(Session.get('filter')===0){
                    /*console.log("1Category " + Session.get('category'));
                     console.log("Sort " + Session.get('sort'));
                     console.log("Filter " + Session.get('filter'));*/
                    return Posts.find({}, {sort: {publishDate:-1}});
                }
                else{
                    /*
                     console.log("2Category " + Session.get('category'));
                     console.log("Sort " + Session.get('sort'));
                     console.log("Filter " + Session.get('filter'));*/

                    //if there is a date filter chosen apply it
                    return Posts.find({publishDate : {$gte : new Date((new Date()).getTime() - Session.get('filter'))}}, {sort: {publishDate:-1}});
                }

            }
            // if hottest is chosen
            else{
                // if there is no date filter
                if(Session.get('filter')===0){
                    /*console.log("3Category " + Session.get('category'));
                     console.log("Sort " + Session.get('sort'));
                     console.log("Filter " + Session.get('filter'));*/

                    //sort by the clicks
                    return Posts.find({}, {sort: {clicks:-1}});
                }
                // if there is a date filter apply it
                else{
                    /*console.log("4Category " + Session.get('category'));
                     console.log("Sort " + Session.get('sort'));
                     console.log("Filter " + Session.get('filter'));*/

                    return Posts.find({publishDate : {$gte : new Date((new Date()).getTime() - Session.get('filter'))}}, {sort: {clicks:-1}});
                }
            }

    }
});

Template.ownPostsList.events({

    // set the session variables when clicked

    'click #Hottest': function(e) {
        Session.set('sort', 'Hottest');

    },

    'click #Latest': function(e) {
        Session.set('sort', 'Latest');

    },

    'click #T': function(e) {
        var filterDate = 1000*60*60*24;
        Session.set('filter', filterDate);
    },

    'click #TW': function(e) {
        var filterDate = 1000*60*60*24*7;
        Session.set('filter', filterDate);
    },

    'click #TM': function(e) {
        var filterDate = 1000*60*60*24*31;
        Session.set('filter', filterDate);
    },

    'click #TY': function(e) {
        var filterDate = 1000*60*60*24*365;
        Session.set('filter', filterDate);
    },

    'click #AT': function(e) {
        var filterDate = 0;
        Session.set('filter', filterDate);
    }


});

