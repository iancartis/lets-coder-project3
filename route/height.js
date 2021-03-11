const express = require('express');
const registerHeight = express.Router();
const Height = require('../models/height');

//Creates register
registerHeight.post('/create_registerheight', (req, res) => {
    const { body: { value, register } } = req

    let newRegisterHeight = new Height({
        value: value,
        register: register
    });
    try {
        return newRegisterHeight.save()
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

// Get all the heightregisters
registerHeight.get('/heights', (req, res) => {
    Height.find({}, function(err, heights) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(heights);
    }).populate('register');
});

//Get height by id
registerHeight.get('/height/:id', (req, res) => {
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

//Delete height
registerHeight.delete("/deleteheight/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        const doc = await Height.findByIdAndRemove(_id);

        res.send(doc, "Height deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update Height
registerHeight.patch("/updateheight/:id", async(req, res) => {
    const {
        body: { value, register },
    } = req;
    const _id = req.params.id;
    debugger
    const filter = { _id: _id.toString() };
    try {
        const updatedHeight = await Height.findByIdAndUpdate(
            filter, {
                $set: {
                    value: value,
                    register: register
                }
            }
        );
        res.send(updatedHeight);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});


module.exports = registerHeight;