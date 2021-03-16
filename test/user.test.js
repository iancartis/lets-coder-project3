const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

describe('Test all user connections', () => {

    test('users are returned as json', async() => {
        await api
            .get("/users")
            .set('Authorization', 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTU3Mjk2NDgsImV4cCI6MTYxNTgxNjA0OH0.rtEMdeJ8Hvxy30kv0CqVHWnT68d85eUvtOWk5bukCcg")
            .expect(200)
            .expect('Content-type', "application/json; charset=utf-8")

    })
    test('create user returns an json object', async() => {
        await api
            .post("/create_user")
            .set('Authorization', 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTU3Mjk2NDgsImV4cCI6MTYxNTgxNjA0OH0.rtEMdeJ8Hvxy30kv0CqVHWnT68d85eUvtOWk5bukCcg")
            .field('name', 'Alex')
            .expect(200)
            .expect('Content-type', "application/json; charset=utf-8")

    })

    afterAll(async() => {
        await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    });
})