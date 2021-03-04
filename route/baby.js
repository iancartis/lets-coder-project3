const express = require('express');
const babyRouter = express.Router();
const Baby = require('../models/baby');

//Creates baby
babyRouter.post('/create_baby', (req, res) => {
    const { body: { name, age, parent, weight, height, register } } = req
    let newBaby = new Baby({
        "name": name,
        "age": age,
        "parent": parent,
        "weight": weight,
        "height": height,
        "register": register
    })
    try {
        return newBaby.save()
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

//Get all the users
babyRouter.get('/babies', (req, res) => {
    Baby.find({}, function(err, users) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(users);
    });
});

babyRouter.get('/baby/:id', (req, res) => {
    const _id = req.params.id
    Baby.findById(_id)
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


module.exports = babyRouter;