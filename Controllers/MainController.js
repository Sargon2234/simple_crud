'use strict';
const Product = require('../Models').Product;

module.exports.main = (req, res) => {
  res.json({ status: 'ok' });
};

module.exports.getProduct = async (req, res) => {
  let where = {
    is_active: true,
  };

  if (req.query.category && req.query.name) {
    where = {
      is_active: true,
      category_id: req.query.category,
      name: req.query.name
    };

    return await sendData(res, where);
  }

  if (req.query.category) {
    where = {
      is_active: true,
      category_id: req.query.category,
    };

    return await sendData(res, where);
  }

  if (req.query.name) {
    where = {
      is_active: true,
      name: req.query.name,
    };

    return await sendData(res, where);
  }

  return await sendData(res, where);
};

const sendData = async (res, where) => {
  try {
    let data = await Product.findAll({
      where,
    });

    let clearReturn = {};

    for (let d of data) {
      if (!clearReturn[d.category_id]) {
        clearReturn[d.category_id] = [];
      }

      clearReturn[d.category_id].push(d);
    }

    return res.json({ status: 'ok', data: clearReturn });
  } catch (e) {
    console.error(e.message);
    return sendErrorResponse(res, e.message);
  }
};

module.exports.createProduct = async (req, res, upload) => {
  upload.single('image')(req, res, async (err) => {

    if (err) {
      return sendErrorResponse(res, err.message);
    }

    const params = req.body;
    params.image = req.file.path;

    try {
      const freshProduct = Product.build(params);
      const saved = await freshProduct.save();

      return res.json({ status: 'ok', data: saved });

    } catch (e) {
      return sendErrorResponse(res, e.message);
    }
  });
};

module.exports.updateProduct = async (req, res) => {
  let id = req.body.product_id;

  if (id) {
    // Simple check if id is number.
    if (isNaN(id)) {
      return sendErrorResponse(res, 'Service accept only numeric ids.');
    }

    try {
      const selectedProduct = await Product.findOne({
        where: {
          id
        }
      });

      if (selectedProduct) {
        selectedProduct.update({ is_active: !selectedProduct.is_active });
      }

      return res.json({ status: 'ok', data: selectedProduct });
    } catch (e) {
      console.error(e.message);

      return sendErrorResponse(res, e.message);
    }
  }

  sendErrorResponse(res, 'ok', 'Product id was not provided.');
};

// We have a lot of error messages, it's better to handle them in one place.
const sendErrorResponse = (res, message) => {
  res.json({ status: 'error', message });
};
