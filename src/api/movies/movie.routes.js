const express = require('express');
const { isAuth } = require('../../utils/auth/middlewares/authMiddlewares');
const controller = require('./movie.controller');

const router = express.Router();

router.get('/', controller.indexGet);
router.get("/:id", controller.getById);
router.post('/create', controller.createPost);
router.put("/edit/:id", controller.editPut);
router.delete("/delete/:id", controller.deleteMovie);

module.exports = router;