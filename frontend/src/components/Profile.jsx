import React, { useEffect, useState } from 'react';
import banner from '../images/banner.jpeg';
import etherLogo from '../images/Ether.png';
import { NavLink } from 'react-router-dom';
import { formatEther } from 'ethers/lib/utils';

export const Profile = () => {
  const [nft, setNft] = useState();
  useEffect(() => {
    const fetchNft = async () => {
      const nft = [
        {
          id: '0',
          name: 'NFT',
          image: '',
          description: '',
          attributes: [],
          owner: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
          price: 0n,
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
      <div className=" lg:h-80 h-36 items-center flex md:h-60 sm:h-40 ">
        <img
          src={banner}
          alt="banner"
          className="object-cover px-10 h-full w-full"
        />
      </div>
      <div className="">
        <p className="text-white my-8 ml-10 text-4xl  ">Your NFT Collections</p>
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
                        {formatEther(element.price) > 0
                          ? formatEther(element.price)
                          : ''}
                        <img src={etherLogo} alt="" className="h-5 px-3 mt-1" />
                      </p>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })
        ) : (
          <div className=" bg-purple-600 text-white h-10 w-48 mb-4 ml-10 ">
            <p className=" m-2 font-bold"> {'No NFT Listed Yet..!!'} </p>
          </div>
        )}
      </div>
    </div>
  );
};
