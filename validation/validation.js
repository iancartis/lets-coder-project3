const { json } = require("express")

const validation = {
    validateEmail(email) {

        if (typeof email !== 'string') throw new TypeError(`not a valid ${email}`)
        if (!email.trim().length) throw new Error(`${email} is empty or blank`)
        if (!/^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/) throw new Error(`${email} is no valid`)
    },
    validatePassword(password) {
        if (typeof password !== 'string') throw new TypeError(`not a valid ${password}`)
        if (!password.trim().length) throw new Error(`password is empty or blank`)
        if (password.length < 8) throw new Error(`password does not have the required length`)
    },
    validateId(id) {
        if (typeof id !== 'string') throw new TypeError(`not a valid ${id}`)
        if (id.length !== 24) throw new Error('id length is not 24')
    },
    validateAge(age) {
        if (typeof age !== 'number') throw new TypeError(`${age} is not a number`)

    },
    validateString(string) {
        if (typeof string !== 'string') throw new TypeError(` ${string} is not a valid string`)
        if (!string.trim().length) throw new Error(`${string} is empty or blank`)
    },
    validateArray(array) {
        if (typeof array !== 'array') throw new TypeError(`${array} is not a valid array`)
        array.forEach((element) => {
            if (typeof element !== "string") throw new TypeError(`${element} is not a valid string`)
            if (!element.trim().length) throw new Error(`${element} is empty or blank`)

        })
    },
    validateHeight(height) {
        if (typeof height !== 'number') throw new TypeError(`${height} is not a number`)

    },
    validateWeight(weight) {
        if (typeof weight !== 'number') throw new TypeError(`${weight} is not a number`)
    },
    validateValue(value) {
        if (typeof value !== 'number') throw new TypeError(`${value} is not a number`)
    },


}

module.exports = validation