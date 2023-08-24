const db = require('../../../models/index');

const getListedNft = async (req, res) => {
  try {
    const nftData = await db.nftdetail.findAll({
      where: {
        isListed: true,
      },
    });
    res.status(200).json({ nftData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = { getListedNft };
