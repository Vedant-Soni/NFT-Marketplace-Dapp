const express = require('express');
const { getListedNft } = require('../../controller/getListedNft/getListedNft');

const router = new express.Router();

router.get('/getListedNft', getListedNft);

module.exports = router;
