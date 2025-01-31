const express = require('express');
const { createPermit, getPermit } = require('../controllers/permitController');
const validatePermit = require('../middleware/validator');
const router = express.Router();

router.post('/', validatePermit, createPermit);
router.get('/:id', getPermit);

module.exports = router;