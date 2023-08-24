const express = require('express');
const { buyNft } = require('../../controller/buyNft/buyNft');

const router = new express.Router();

router.post('/buyNft', buyNft);

module.exports = router;
