const express = require('express');
const mongoose = require('mongoose')

const fs = require('fs');
const app = express();
const port = process.env.port || 3000;
const connectDB = require('./DB/connection');
connectDB();
const userRouter = require('./route/user');
const babyRouter = require('./route/baby');
const registerRouter = require('./route/register');
const registerRouterValues = require('./route/registerValues');





// const User = require('./models/user');
// const { db } = require('./models/user');
// Middlewares to parse bodys
app.use(express.json())
app.use(express.urlencoded())

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})

app.use(userRouter);
app.use(babyRouter);
app.use(registerRouter);
app.use(registerRouterValues);


app.get('/', (req, res) => {
    fs.readFile('./views/register.html', 'utf8', (error, content) => {
        if (error) return res.send(`sorry, there was an error: ${error.message}`)

        res.send(content)
    })

})


// app.post('/', (req, res) => {
//     const { body: { name, surname, age, email, password } } = req
//     let newUser = new User({
//         "firstName": name,
//         "surName": surname,
//         "age": age,
//         "email": email,
//         "password": password
//     })
//     try {
//         return newUser.save()
//             .then(document => {
//                 console.log(document);
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//             .then(doc => res.send(doc));
//     } catch (err) {
//         res.status(500).send(err);
//     }

//     //TO-DO: Añadir el disconnect de la BD

// });

// app.get('/users', (req, res) => {
//     User.find({}, function(err, users) {
//         if (err) console.log(`There's been an error: ${err.message}`)
//         res.send(users);
//     });
// })