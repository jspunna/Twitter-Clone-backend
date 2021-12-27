const mongoose = require('mongoose');

const schema = mongoose.Schema({
    topic: String,
    avatar_image: String,
    userName: String,
    verified: Boolean,
    handle: String,
    time: String,
    tweet: String,
    tweet_image: String,
    tweet_link_title: String,
    tweet_link_description: String,
    tweet_link_url: String,
    stats: {
        comments: {type: Number, defaultValue: 0},
        retweets: {type: Number, defaultValue: 0},
        likes: {type: Number, defaultValue: 0}
    },
    liked: {type: Boolean, defaultValue: false}
}, {collection: 'tweets'});

module.exports = schema;