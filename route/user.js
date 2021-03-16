const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const Baby = require("../models/baby");
const Register = require("../models/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validateId, validateEmail, validatePassword, validateString, validateAge } = require('../validation/validation')
const secret = process.env.JWT_SECRET;
const auth = require('../middleware/auth')

// Register process

userRouter.post("/register", (req, res) => {
    validateEmail(req.body.email)
        // validatePassword(req.body.password)
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    User.create({
            email: req.body.email,
            password: hashedPassword,
        }).then((user) => {
            // create a token
            let token = jwt.sign({ id: user._id }, secret, {
                expiresIn: '24h' // expires in 24 hours
            })
            console.log(token);
            return res.status(201).send(token)
        })
        .catch((err) => { return res.send(err) })
})




//Login process
userRouter.post("/login", (req, res) => {

    const {
        body: { email, password },
    } = req;
    validateEmail(email)
    validatePassword(password)
        //Verificación del password encriptado
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                throw new Error("wrong credentials");
            } else {
                const _password = user.password;
                bcrypt
                    .compare(password, _password)
                    .then((result) => {
                        if (result == false) {
                            return "credential error";
                        } else {
                            const id = user._id;
                            const token = jwt.sign({ id: id }, secret, {
                                expiresIn: 60 * 60 * 24,
                            });
                            return res.status(201).send(token)
                        }
                    })
                    .catch((error) => {
                        throw new Error(error.message);
                    });
            }
        })
        .catch((error) => {
            return new Error(error.message);
        })

});

//Register with web token
userRouter.post("/create_user", (req, res) => {
    const {
        body: { name, surname, age, email, password, },
    } = req;
    validateEmail(email)
    validatePassword(password)
        // validateAge(age)
    validateString(name)
    validateString(surname)

    debugger;
    if (!name || !surname || !age || !email || !password) {
        res.send("Please fill in the required fields");
    } else {
        User.findOne({ email })
            .then((user) => {
                if (user) {
                    res.status(400).send("User already exists");
                } else {
                    let newUser = new User({
                        firstName: name,
                        surName: surname,
                        age: age,
                        email: email,
                        password: password,

                    })
                    newUser.save()
                        .then((doc) => {
                            let token = jwt.sign({ id: doc._id }, secret, {
                                expiresIn: '24h' // expires in 24 hours
                            })

                            return res.status(201).send(token)
                        })
                        .catch((err) => {
                            res.status(400).send(err.message);
                        })

                }
            })
            .catch((err) => {
                res.send(err.message);
            });
    }
});

//Get all the users
userRouter.get("/users", auth, (req, res) => {
    User.find({}, function(err, users) {
        if (err) console.log(`There's been an error: ${err.message}`);
        res.send(users);
    }).populate("baby");
});

//Find one user
userRouter.get("/users/:id", auth, (req, res) => {
    const _id = req.params.id;

    User.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(400).send();
            } else {
                console.log(user);
                res.send(user);
            }
        })
        .catch((error) => {
            res.status(500).send();
        });
});

//Delete one user
userRouter.delete("/deleteuser/:id", auth, async(req, res) => {
    const _id = req.params.id;
    validateId(_id)
    try {
        const doc = await User.findByIdAndRemove(_id);
        console.log('user deleted')
        res.send(doc);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update one user

userRouter.patch("/updateuser/:id", auth, async(req, res) => {
    const {
        body: { name, surname, age, email, password },
    } = req;
    validateEmail(email)
    validatePassword(password)
    validateString(name)
    validateString(surname)
    const _id = req.params.id;
    debugger;
    const filter = { _id: _id.toString() };
    try {
        const updatedUser = await User.findByIdAndUpdate(filter, {
            $set: {
                firstName: name,
                surName: surname,
                age: age,
                email: email,
                password: password,
            },
        });
        res.send(updatedUser);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});


module.exports = userRouter;