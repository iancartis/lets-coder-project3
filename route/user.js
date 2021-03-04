const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');

//Creates users
userRouter.post('/create_user', (req, res) => {
    const { body: { name, surname, age, email, password } } = req
    let newUser = new User({
        "firstName": name,
        "surName": surname,
        "age": age,
        "email": email,
        "password": password
    })
    try {
        return newUser.save()
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

//Get all the users
userRouter.get('/users', (req, res) => {
    User.find({}, function(err, users) {
        if (err) console.log(`There's been an error: ${err.message}`)
        res.send(users);
    });
});

//Find one user
userRouter.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id)
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


module.exports = userRouter;