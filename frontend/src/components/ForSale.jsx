import { formatEther } from 'ethers/lib/utils';
import React, { useEffect, useState } from 'react';
import etherLogo from '../images/Ether.png';
import { NavLink } from 'react-router-dom';
export const ForSale = () => {
  const [nft, setNft] = useState();
  useEffect(() => {
    const fetchNft = async () => {
      const nft = [
        {
          id: '0',
          name: '',
          image: '',
          description: '',
          attributes: [],
          owner: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
          price: 1200000000000000000n,
        },
        {
          id: '0',
          name: 'NFT 1',
          image:
            'https://marketplace.canva.com/EAE-xnqWvJk/1/0/1600w/canva-retro-smoke-and-round-light-desktop-wallpapers-JLofAI27pCg.jpg',
          description: 'Hello NFT 1',
          attributes: [],
          owner: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
          price: 1200000000000000000n,
        },
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
      if (nft.length !== 0) {
        setNft(nft);
      }
    };
    fetchNft();
  }, []);

  return (
    <div className="">
      <div className="text-center pt-6">
        <p className=" text-5xl text-purple-600 ">Listed NFTs</p>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {nft ? (
          nft.map((element, key) => {
            return (
              <div index={key} className=" ml-6">
                <NavLink
                  to={{
                    pathname: `/nftdetail/${element.id}`,
                  }}
                >
                  <div className=" transform-gpu h-96 hover:-translate-y-3 text-white  drop-shadow-md hover:drop-shadow-2xl my-4 rounded-3xl p-6 transition-all duration-200 bg-indigo-950 flex flex-col justify-between">
                    <div className=" h-fit rounded-xl justify-center overflow-hidden  flex">
                      <img
                        src={element.image}
                        alt="NFT Image"
                        className="rounded-t-xl object-contain h-full self-center"
                      />
                    </div>
                    <div className="flex justify-between mt-4 items-center">
                      <p className="text-xl">
                        {element.name.length > 15
                          ? element.name.slice(0, 15) + '...'
                          : element.name}
                      </p>
                      <p className="text-lg flex ">
                        {formatEther(element.price)}
                        <img src={etherLogo} alt="" className="h-5 px-3 mt-1" />
                      </p>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })
        ) : (
          <p> {'No NFT Listed Yet..!!'} </p>
        )}
      </div>
    </div>
  );
};
