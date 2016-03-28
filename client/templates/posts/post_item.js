Template.postItem.helpers({

    // ownPost object returns if the current user is equal to the posts userID or if Mark or Steve
    ownPost:function(){
        try {
            return this.userId === Meteor.userId() || Meteor.user().username === "steve" || Meteor.user().username === "mark";
        }
        catch(e){
            return false;
        }
    },

    // shortens the title of the post to 80 character limit
    shortTitle:function(){
        if(this.title.length > 80) {
            var st = this.title.substr(0, 80);
            st = st + "...";
        }
        else{
            st = this.title;
        }
        return st;
    },


    // domain object returns the host name of the url. keeps below 20 characters and removes www.
    domain: function() {
        var a = document.createElement('a');
        a.href = this.url;

        if(a.hostname.length > 20) {
            var st = a.hostname.substr(0, 20);
                st = st + "...";
        }
        else{
            st = a.hostname;
        }

        if(st.substr(0,4) == 'www.'){
            st = st.substr(4,st.length);
        }
        return st;
    }
});

Template.postItem.events({

    // if the link is clicked call method in post.js that updates the clicks
    'click a.tracked': function(e) {
        var href = $(e.currentTarget).attr('href');

        // this is a google analytics method for tracking clicks
        ga('send', 'event', 'outbound', 'click', href, {
            'transport': 'beacon'
        });

        // find the post that was clicked on and update the clicks attribute by 1
        var clickPost = Posts.findOne({url:href, publish:true});

        if(clickPost != undefined) {
            Meteor.call('postUpdateClick', clickPost, function (error, result) {
                if (error)
                    return alert(error.reason);
            });
        }

    }


});

