const db = require('../../../models/index');

const ownedNft = async (req, res) => {
  const owner = req.params.owner;
  try {
    const nftData = await db.nftdetail.findAll({
      where: {
        owner,
      },
    });
    res.status(200).json({ nftData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = { ownedNft };
