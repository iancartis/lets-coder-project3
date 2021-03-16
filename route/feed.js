const express = require('express');
const registerFeed = express.Router();
const Feed = require('../models/feed');
const auth = require("../middleware/auth");
const Register = require('../models/register');

require("dotenv").config();
const secret = process.env.JWT_SECRET;
const { validateValue, validateId, } = require('../validation/validation')


//Creates feed
registerFeed.post('/registerfeed/:baby', auth, async(req, res) => {
    console.log("_____", req.user)

    let { body: { value } } = req
    let babyId = req.params.baby
        //1- Filtro el registro según el Id del baby
    let registerBaby = await Register.findOne({ baby: babyId });
    console.log(`Este es el RegisterBaby:${registerBaby}`)
    if (!registerBaby) throw new Error(`no hay registro`);

    try {
        let newRegisterFeed = new Feed({
            value: value,
            register: registerBaby.id,
            baby: babyId
        })
        console.log(`Este es el newRegistersleep${newRegisterFeed}`)
        const registerFeedId = newRegisterFeed._id

        console.log(registerFeedId)
        console.log(`Èste es el registerBaby  ${registerBaby}`)
        let registerBabyPushed = await Register.findOneAndUpdate({ baby: babyId }, { $push: { typeFeed: registerFeedId } }, (error, success) => {
            if (error) console.log(error.message)
            console.log(success)
        });
        console.log(`Èste es el registerBaby  después del push del sleep${registerBabyPushed}`)

        await registerBabyPushed.save()
            .then(doc => {
                res.send(doc);
                console.log(doc);
            })
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
registerFeed.get('/feeds', auth, (req, res) => {
    Feed.find({}, function(err, feeds) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(feeds);
    }).populate('register');
});

//Get feed by id
registerFeed.get('/feed/:id', auth, (req, res) => {
    const _id = req.params.id
    validateId(_id)
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

registerFeed.get("/feedbaby/:baby", auth, async(req, res) => {
    const baby = req.params.baby;
    const getBaby = Feed.findOne({ baby: baby })
    console.log(getBaby)
    if (getBaby) {
        try {
            Feed.find(getBaby, function(err, feeds) {

                if (feeds) {
                    res.json({ "message": "Feeds served" });
                } else console.log(`There's been an error: ${err.message}`)
            })
        } catch (error) {
            res.send("error.message");
        }

    } else {
        res.send("There's been an error");
    }
})

//Delete height
registerFeed.delete("/deletefeed/:id", auth, async(req, res) => {
    const _id = req.params.id;
    validateId(_id)
    try {
        const doc = await Feed.findByIdAndRemove(_id);

        res.send(doc, "Feed deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update Feed
registerFeed.patch("/updatefeed/:id", auth, async(req, res) => {
    const {
        body: { value, register, baby },
    } = req;
    const _id = req.params.id;
    validateId(_id)
    validateValue(value)
    const filter = { _id: _id.toString() };
    try {
        const updatedFeed = await Feed.findByIdAndUpdate(
            filter, {
                $set: {
                    value: value,
                    register: register,
                    baby: baby

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