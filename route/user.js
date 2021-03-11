const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const Baby = require("../models/baby");
const Register = require("../models/register");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.TOKEN_SECRET;


//Register process
userRouter.post("/register", (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    User.create({
            email: req.body.email,
            password: hashedPassword,
        }).then((user) => {
            // create a token
            let token = jwt.sign({ id: user._id }, secret, {
                expiresIn: 86400 // expires in 24 hours
            })
            return res.status(201).send(token)
        })
        .catch((err) => { return res.send(err) })
})

//Login process
userRouter.post("/login", auth, (req, res) => {
    const {
        body: { email, password },
    } = req;
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
                            return id.toString();
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
        .then((userId) => {
            const token = jwt.sign({ id: userId }, secret, {
                expiresIn: 60 * 60 * 24,
            });
            return res.status(201).send({ auth: true, token: token })
        })
        .catch((error) => {
            new Error(error.message);
        });
});

//Create user
userRouter.post("/create_user", (req, res) => {
    const {
        body: { name, surname, age, email, password },
    } = req;
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
                    });
                    doc = newUser.save()
                        .then((doc) => {
                            console.log(doc)
                            res.send(doc);
                        })
                        .catch((err) => {
                            throw new Error(err.message)
                        })
                }
            })
            .catch((err) => {
                res.send(err.message);
            });
    }
});

//Get all the users
userRouter.get("/users", (req, res) => {
    User.find({}, function(err, users) {
        if (err) console.log(`There's been an error: ${err.message}`);
        res.send(users);
    });
});

//Find one user
userRouter.get("/users/:id", (req, res) => {
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
userRouter.delete("/deleteuser/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        const doc = await User.findByIdAndRemove(_id);

        res.send(doc, "User deleted");
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});

//Update one user

userRouter.patch("/updateuser/:id", async(req, res) => {
    const {
        body: { name, surname, age, email, password },
    } = req;
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
//Añadir un bebe al usuario
// userRouter.patch("/addbaby/:id/:baby", async(req, res) => {

//     const _id = req.params.id;
//     const _baby = req.params.baby.toString();
//     debugger
//     const filter = { _id: _id.toString() };
//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//             filter, {
//                 $addToSet: {
//                     baby: _baby
//                 }
//             }
//         ).populate('baby');
//         res.send(updatedUser);
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).send(error.message);
//     }
// });

module.exports = userRouter;