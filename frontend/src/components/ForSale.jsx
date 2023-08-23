import React, { useEffect, useState } from 'react';

export const ForSale = () => {
  const [nft, setNft] = useState();
  useEffect(() => {
    const fetchNft = async () => {
      const nft = [
        {
          id: '0',
          name: 'NFT 1',
          image:
            'https://coffee-different-cat-534.mypinata.cloud/ipfs/QmXW1GNacvagczg9C6zmSAWme7xZxGRL8MrEj1oWRMRA2c',
          description: 'Hello NFT 1',
          attributes: [],
          owner: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
          price: 1200000000000000000n,
        },
      ];
      setNft(nft);
    };
    fetchNft();
  }, []);

  return (
    <div className=" h-96 bg-blue-700">
      <div className="text-center pt-6">
        <p className=" text-5xl">Listed NFTs</p>
      </div>
      <div>
        <p>
          {nft ? (
            nft.map((element, index) => {
              return element.id;
            })
          ) : (
            <p> {'No NFT Listed Yet..!!'} </p>
          )}
        </p>
      </div>
    </div>
  );
};
