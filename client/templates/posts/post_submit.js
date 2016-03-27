Template.postSubmit.events({


    /* submit form : this is listening for the submit event of the form css-selector. Anytime
     // enter is pressed within the form it will run this event
     // the event has an argument called event(e). Event.target is the form */

    'submit form': function(e) {


        e.preventDefault();

        /* if user wants to publish set variable */
        var publishVar;
        if(document.getElementById('publishBox').checked){
            publishVar = true;
        }
        else{
            publishVar = false;
        }

        /* The below uses embedly to extract info from the url */

        // use the embedly extract function with the url
        var embObj = Embedly.extract($(e.target).find('[name=url]').val());

        // variable for tracking the post title
        var postTitle;

        // if there is no title from embedly and the title box is hidden
        if(embObj.title == undefined && document.getElementById("title-input-text").innerHTML == "T")
        {
            alert('The title of the post is invalid');
            document.getElementById("title-input").style.display = "block";
            document.getElementById("title-input-text").style.display = "block";
            document.getElementById("title-input-text").innerHTML = "Title";
            return;
        }

        // if there is a title box
        if(document.getElementById("title-input-text").innerHTML == "Title"){
            // read title from box
            postTitle = $(e.target).find('[name=title]').val();
        }
        else{
            // else use embedly
            postTitle = embObj.title;
        }

        // if there are no images use the stock image
        if(embObj.images[0] == undefined){
            embImg = "https://pixabay.com/static/uploads/photo/2015/05/31/10/55/man-791049_960_720.jpg";
        }
        else {
            embImg = embObj.images[0].url;
        }


        // set post to the user input
        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: postTitle,
            category: $(e.target).find('[id=category]').val(),
            clicks:0,
            userId: Meteor.userId(),
            user:Meteor.user().username,
            publish:publishVar,
            imageUrl:embImg
        };
        // call the postInsert method and either returns a new post id or postexists object
        Meteor.call('postInsert', post, function(error, result){
            if (error)
                return alert(error.reason);

            if(result.postExists)
                alert('This link has already been posted');

            Router.go('postList');
        });

    }
});
