const express = require('express');
const registerWeight = express.Router();
const Weight = require('../models/weight');
const Register = require('../models/register')
const auth = require("../middleware/auth");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const { validateValue, validateId, } = require('../validation/validation');
const { validate } = require('../models/weight');


//Creates weight
registerWeight.post('/registerweight/:baby', auth, async(req, res) => {

    let { body: { value } } = req
    let babyId = req.params.baby
    let registerBaby = await Register.findOne({ baby: babyId });
    if (!registerBaby) throw new Error(`no hay registro`);

    try {
        let newRegisterWeight = new Weight({
            value: value,
            register: registerBaby.id,
            baby: babyId,

        })
        const registerWeightId = newRegisterWeight._id


        let registerBabyPushed = await Register.findOneAndUpdate({ baby: babyId }, { $push: { typeWeight: registerWeightId } }, (error, success) => {
            if (error) console.log(error.message)
            console.log(success)
        });
        console.log(`Èste es el registerBaby  después del push del weight${registerBabyPushed}`)

        await registerBabyPushed.save()
            .then(doc => {
                res.send(doc);
                console.log(doc);
            })
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
registerWeight.get('/weights', auth, (req, res) => {
    Weight.find({}, function(err, weights) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(weights);
    }).populate('register comments');
});

//Get weight by id
registerWeight.get('/weight/:id', auth, (req, res) => {
    const _id = req.params.id
    validate(_id)
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

registerWeight.get("/weightbaby/:baby", auth, async(req, res) => {
    const baby = req.params.baby;
    const getBaby = Weight.findOne({ baby: baby })
    console.log(getBaby)
    if (getBaby) {
        try {
            Weight.find(getBaby, function(err, weights) {

                if (weights) {
                    res.send(weights);
                } else console.log(`There's been an error: ${err.message}`)
            })
        } catch (error) {
            res.send("error.message");
        }

    } else {
        res.send("There's been an error");
    }
})

//Delete Weight 
registerWeight.delete("/deleteweight/:id", auth, async(req, res) => {
    const _id = req.params.id;
    validateId(_id)
    try {
        const doc = await Weight.findByIdAndRemove(_id);

        res.send(doc, "Weight deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

registerWeight.get("/weightbaby/:baby", auth, async(req, res) => {
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

//Update Weight 
registerWeight.patch("/updateweight/:id", auth, async(req, res) => {
    const {
        body: { value, register, baby },
    } = req;
    const _id = req.params.id;
    validateId(_id)
    validateValue(value)
    const filter = { _id: _id.toString() };
    try {
        const updatedWeight = await Weight.findByIdAndUpdate(
            filter, {
                $set: {
                    value: value,
                    register: register,
                    baby: baby
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