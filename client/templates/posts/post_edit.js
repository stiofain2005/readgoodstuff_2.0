Template.postEdit.events({
    // if the form is submitted with Enter or click submit
    'submit form': function(e) {
        // prevent the default action
        e.preventDefault();

        // if user chooses to publish the post or unpublish using dropdown
        var publishVar;
        if($(e.target).find('[id=publishGroup]').val() === 'Publish'){
            publishVar = true;
        }
        else{
            publishVar = false;
        }


        // get the current post id
        var currentPostId = this._id;
        var oldUrl = this.url;


        var embObj = Embedly.extract($(e.target).find('[name=url]').val());
        if(embObj.images[0] == undefined){
            embImg = "https://pixabay.com/static/uploads/photo/2015/05/31/10/55/man-791049_960_720.jpg";
        }
        else {
            embImg = embObj.images[0].url;
        }

        // need to catch errors here if the url isnt right and embedly captures nothing


        // object of the current posts attributes
        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            category: $(e.target).find('[id=category]').val(),
            publish:publishVar,
            imageUrl: embImg
        };

        // call postUpdate defined in posts.js
        Meteor.call('postUpdate', currentPostId, postProperties, this.publishDate, function(error, result){
            if (error)
                return alert(error.reason);
            if(result.postExists)
                alert('This link has already been posted');

            Router.go('postList');
        });

    },

    // if delete is clicked
    'click .delete': function(e) {
        e.preventDefault();
        if (confirm("Delete this post?")) {
            var currentPostId = this._id;

            // remove the post from the database
            Posts.remove(currentPostId);

            // go the postList route which is the main page
            Router.go('postList');
        }
    }
});
