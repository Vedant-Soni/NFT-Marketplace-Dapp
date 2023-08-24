const express = require('express');
const { listNft } = require('../../controller/listNft/listNft');

const router = new express.Router();

router.post('/listNft', listNft);

module.exports = router;
