let tweets = require('../data/tweets.json');
const dao = require('../db/tweets/tweet-dao');

module.exports = (app) => {

    //A8
    const findAllTweets = (req, res) => {
        res.json(tweets);
    }

    //A8
    const postNewTweet = (req, res) => {
        const newTweet = {
            _id: (new Date()).getTime() + '',
            "topic": "Space",
            "avatar_image": "/images/elon_twitter_image.jpg",
            "userName": "Elon Musk",
            "verified": true,
            "handle": "elonmusk",
            "time": "2h",
            // "tweet": action.tweet,
            "tweet_image": "/images/mars_to_earth.jpg",
            "tweet_link_title": "",
            "tweet_link_description": "",
            "tweet_link_url": "",
            "stats": {
                "comments": 123,
                "retweets": 234,
                "likes": 345
            },
            ...req.body,
        }
        tweets = [
            newTweet,
            ...tweets
        ];
        res.json(newTweet);
    }

    //A8
    const deleteTweet = (req, res) => {
        const id = req.params['id'];
        tweets = tweets.filter(tweet => tweet._id !== id);
        res.sendStatus(200);
    }

    //A8
    const likeTweet = (req, res) => {
        const id = req.params['id'];
        tweets = tweets.map(tweet => {
            if (tweet._id === id) {
                if (tweet.liked === true) {
                    tweet.liked = false;
                    tweet.stats.likes--;
                } else {
                    tweet.liked = true;
                    tweet.stats.likes++;
                }
                return tweet;
            } else {
                return tweet;
            }
        });
        res.sendStatus(200);
    }

    //A8
    app.get('/api/tweets', findAllTweets);
    app.post('/api/tweets', postNewTweet);
    app.delete('/api/tweets/:id', deleteTweet);
    app.put('/api/tweets/:id/like', likeTweet);

    //A9
    const findAllTweetsA9 = (req, res) => {
        dao.findAllTweets()
            .then(tweets => res.json(tweets));
    }

    //A9
    const createTweet = (req, res) => {
        const newTweet = {
            "topic": "Space",
            "avatar_image": "/images/elon_twitter_image.jpg",
            "userName": "Elon Musk",
            "verified": true,
            "handle": "elonmusk",
            "time": "1h",
            // "tweet": action.tweet,
            "tweet_image": "/images/mars_to_earth.jpg",
            "tweet_link_title": "",
            "tweet_link_description": "",
            "tweet_link_url": "",
            "stats": {
                "comments": 123,
                "retweets": 234,
                "likes": 345
            },
            "liked": false,
            ...req.body,
        }
        dao.createTweet(newTweet)
            .then((insertedTweet) => res.json(insertedTweet))

    }

    //A9
    const deleteTweetA9 = (req, res) => {
        const id = req.params['id'];
        dao.deleteTweet(id)
            .then((status) => res.send(status))
    }


    //A9
    const likeTweetA9 = (req, res) => {
        const id = req.params['id'];
        const requestTweet = req.body;
        if (requestTweet.liked === true) {
            requestTweet.liked = false;
            requestTweet.stats.likes--;
        } else {
            requestTweet.liked = true;
            requestTweet.stats.likes++;
        }
        dao.updateTweet(id, requestTweet)
            .then((status) => res.send(status));
    }

    //A9
    //Prof said in office hours that we can change the api endpoints for A9 so it does not break A8 since A9 and A8
    // used same endpoints. This way A8 can still use json for data storage and A9 can use database for data storage.
    // As a result, when deployed to heroku and netlify, A8 will will not break and will not be overridden by A9
    app.get('/rest/tweets', findAllTweetsA9);
    app.post('/rest/tweets', createTweet);
    app.delete('/rest/tweets/:id', deleteTweetA9);
    app.put('/rest/tweets/:id/like', likeTweetA9);
};


