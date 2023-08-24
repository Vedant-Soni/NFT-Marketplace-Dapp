const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const createNft = require('./src/routes/createNft/createNft');
const listNft = require('./src/routes/listNft/listNft');
const buyNft = require('./src/routes/buyNft/buyNft');
const getListedNft = require('./src/routes/getListedNft/getListedNft');
const ownedNft = require('./src/routes/ownedNft/ownedNft');

app.use(express.json());

app.use(createNft);
app.use(listNft);
app.use(buyNft);
app.use(getListedNft);
app.use(ownedNft);

const server = app.listen(port, () => {
  console.log('Server Running on port: ', port);
});

module.exports = server;
