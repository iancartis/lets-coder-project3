const express = require('express');
const registerWeight = express.Router();
const Weight = require('../models/weight');

//Creates weight
registerWeight.post('/registerweight', (req, res) => {
    const { body: { value, register } } = req

    let newRegisterWeight = new Weight({
        value: value,
        register: register
    })
    debugger
    try {
        return newRegisterWeight.save()
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

// Get all the Weight registers
registerWeight.get('/weights', (req, res) => {
    Weight.find({}, function(err, weights) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(weights);
    }).populate('register');
});

//Get height by id
registerWeight.get('/weight/:id', (req, res) => {
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

//Delete Weight 
registerWeight.delete("/deleteweight/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        const doc = await Weight.findByIdAndRemove(_id);

        res.send(doc, "Weight deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update Weight 
registerWeight.patch("/updateweight/:id", async(req, res) => {
    const {
        body: { value, register },
    } = req;
    const _id = req.params.id;
    debugger
    const filter = { _id: _id.toString() };
    try {
        const updatedWeight = await Weight.findByIdAndUpdate(
            filter, {
                $set: {
                    value: value,
                    register: register
                }
            }
        );
        res.send(updatedWeight);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});


module.exports = registerWeight;