const express = require('express');
const { createNft } = require('../../controller/createNft/createNft');
const router = new express.Router();

router.post('/createNft', createNft);

module.exports = router;
