const express = require('express');
const babyRouter = express.Router();
const Baby = require('../models/baby');
const auth = require("../middleware/auth");
require("dotenv").config();
const Register = require('../models/register')
const Feed = require('../models/feed')
const Weight = require('../models/weight')
const Height = require('../models/height')
const Sleep = require('../models/sleep')


const User = require('../models/user')
const secret = process.env.JWT_SECRET;
const { validateId, validateHeight, validateWeight, validateString, validateAge, validateArray, validateRegister } = require('../validation/validation')


//Creates baby
babyRouter.post('/create_baby', auth, async(req, res) => {
    console.log(req)
    let { body: { name, age, weight, height, parent } } = req
    age = Number(age)
    height = Number(height)
    weight = Number(weight)

    try {
        // validateAge(age)
        validateString(name)
        validateHeight(height)
        validateWeight(weight)
            // validateString(registers)
        let newBaby = new Baby({
            name: name,
            age: age,
            parent: parent,
            weight: weight,
            height: height,
        })

        const doc = await newBaby.save()
        console.log(doc);
        res.send(doc);

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

//Get all the babies
babyRouter.get('/babies', auth, (req, res) => {
    debugger

    Baby.find({}, function(err, babies) {
            if (err) console.log(`There's been an error: ${err.message}`)
            else {
                console.log('Baby created');
                res.send(babies);
            }

        })
        .populate("parent registers");
});

//Get baby by id
babyRouter.get('/baby/:id', auth, (req, res) => {
    const _id = req.params.id
    validateId(_id)
    Baby.findById(_id).populate("registers")
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

//Pull para eliminar uno de los values de cualquier registro

//Delete one baby
babyRouter.delete("/deletebaby/:id", auth, async(req, res) => {
    const _id = req.params.id;
    validateId(_id)
    try {

        const user = req.user.id

        await Baby.findByIdAndRemove(_id);

        await Register.findOneAndDelete({ baby: _id })

        await Sleep.deleteMany({ baby: _id }, function(err, result) {
            if (err) {
                res.send(err.message);
            } else {
                res.send(result);
            }
        })
        await Feed.deleteMany({ baby: _id }, function(err, result) {
            if (err) {
                res.send(err.message);
            } else {
                res.send(result);
            }
        })
        await Weight.deleteMany({ baby: _id }, function(err, result) {
            if (err) {
                res.send(err.message);
            } else {
                res.send(result);
            }
        })
        await Height.deleteMany({ baby: _id }, function(err, result) {
            if (err) {
                res.send(err.message);
            } else {
                res.send(result);
            }
        })

        console.log("Baby and register deleted")

        res.json("Baby and register has been deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});
//Update baby
babyRouter.patch("/updatebaby/:id", auth, async(req, res) => {
    const {
        body: { name, age, parent, weight, height, registers },
    } = req;
    validateString(name)



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
babyRouter.get("/parentbabies/", auth, async(req, res) => {
    const parent = req.user.id;
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