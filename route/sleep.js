const express = require('express');
const registerSleep = express.Router();
const Sleep = require('../models/sleep');
const Register = require('../models/register');

const mongoose = require('mongoose')
const auth = require("../middleware/auth");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const { validateValue, validateId } = require('../validation/validation')


//Creates sleep
registerSleep.post('/registersleep/:baby', auth, async(req, res) => {
    console.log("_____", req.user)

    let { body: { value } } = req
    let babyId = req.params.baby
    console.log(`Este es el babyId:${babyId}`)
    debugger
    //1- Filtro el registro según el Id del baby
    let registerBaby = await Register.findOne({ baby: babyId });
    console.log(`Este es el RegisterBaby:${registerBaby}`)
    if (!registerBaby) throw new Error(`no hay registro`);

    try {
        let newRegisterSleep = new Sleep({
            value: value,
            register: registerBaby.id,
            baby: babyId
        })
        console.log(`Este es el newRegistersleep${newRegisterSleep}`)
        const registerSleepId = newRegisterSleep._id

        console.log(registerSleepId)
        console.log(`Èste es el registerBaby  ${registerBaby}`)
        let registerBabyPushed = await Register.findOneAndUpdate({ baby: babyId }, { $push: { typeSleep: registerSleepId } }, (error, success) => {
            if (error) console.log(error.message)
            console.log(success)
        });
        console.log(`Èste es el registerBaby  después del push del sleep${registerBabyPushed}`)

        await registerBabyPushed.save()
            .then(doc => {
                res.send(doc);
                console.log(doc);
            })
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
registerSleep.get('/sleeps', auth, (req, res) => {
    Sleep.find({}, function(err, sleeps) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(sleeps);
    }).populate('register');
});

//Get sleep by id
registerSleep.get('/sleep/:id', auth, (req, res) => {
    const _id = req.params.id
    validateId(_id)
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

registerSleep.get("/sleepbaby/:baby", auth, async(req, res) => {
    const baby = req.params.baby;
    const getBaby = Sleep.findOne({ baby: baby })
    console.log(getBaby)
    if (getBaby) {
        try {
            Sleep.find(getBaby, function(err, sleeps) {

                if (sleeps) {
                    res.send(sleeps);
                } else console.log(`There's been an error: ${err.message}`)
            })
        } catch (error) {
            res.send("error.message");
        }

    } else {
        res.send("There's been an error");
    }
})

//Delete sleep
registerSleep.delete("/deletesleep/:id", auth, async(req, res) => {
    const _id = req.params.id;
    validateId(_id)
    try {
        const doc = await Sleep.findByIdAndRemove(_id);

        res.send(doc, "Sleep deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update sleep 
registerSleep.patch("/updatesleep/:id", auth, async(req, res) => {
    const {
        body: { value, register, baby },
    } = req;
    const _id = req.params.id;
    validateId(_id)
    validateValue(value)
    const filter = { _id: _id.toString() };
    try {
        const updatedSleep = await Sleep.findByIdAndUpdate(
            filter, {
                $set: {
                    value: value,
                    register: register,
                    baby: baby
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