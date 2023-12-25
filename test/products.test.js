const request = require('supertest');
const app = require('../server');

it('save', async () => {

    const response = await request(app)
                           .post('/users/')
                           .send({
                                name: "teste save", 
                                lastName: "teste", 
                                email: "testesave@gmail.com",
                                cpf: "123", 
                                password: "123", 
                                confirmPassword: "123",
                                situation: true
                           })

    expect(response.status).toBe(400)
    console.log(response.data)

})

it('get', async () => {

    const response = await request(app).get('/users/')

    expect(response.status).toBe(200)

})


it('getById', async () => {

    const response = await request(app).get('/users/1')

    expect(response.status).toBe(200)

})

it('updateById', async () => {

    const response = await request(app)
                           .put('/users/99')
                           .send({
                            name: "teste", lastName: "teste", cpf: "123"

                           })

    expect(response.status).toBe(400)

})

it('deleteById', async () => {

    const response = await request(app).delete('/users/99')

    expect(response.status).toBe(400)

})

