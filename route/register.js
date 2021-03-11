const express = require('express');
const registerRouter = express.Router();
const Register = require('../models/register');

//Creates register
registerRouter.post('/create_register', (req, res) => {
    const { body: { parent, baby, typeSleep, typeHeight, typeWeight, typeFeed } } = req
    let newRegister = new Register({
        "parent": parent,
        "baby": baby,
        "typeSleep": [typeSleep],
        "typeHeight": [typeHeight],
        "typeWeight": [typeWeight],
        "typeFeed": [typeFeed]

    })
    try {
        return newRegister.save()
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

//Get all the registers
registerRouter.get('/registers', (req, res) => {
    Register.find({}, function(err, users) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(users);
    }).populate("baby");
});

//Get register by id
registerRouter.get('/register/:id', (req, res) => {
    const _id = req.params.id
    Register.findById(_id)
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

//Get register by baby
registerRouter.get('/babyregisters/:baby', (req, res) => {
    const _baby = req.params.baby
    Register.find({ baby: _baby })
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

//Delete register
registerRouter.delete("/deleteregister/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        const doc = await Register.findByIdAndRemove(_id);

        res.send(doc, "Register deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});


module.exports = registerRouter;