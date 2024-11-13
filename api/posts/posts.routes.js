const express = require('express');
const router = express.Router();
const {
  postsGet,
  postsUpdate,
  postsDelete,
  postsCreate,
  postsGetBySlug,
} = require('./posts.controllers');
const upload = require("../../middleware/multer");

const { validate, ValidationError, Joi } = require('express-validation')

const titleValidation = {
  body: Joi.object({
    title: Joi.string()
      .regex(/[a-zA-Z]{3,40}/)
      .required(),
    body: Joi.string(),
    image: Joi.string(),
  }),
}


const handleErrors = function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message || 'Internal Server Error' });
};

router.get('/', postsGet, handleErrors);

router.post('/', upload.single('image'), postsCreate, handleErrors);
router.val = function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
};

router.delete('/:postId', postsDelete, handleErrors);

router.put('/:postId', postsUpdate, handleErrors);

router.get('/:slug', postsGetBySlug, handleErrors);

module.exports = router;
