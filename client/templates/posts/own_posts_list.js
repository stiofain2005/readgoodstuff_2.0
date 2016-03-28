/**
 * Created by stephencampbell on 05/02/2016.
 */
Template.ownPostsList.helpers({
    // ownPost object returns if the current user is equal to the posts userID
    myPost:function(){
        return this.userId === Meteor.userId();
    },

    posts:function(){
            // if latest post chosen
            if(Session.get('sort') === 'Latest'){
                // if there is no date filter chosen
                if(Session.get('filter')===0){

                    return Posts.find({}, {sort: {submitted:-1}});
                }
                else{

                    //if there is a date filter chosen apply it
                    return Posts.find({submitted : {$gte : new Date((new Date()).getTime() - Session.get('filter'))}}, {sort: {submitted:-1}});
                }

            }
            // if hottest is chosen
            else{
                // if there is no date filter
                if(Session.get('filter')===0){

                    //sort by the clicks
                    return Posts.find({}, {sort: {clicks:-1}});
                }
                // if there is a date filter apply it
                else{

                    return Posts.find({submitted : {$gte : new Date((new Date()).getTime() - Session.get('filter'))}}, {sort: {clicks:-1}});
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
        Session.set('filter-name', "Today");
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name') ;
    },

    'click #TW': function(e) {
        var filterDate = 1000*60*60*24*7;
        Session.set('filter', filterDate);
        Session.set('filter-name', "This Week");
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name') ;
    },

    'click #TM': function(e) {
        var filterDate = 1000*60*60*24*31;
        Session.set('filter', filterDate);
        Session.set('filter-name', "This Month");
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name') ;
    },

    'click #TY': function(e) {
        var filterDate = 1000*60*60*24*365;
        Session.set('filter', filterDate);
        Session.set('filter-name', "This Year");
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name') ;
    },

    'click #AT': function(e) {
        var filterDate = 0;
        Session.set('filter', filterDate);
        Session.set('filter-name', "All Time");
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name') ;
    }


});

