const request = require('supertest');
const app = require('../server');

it('Usuário Vendedor se cadastra', async () => {

    const response = await request(app)
                           .post('/users/')
                           .send({
                                name: "teste save", 
                                lastName: "teste", 
                                email: "usuariovendedor@gmail.com",
                                cpf: "123456789", 
                                password: "123", 
                                confirmPassword: "123",
                                situation: true
                           })

    expect(response.status).toBe(204)
    //console.log(response.data)

})

it('Cria Categoria', async () => {

    const response = await request(app)
                           .post('/categories/')
                           .send({
                                categorie: "Jardinagem", 
                           })

    expect(response.status).toBe(204)

})

it('Vendedor Cria Produto', async () => {

    const response = await request(app)
                           .post('/products/')
                           .send({
                                productName: "Cimento teste",
                                productDescription: "Descrição do cimento",
                                price: "99.00",
                                image: "",
                                idUserSeller: 1,
                                idCategorie: 1
                           })

    expect(response.status).toBe(204)

})

it('Vendedor consulta produtos cadastrados ', async () => {

    const response = await request(app).get('/users/')

    expect(response.status).toBe(200)

})


it('Usuário Comprador se cadastra', async () => {

    const response = await request(app)
                           .post('/users/')
                           .send({
                                name: "teste save", 
                                lastName: "teste", 
                                email: "usuariocomprador@gmail.com",
                                cpf: "123", 
                                password: "123", 
                                confirmPassword: "123",
                                situation: true
                           })

    expect(response.status).toBe(204)

})

it('Comprador Inclui item no carrinho', async () => {

    const response = await request(app)
                           .post('/bag/')
                           .send({
                                idProduct: 1,
                                idUser: 2
                           })

    expect(response.status).toBe(204)

})


it('Comprador consulta produtos no carrinho ', async () => {

    const response = await request(app).get('/bag/2')

    expect(response.status).toBe(200)

})


