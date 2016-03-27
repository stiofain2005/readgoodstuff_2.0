/**
 * Created by stephencampbell on 31/01/2016.
 *
 * This code sets up the cookies once a user logs in for the first time. This cookie is used by the chrome extesnion
 *
 */



var cookieId = getCookie("userId");

// this code will run every time something changes in this case when user logs in
Tracker.autorun(function(){
    if(Meteor.userId()){
        // if cookie not set for this user
        if(cookieId != Meteor.userId()){
            setCookie("userId", Meteor.userId(), 365);
            setCookie("userName", Meteor.user().username, 365);

        }
    }
});

// function to set cookie
function setCookie(cname, cvalue, exdays){
    var d = new Date();
    // set time from current time in milliseconds from 1/1/1970 + num days * 24 hrs * 60 min * 60 secs * 1000 msecs
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    // set expiration of the cookie
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// function to get the cookie
function getCookie(cname){
    var name = cname + "=";
    // split the cookies into an array
    var ca = document.cookie.split(';');
    for(var i = 0;i < ca.length;i++) {
        var c = ca[i];
        // reduce the cookie until there are no preceding blank spaces
        while (c.charAt(0) == ' ') c = c.substring(1);
        // if the string starts with the arg then return the part after "username="
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}