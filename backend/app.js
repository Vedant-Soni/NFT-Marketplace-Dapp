const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const createNft = require('./src/routes/createNft/createNft');
const listNft = require('./src/routes/listNft/listNft');
const buyNft = require('./src/routes/buyNft/buyNft');
const getListedNft = require('./src/routes/getListedNft/getListedNft');
const ownedNft = require('./src/routes/ownedNft/ownedNft');
const nftDetail = require('./src/routes/nftDetail/nftDetail');

app.use(express.json());
app.use(cors());
app.use(createNft);
app.use(listNft);
app.use(buyNft);
app.use(getListedNft);
app.use(ownedNft);
app.use(nftDetail);

const server = app.listen(port, () => {
  console.log('Server Running on port: ', port);
});

module.exports = server;
