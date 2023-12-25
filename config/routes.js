
module.exports = app => {

    app.route('/users')
        .post(app.api.users.save)
        .get(app.api.users.get)

    app.route('/users/:id')
        .get(app.api.users.getById)
        .put(app.api.users.updateById)
        .delete(app.api.users.deleteById)

    app.route('/login')
        .post(app.api.login.post)
        .delete(app.api.login.deleteById)

    app.route('/address')
        .post(app.api.address.save)
        .get(app.api.address.get)

    app.route('/address/:id')
        .get(app.api.address.getById)
        .put(app.api.address.updateById)
        .delete(app.api.address.deleteById)

    app.route('/categories')
        .post(app.api.categories.save)
        .get(app.api.categories.get)

    app.route('/categories/:id')
        .get(app.api.categories.getById)
        .put(app.api.categories.updateById)
        .delete(app.api.categories.deleteById)

    app.route('/products')
        .post(app.api.products.save)
        .get(app.api.products.get)

    app.route('/products/search')
        .get(app.api.products.getByName)

    app.route('/products/:id')
        .get(app.api.products.getByIdSeller)
        .put(app.api.products.updateByProductId)
        .delete(app.api.products.deleteByProductId)

    app.route('/bag')
        .post(app.api.bag.save)
        
    app.route('/bag/:id')
        .get(app.api.bag.get)
        .delete(app.api.bag.deleteById)

    app.route('/orders')
        .post(app.api.orders.save)
        .get(app.api.orders.get)

    app.route('/orders/:id')
        .get(app.api.orders.getById)
        .put(app.api.orders.updateById)
        .delete(app.api.orders.deleteById)

}       

