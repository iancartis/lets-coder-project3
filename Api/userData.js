const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const route = express.route();

route.post('./user', (req, res) => {
    const { firstName, surName } = req.body;
    // {firstName, surName} = user
})