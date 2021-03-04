const express = require('express');
const registerRouterValues = express.Router();
const Sleep = require('../models/sleep');
const Height = require('../models/height');
const Weight = require('../models/weight');
const Feed = require('../models/feed');


//Creates registerValues
registerRouterValues.post('/create_height', (req, res) => {
    const { body: { register, date, value } } = req
    let newHeight = new Height({
        "register": register,
        "date": date,
        "value": value
    })
    try {
        return newHeight.save()
            .then(document => {
                console.log(document);
            })
            .catch(error => {
                console.log(error);
            })
            .then(doc => res.send(doc));
    } catch (err) {
        res.status(500).send(err);
    }
});

registerRouterValues.post('/create_weight', (req, res) => {
    const { body: { register, date, value } } = req
    let newWeight = new Height({
        "register": register,
        "date": date,
        "value": value
    })
    try {
        return newWeight.save()
            .then(document => {
                console.log(document);
            })
            .catch(error => {
                console.log(error);
            })
            .then(doc => res.send(doc));
    } catch (err) {
        res.status(500).send(err);
    }
});

registerRouterValues.post('/create_sleep', (req, res) => {
    const { body: { register, date, value } } = req
    let newSleep = new Sleep({
        "register": register,
        "date": date,
        "value": value
    })
    try {
        return newSleep.save()
            .then(document => {
                console.log(document);
            })
            .catch(error => {
                console.log(error);
            })
            .then(doc => res.send(doc));
    } catch (err) {
        res.status(500).send(err);
    }
});

registerRouterValues.post('/create_feed', (req, res) => {
    const { body: { register, date, value } } = req
    let newFeed = new Feed({
        "register": register,
        "date": date,
        "value": value
    })
    try {
        return newFeed.save()
            .then(document => {
                console.log(document);
            })
            .catch(error => {
                console.log(error);
            })
            .then(doc => res.send(doc));
    } catch (err) {
        res.status(500).send(err);
    }
});

//Get all the registersValues
registerRouterValues.get('/height', (req, res) => {
    Height.find({}, function(err, users) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(users);
    });
});
registerRouterValues.get('/weight', (req, res) => {
    Weight.find({}, function(err, users) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(users);
    });
});

registerRouterValues.get('/sleep', (req, res) => {
    Sleep.find({}, function(err, users) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(users);
    });
});

registerRouterValues.get('/feed', (req, res) => {
    Feed.find({}, function(err, users) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(users);
    });
});

//Get registerValues by id
registerRouterValues.get('/height/:id', (req, res) => {
    const _id = req.params.id
    Height.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(400).send()
            } else {
                res.send(user)
            }
        })
        .catch((error) => {
            res.status(500).send()
        })
})

registerRouterValues.get('/weight/:id', (req, res) => {
    const _id = req.params.id
    Weight.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(400).send()
            } else {
                res.send(user)
            }
        })
        .catch((error) => {
            res.status(500).send()
        })
})

registerRouterValues.get('/sleep/:id', (req, res) => {
    const _id = req.params.id
    Sleep.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(400).send()
            } else {
                res.send(user)
            }
        })
        .catch((error) => {
            res.status(500).send()
        })
})

registerRouterValues.get('/feed/:id', (req, res) => {
    const _id = req.params.id
    Feed.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(400).send()
            } else {
                res.send(user)
            }
        })
        .catch((error) => {
            res.status(500).send()
        })
})



module.exports = registerRouterValues;