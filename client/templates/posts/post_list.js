/**
 * Created by stephencampbell on 09/01/2016.
 */

// set the initial default value of 'category','sort' and 'filter' equal to blank
Session.setDefault('category', 'All');
Session.setDefault('sort','Latest');
// set default to this week
Session.setDefault('filter',1000*60*60*24*7);
Session.setDefault('filter-name', "This Week");

Template.postList.helpers({

    category:function(){
        return Session.get('category') + " - " + Session.get('filter-name');
    },


    posts:function(){
        // if no category is picked ie main page
        if(Session.get('category') === 'All'){
            // if latest post chosen
            if(Session.get('sort') === 'Latest'){
                // if there is no date filter chosen
                if(Session.get('filter')===0){

                    return Posts.find({publish:true}, {sort: {publishDate:-1}});
                }
                else{

                    //if there is a date filter chosen apply it
                    return Posts.find({publish:true, publishDate : {$gte : new Date((new Date()).getTime() - Session.get('filter'))}}, {sort: {publishDate:-1}});
                }

            }
            // if hottest is chosen
            else{
                // if there is no date filter
                if(Session.get('filter')===0){

                    //sort by the clicks
                    return Posts.find({publish:true}, {sort: {clicks:-1}});
                }
                // if there is a date filter apply it
                else{

                    return Posts.find({publish:true, publishDate : {$gte : new Date((new Date()).getTime() - Session.get('filter'))}}, {sort: {clicks:-1}});
                }
            }

        }
        // if there is a category
        else{
            if(Session.get('sort') === 'Latest'){
                if(Session.get('filter')===0){

                    return Posts.find({publish:true, category:Session.get('category')}, {sort: {publishDate:-1}});
                }
                else{


                    return Posts.find({publish:true, category:Session.get('category'), publishDate : {$gte : new Date((new Date()).getTime() - Session.get('filter'))}}, {sort: {publishDate:-1}});
                }

            }
            else{
                if(Session.get('filter')===0){

                    return Posts.find({publish:true, category:Session.get('category')}, {sort: {clicks:-1}});
                }
                else{

                    return Posts.find({publish:true, category:Session.get('category'), publishDate : {$gte : new Date((new Date()).getTime() - Session.get('filter'))}}, {sort: {clicks:-1}});
                }
            }
        }

    }
});

Template.postList.events({

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


