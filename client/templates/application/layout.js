/**
 * Created by stephencampbell on 28/02/2016.
 *
 * This helper is used to set session variables and change the text of the current category
 *
 *
 */

Template.layout.events({

    // set the category session variable to what category is chosen
    // Session variable is reactive so the postList will auto update

    'click .navbar-brand': function(e) {

        Session.set('category', 'All');
        document.getElementById("category-banner").innerHTML = Session.get('category');
        Session.set('filter',1000*60*60*24*7);
        Session.set('filter-name',"This Week");
        Session.set('sort','Latest');
    },

    'click #all': function(e) {
        Session.set('category', 'All');
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name') ;
    },

    'click #tech': function(e) {
        Session.set('category', 'Tech');
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name');
    },

    'click #business': function(e) {
        Session.set('category', 'Business');
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name');
    },

    'click #health': function(e) {
        Session.set('category', 'Health');
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name');
    },

    'click #culture': function(e) {
        Session.set('category', 'Culture');
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name');
    },

    'click #sport': function(e) {
        Session.set('category', 'Sport');
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name');
    },

    'click #random': function(e) {
        Session.set('category', 'Random');
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name');
    },

    'click #series': function(e) {
        Session.set('category', 'Series');
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name');
    },

    'click #totw': function(e) {
        Session.set('category', 'TOTW');
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name');
    },

    'click #myposts': function(e) {
        Session.set('category', 'My Posts');
        document.getElementById("category-banner").innerHTML = Session.get('category') + " - " + Session.get('filter-name');
    }
});
