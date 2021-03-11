const express = require('express');
const mongoose = require('mongoose')
const fs = require('fs');
const app = express();
const port = process.env.port || 3000;

//Connection DB
const connectDB = require('./connection/connection');
connectDB();


//Import Routers
const userRouter = require('./route/user');
const babyRouter = require('./route/baby');
const registerRouter = require('./route/register');
const registerHeight = require('./route/height');
const registerWeight = require('./route/weight');
const registerSleep = require('./route/sleep');
const registerFeed = require('./route/feed');
const registerComment = require('./route/comment');








// Middlewares to parse bodys
app.use(express.json())
app.use(express.urlencoded())

//Listening...
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})

//Use routers
app.use(userRouter);
app.use(babyRouter);
app.use(registerRouter);
// app.use(registerRouterValues);
app.use(registerHeight);
app.use(registerWeight);
app.use(registerSleep);
app.use(registerFeed);
app.use(registerComment);







app.get('/', (req, res) => {
    fs.readFile('./views/register.html', 'utf8', (error, content) => {
        if (error) return res.send(`sorry, there was an error: ${error.message}`)

        res.send(content)
    })

})