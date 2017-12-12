const fieldTypes = require('../additionalHelpers/RequiredFieldsAndTypes');

// First we check all fields and then check image.
module.exports.fileFilter = (req, file, cb) => {
  if (!req.body) {
    cb(null, false);
  }

  const requiredParams = ['category_id', 'brand', 'name', 'price', 'is_active'];
  const receivedParams = Object.keys(req.body);

  const notPresentedFields = requiredParams.filter(arr1Item => !receivedParams.includes(arr1Item));

  if (notPresentedFields.length > 0) {
    return cb(new Error(`Required fields are empty: ${notPresentedFields.toString()}`));
  }

  const lengthCheck = 0;

  for (let param of receivedParams) {
    let currentParam = req.body[param];

    if (currentParam.length === lengthCheck) {
      return cb(new Error(`Field ${param} must be longer than ${lengthCheck} symbols.`));
    }

    // Check corresponding data types.
    let preparedParam;
    if (fieldTypes[param] === 'boolean') {
      preparedParam = (currentParam === 'true');
    } else if (fieldTypes[param] === 'number') {
      preparedParam = parseInt(currentParam);
    } else {
      preparedParam = currentParam;
    }

    if (typeof preparedParam !== fieldTypes[param]) {
      return cb(new Error(`Field ${param} must be ${fieldTypes[param]}`));
    }
  }

  const allowedFileTypes = ['image/jpeg', 'image/png'];

  if (allowedFileTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(null, false);
};

module.exports.storage = (multer, staticFolder) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${staticFolder}img/products/`)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  });
};