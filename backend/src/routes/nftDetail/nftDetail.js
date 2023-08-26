const express = require('express');
const { NftDetail } = require('../../controller/nftDetail/nftDetail');

const router = new express.Router();

router.get('/nftDetail/:id', NftDetail);

module.exports = router;
