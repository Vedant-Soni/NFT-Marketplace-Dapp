const db = require('../../../models/index');

const buyNft = async (req, res) => {
  const { tokenId, owner } = req.body;
  try {
    await db.nftdetail.update(
      {
        isListed: false,
        price: 0,
        owner,
      },
      {
        where: {
          tokenId,
        },
      },
    );
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = { buyNft };
