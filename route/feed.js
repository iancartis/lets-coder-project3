const express = require('express');
const registerFeed = express.Router();
const Feed = require('../models/feed');

//Creates feed
registerFeed.post('/registerfeed', (req, res) => {
    const { body: { value, register } } = req

    let newRegisterFeed = new Feed({
        value: value,
        register: register
    });
    try {
        return newRegisterFeed.save()
            .then(doc => {
                res.send(doc);
                console.log(doc);

            })
            .catch(console.error)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

});

// Get all the feed
registerFeed.get('/feeds', (req, res) => {
    Feed.find({}, function(err, feeds) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(feeds);
    }).populate('register');
});

//Get feed by id
registerFeed.get('/feed/:id', (req, res) => {
    const _id = req.params.id
    Feed.findById(_id)
        .then((feed) => {
            if (!feed) {
                return res.status(400).send()
            } else {
                res.send(feed)
            }
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })
})

//Delete height
registerFeed.delete("/deletefeed/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        const doc = await Feed.findByIdAndRemove(_id);

        res.send(doc, "Feed deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update Feed
registerFeed.patch("/updatefeed/:id", async(req, res) => {
    const {
        body: { value, register },
    } = req;
    const _id = req.params.id;
    debugger
    const filter = { _id: _id.toString() };
    try {
        const updatedFeed = await Feed.findByIdAndUpdate(
            filter, {
                $set: {
                    value: value,
                    register: register

                }
            }
        );
        res.send(updatedFeed);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});


module.exports = registerFeed;