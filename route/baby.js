const express = require('express');
const babyRouter = express.Router();
const Baby = require('../models/baby');
const User = require('../models/user');

//Creates baby
babyRouter.post('/create_baby', async(req, res) => {
    const { body: { name, age, parent, weight, height, registers } } = req
    let newBaby = new Baby({
        name: name,
        age: age,
        parent: parent,
        weight: weight,
        height: height,
        registers: registers
    })
    try {
        const doc = await newBaby.save()
        console.log(doc);
        res.send(doc);

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

//Get all the babies
babyRouter.get('/babies', (req, res) => {
    Baby.find({}, function(err, babies) {
            if (err) console.log(`There's been an error: ${err.message}`)
            res.send(babies);
        })
        .populate("parent");
});

//Get baby by id
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

//Delete one baby
babyRouter.delete("/deletebaby/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        const doc = await Baby.findByIdAndRemove(_id);

        res.send(doc, "Baby  deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update baby
babyRouter.patch("/updatebaby/:id", async(req, res) => {
    const {
        body: { name, age, parent, weight, height, registers },
    } = req;
    const _id = req.params.id;
    debugger
    const filter = { _id: _id.toString() };
    try {
        const updatedBaby = await Baby.findByIdAndUpdate(
            filter, {
                $set: {
                    name: name,
                    age: age,
                    parent: parent,
                    weight: weight,
                    height: height,
                    registers: registers
                }
            }
        );
        res.send(updatedBaby);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});

// Fins babys related to user
babyRouter.get("/parentbabies/:parent", async(req, res) => {
    const parent = req.params.parent;
    const getParent = Baby.findOne({ parent: parent })
    if (getParent) {
        try {
            Baby.find(getParent, function(err, babies) {
                if (babies) res.send(babies);
                else console.log(`There's been an error: ${err.message}`)
            })
        } catch (error) {
            res.send("error.message");
        }

    } else {
        res.send("There's been an error");
    }
})

module.exports = babyRouter;