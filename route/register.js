const express = require('express');
const registerRouter = express.Router();
const Register = require('../models/register');

//Creates register
registerRouter.post('/create_register', (req, res) => {
    const { body: { parent, baby, type } } = req
    let newRegister = new Register({
        "parent": parent,
        "baby": baby,
        "type": type
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
    });
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


module.exports = registerRouter;