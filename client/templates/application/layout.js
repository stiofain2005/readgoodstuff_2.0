/**
 * Created by stephencampbell on 28/02/2016.
 */

Template.layout.events({

    // set the category session variable to what category is chosen
    // Session variable is reactive so the postList will auto update


    'click .navbar-brand': function(e) {
        Session.set('category', 'All');
        document.getElementById("category-banner").innerHTML = Session.get('category');
        Session.set('filter',1000*60*60*24*7);
        Session.set('sort','Latest');
        /* set page element equal to above */
    },

    'click #all': function(e) {
        Session.set('category', 'All');
        document.getElementById("category-banner").innerHTML = Session.get('category');
        /* set page element equal to above */
    },

    'click #tech': function(e) {
        Session.set('category', 'Tech');
        document.getElementById("category-banner").innerHTML = Session.get('category');
    },

    'click #business': function(e) {
        Session.set('category', 'Business');
        document.getElementById("category-banner").innerHTML = Session.get('category');
    },

    'click #health': function(e) {
        Session.set('category', 'Health');
        document.getElementById("category-banner").innerHTML = Session.get('category');
    },

    'click #culture': function(e) {
        Session.set('category', 'Culture');
        document.getElementById("category-banner").innerHTML = Session.get('category');
    },

    'click #sport': function(e) {
        Session.set('category', 'Sport');
        document.getElementById("category-banner").innerHTML = Session.get('category');
    },

    'click #random': function(e) {
        Session.set('category', 'Random');
        document.getElementById("category-banner").innerHTML = Session.get('category');
    },

    'click #series': function(e) {
        Session.set('category', 'Series');
        document.getElementById("category-banner").innerHTML = Session.get('category');
    },

    'click #totw': function(e) {
        Session.set('category', 'Totw');
        document.getElementById("category-banner").innerHTML = Session.get('category');
    }
});
