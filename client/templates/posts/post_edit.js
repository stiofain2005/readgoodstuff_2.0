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

        /* The below uses embedly to extract info from the url */

        // use the embedly extract function with the url
        var embObj = Embedly.extract($(e.target).find('[name=url]').val());
        // if there are no images use the stock image

        if(embObj == false){
            embImg = "https://pixabay.com/static/uploads/photo/2015/05/31/10/55/man-791049_960_720.jpg";
        }
        else {
            if (embObj.images[0] == undefined) {
                embImg = "https://pixabay.com/static/uploads/photo/2015/05/31/10/55/man-791049_960_720.jpg";
            }
            else {
                embImg = embObj.images[0].url;
            }
        }



        // object of the edited post attributes
        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            category: $(e.target).find('[id=category]').val(),
            publish:publishVar,
            imageUrl: embImg
        };

        // call postUpdate defined in posts.js. Pass the publishDate so that it can be set if it hasnt already been
        // published ie saved
        Meteor.call('postUpdate', currentPostId, postProperties, this.publishDate, function(error, result){
            if (error)
                return alert(error.reason);
            if(result.postExists)
                alert('This link has already been posted');


            // go the postList route which is the main page or stay on myposts
            if(publishVar == true){
                Router.go('postList');
            }
            else{
                Router.go('ownPostsList');
            }
        });

    },

    // if delete is clicked
    'click .delete': function(e) {
        e.preventDefault();
        if (confirm("Delete this post?")) {
            var currentPostId = this._id;

            // remove the post from the database
            Posts.remove(currentPostId);

            // go the postList route which is the main page or stay on myposts
            if(Session.get('category') != 'My Posts'){
                Router.go('postList');
            }
            else{
                Router.go('ownPostsList');
            }
        }
    }
});
