const express = require('express');
const { ownedNft } = require('../../controller/ownedNft/ownedNft');

const router = new express.Router();

router.get('/ownedNft/:owner', ownedNft);

module.exports = router;
