'use strict';

module.exports = (app, upload) => {
  // We could use here DI as we did it with app, but no need as for now, because we'll have only one route module.
  const MainController = require('../Controllers/MainController');

  app.route('/')
      .get(MainController.main);

  app.route('/products')
      .get(MainController.getProduct);

  app.route('/products/update')
      .put(MainController.updateProduct);

  app.post('/products/create', async (req, res) => {
    return await MainController.createProduct(req, res, upload);
  });
};