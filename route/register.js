const express = require('express');
const registerRouter = express.Router();
const Register = require('../models/register');
const Height = require("../models/height")
const Weight = require("../models/weight")
const Feed = require("../models/feed")
const Sleep = require("../models/sleep")


const auth = require("../middleware/auth");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const { validateId, validateHeight, validateWeight, validateString, validateAge, validateArray, validateRegister } = require('../validation/validation')


//Creates register
registerRouter.post('/create_register', auth, (req, res) => {

    let { body: { baby = "", typeSleep = [], typeHeight = [], typeWeight = [], typeFeed = [] } } = req
    console.log(`Request user: ${req.user}`)
    try {

        validateString(baby)
        let newRegister = new Register({
            parent: req.user,
            baby: baby,
            typeSleep: typeSleep,
            typeHeight: typeHeight,
            typeWeight: typeWeight,
            typeFeed: typeFeed

        }).populate("baby")
        return newRegister.save()
            .then(document => {
                console.log(document);
                return res.json({ message: "The register has been created" })
            })
            .catch(error => {
                console.log(error);
                return res.json({ message: "The register couldn't be created" })

            })

    } catch (err) {
        res.status(500).send(err);
    }
});

//Get all the registers
registerRouter.get('/registers', auth, (req, res) => {

    Register.find({}, function(err, registers) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(registers);
        console.log(registers)
    }).populate('height')
});

//Get register by id
registerRouter.get('/register/:id', auth, (req, res) => {
    const _id = req.params.id
    validateId(_id)
    Register.findById(_id)
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

//Get register by baby
registerRouter.get('/babyregisters/:baby', auth, (req, res) => {
    const _baby = req.params.baby
    validateString(_baby)
    Register.find({ baby: _baby }, { __v: 0 }).populate("parent baby typeHeight typeWeight typeFeed typeSleep")
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

//Delete register
registerRouter.delete("/deleteregister/:id", auth, async(req, res) => {
    const _id = req.params.id;
    validateId(_id)
    try {
        const doc = await Register.findByIdAndRemove(_id);
        res.send(doc);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});


//Update register
registerRouter.patch("/updateregister/:id", auth, async(req, res) => {
    const { body: { parent, baby, typeSleep = [], typeHeight = [], typeWeight = [], typeFeed = [] } } = req
    try {
        const _id = req.params.id
        validateString(parent)
        validateString(baby)
        const filter = { _id: _id.toString() }
        const updatedRegister = await Register.findByIdAndUpdate(
            filter, {
                $set: {
                    parent: parent,
                    baby: baby,
                    typeSleep: typeSleep,
                    typeHeight: typeHeight,
                    typeWeight: typeWeight,
                    typeFeed: typeFeed
                }
            }
        ).populate("parent baby");
        res.send(updatedRegister);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});

module.exports = registerRouter;