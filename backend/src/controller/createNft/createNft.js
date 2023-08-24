const db = require('../../../models/index');

const createNft = async (req, res) => {
  try {
    const { name, image, description, attributes, metadata, owner } = req.body;
    const getid = await db.nftdetail.max('id');
    let tokenId = 0;
    if (getid) {
      tokenId = getid;
    }
    await db.nftdetail.create({
      tokenId,
      name,
      image,
      description,
      attributes,
      metadata,
      owner,
      isListed: false,
      price: 0,
    });
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
module.exports = { createNft };
