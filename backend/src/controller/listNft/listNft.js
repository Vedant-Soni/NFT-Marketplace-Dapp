const db = require('../../../models/index');

const listNft = async (req, res) => {
  const { id, price } = req.body;
  try {
    await db.nftdetail.update(
      {
        isListed: true,
        price,
      },
      {
        where: {
          id,
        },
      },
    );
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = { listNft };
