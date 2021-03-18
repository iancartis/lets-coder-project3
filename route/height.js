const express = require('express');
const registerHeight = express.Router();
const Height = require('../models/height');
const Register = require('../models/register');

const auth = require("../middleware/auth");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const { validateValue, validateId, } = require('../validation/validation')

//Creates register
registerHeight.post('/registerheight/:baby', auth, async(req, res) => {

    let { body: { value } } = req
    let babyId = req.params.baby
    let registerBaby = await Register.findOne({ baby: babyId });
    if (!registerBaby) throw new Error(`no hay registro`);

    try {
        let newRegisterHeight = new Height({
            value: value,
            register: registerBaby.id,
            baby: babyId
        })
        const registerHeightId = newRegisterHeight._id


        let registerBabyPushed = await Register.findOneAndUpdate({ baby: babyId }, { $push: { typeHeight: registerHeightId } }, (error, success) => {
            if (error) console.log(error.message)
            console.log(success)
        });

        await registerBabyPushed.save()
            .then(doc => {
                res.send(doc);
                console.log(doc);
            })
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
registerHeight.get('/heights', auth, (req, res) => {
    Height.find({}, function(err, heights) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(heights);
    }).populate('register comments');
});
//Get all heights by baby
registerHeight.get("/heightbaby/:baby", auth, async(req, res) => {
    const baby = req.params.baby;
    const getBaby = Height.findOne({ baby: baby })
    console.log(getBaby)
    if (getBaby) {
        try {
            Height.find(getBaby, function(err, heights) {

                if (heights) {
                    res.send(heights);
                } else console.log(`There's been an error: ${err.message}`)
            })
        } catch (error) {
            res.send("error.message");
        }

    } else {
        res.send("There's been an error");
    }
})

//Get height by id
registerHeight.get('/height/:id', auth, (req, res) => {
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

registerHeight.get('/babyHeight/:baby', auth, (req, res) => {
    const _baby = req.params.baby
    validateString(_baby)
    Register.find({ baby: _baby }, { __v: 0 }).populate("parent baby ")
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

//Delete height
registerHeight.delete("/deleteheight/:id", auth, async(req, res) => {
    const _id = req.params.id;
    validateId(_id)
    try {
        const doc = await Height.findByIdAndRemove(_id);

        res.status(200).send(doc)
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update Height
registerHeight.patch("/updateheight/:id", auth, async(req, res) => {
    const {
        body: { value, register, baby },
    } = req;
    const _id = req.params.id;
    validateId(_id)
    validateValue(value)
    const filter = { _id: _id.toString() };
    try {
        const updatedHeight = await Height.findByIdAndUpdate(
            filter, {
                $set: {
                    value: value,
                    register: register,
                    baby: baby

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