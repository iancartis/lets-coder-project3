const express = require('express');
const registerSleep = express.Router();
const Sleep = require('../models/sleep');

//Creates sleep
registerSleep.post('/registersleep', (req, res) => {
    const { body: { value, register } } = req

    let newRegisterSleep = new Sleep({
        value: value,
        register: register
    })
    debugger
    try {
        return newRegisterSleep.save()
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

// Get all the sleep registers
registerSleep.get('/sleeps', (req, res) => {
    Sleep.find({}, function(err, sleeps) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(sleeps);
    }).populate('register');
});

//Get sleep by id
registerSleep.get('/sleep/:id', (req, res) => {
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
            res.status(500).send(error.message)
        })
})

//Delete sleep
registerSleep.delete("/deletesleep/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        const doc = await Sleep.findByIdAndRemove(_id);

        res.send(doc, "Sleep deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update sleep 
registerSleep.patch("/updatesleep/:id", async(req, res) => {
    const {
        body: { value, register },
    } = req;
    const _id = req.params.id;
    debugger
    const filter = { _id: _id.toString() };
    try {
        const updatedSleep = await Sleep.findByIdAndUpdate(
            filter, {
                $set: {
                    value: value,
                    register: register
                }
            }
        );
        res.send(updatedSleep);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});


module.exports = registerSleep;