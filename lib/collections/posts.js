Posts = new Mongo.Collection('posts');



Posts.allow({
    // allow users to update if they are the user and it is a post and also if mark/steve
    update: function(userId, post) {
        return ownsDocument(userId, post);
    },
    // allow users to delete if they are the user and it is a post and also if mark/steve
    remove: function(userId, post) {
        return ownsDocument(userId, post);
    }
});

// stop people updating fields that they cant
Posts.deny({
    update: function (userId, post, fieldNames) {
        return (_.without(fieldNames,'url','title','category','publish').length > 0);
    }
});

Meteor.methods({
    // function takes post as an argument
    postInsert: function(newPost){
        // this is using the audit-arguments-checks package which ensures that all
        // methods check their arguments
        check(newPost, {
            title: String,
            url:String,
            category:String,
            clicks:Number,
            userId:String,
            user:String,
            publish:Boolean,
            imageUrl:String
        });



        var publishDateVar;

        // look up if the post is already published and exit method if so
        if(newPost.publish) {
            var postWithSameLink = Posts.findOne({url: newPost.url, publish:true});
            if (postWithSameLink && postWithSameLink.publish) {
                return {
                    postExists: true,
                    _id: postWithSameLink._id
                }
            }
            publishDateVar = new Date();
        }


        var post = _.extend(newPost, {
            submitted: new Date(),
            publishDate: publishDateVar
        });

        // insert the posts
        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    },

    postUpdate:function(currentPostId, postAttributes, publishDate){
        check(postAttributes, {
            title: String,
            url:String,
            category:String,
            publish:Boolean,
            imageUrl:String
        });


        // look up if the post is already published and exit method if so
        if(postAttributes.publish) {

            var postWithSameLink = Posts.findOne({url: postAttributes.url, publish:true});
            if (postWithSameLink && postWithSameLink.publish && postWithSameLink._id != currentPostId) {
                return {
                    postExists: true,
                    _id: postWithSameLink._id
                }
            }

            if(publishDate == undefined){
                postAttributes.publishDate = new Date();
            }

        }


        // update the post with the attributes passed
        Posts.update(currentPostId,{$set: postAttributes});
        return {
            postExists:false
        };

    },

    // this method is for updating the clicks per post
    postUpdateClick:function(clickedPost){
        /*check(clickedPost, {
            _id:String,
            title: String,
            url:String,
            category:String,
            clicks:Number,
            userId:String,
            user:String,
            publish:Boolean,
            submitted:Date
        });*/

        var clickInc;
        if(clickedPost.clicks === undefined){
            clickInc = 1;
        }
        else {
            clickInc = clickedPost.clicks + 1;
        }

        Posts.update(clickedPost,{$set: {clicks:clickInc}});

    }
});