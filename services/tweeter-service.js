const dao = require('../db/tweets/tweet-dao');

module.exports = (app) => {

    const findAllTweetsA9 = (req, res) => {
        dao.findAllTweets()
            .then(tweets => res.json(tweets));
    }

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

    const deleteTweetA9 = (req, res) => {
        const id = req.params['id'];
        dao.deleteTweet(id)
            .then((status) => res.send(status))
    }

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


    app.get('/tweets', findAllTweetsA9);
    app.post('/tweets', createTweet);
    app.delete('/tweets/:id', deleteTweetA9);
    app.put('/tweets/:id/like', likeTweetA9);
};


