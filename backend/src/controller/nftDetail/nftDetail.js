const db = require('../../../models/index');

const NftDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const nftData = await db.nftdetail.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({ nftData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = { NftDetail };
