import { formatEther } from 'ethers/lib/utils';
import React, { useEffect, useState } from 'react';
import etherLogo from '../images/Ether.png';
import walletAddress from '../Contract';

export const NftDetail = () => {
  const [nft, setNft] = useState();
  const [address, setAddress] = useState();
  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });
  useEffect(() => {
    const fetchNft = async () => {
      const nft = {
        id: '0',
        name: 'Bored Ape',
        image:
          'https://coffee-different-cat-534.mypinata.cloud/ipfs/QmXW1GNacvagczg9C6zmSAWme7xZxGRL8MrEj1oWRMRA2c',
        description:
          'This is the premium collection for bored ape nft category one.',
        attributes: [
          {
            trait_type: 'Mood',
            value: 'Sleep',
          },
          {
            trait_type: 'Color',
            value: 'Orange',
          },
          {
            trait_type: 'Mood',
            value: 'Sleep',
          },
          {
            trait_type: 'Color',
            value: 'Orange',
          },
        ],
        owner: '0xcc1190D3Aad29b3E29FD435B793A830e8ccFE464',
        price: 1200000000000000000n,
        isListed: true,
      };
      setNft(nft);
    };
    fetchNft();
    const wallet = async () => {
      const { address } = await walletAddress();
      setAddress(address);
    };
    wallet();
  }, []);

  return (
    <div className=" text-white flex">
      <div className=" w-1/2 ml-10">
        <div className=" w-4/5 transform-gpu text-white drop-shadow-md my-4 rounded-3xl p-2 ml-7  bg-indigo-950 ">
          <div className=" h-fit rounded-xl justify-center overflow-hidden  flex">
            <img
              src={nft?.image}
              alt="NFT Image"
              className="rounded-t-xl object-contain h-full self-center"
            />
          </div>
        </div>
      </div>
      <div className=" w-1/2">
        <div className=" mr-10 my-4 border-2 rounded-2x p-5 bg-gray-900">
          <p className=" text-xs text-gray-500">Owner : {nft?.owner}</p>
          <div className="grid grid-cols-2">
            <p className=" text-5xl mt-4 font-bold text-purple-600">
              {nft?.name}
            </p>

            {nft?.isListed ? (
              <p className="mt-2 mr-5 flex justify-end text-4xl font-bold items-end">
                {nft && formatEther(nft?.price)}
                <img src={etherLogo} alt="ether" className="h-10 px-3 " />
              </p>
            ) : (
              ''
            )}
          </div>

          <p className="mt-8 text-gray-400 text-xl">{'Description'}</p>
          <p>{nft?.description}</p>
          <p className=" text-gray-400 mt-3 text-xl">{'Attributes'}</p>
          <div className="w-full grid grid-cols-3 gap-4 h-fit p-6 text-gray-500 border-gray-300">
            {nft?.attributes
              ? nft.attributes.map((e, index) => {
                  return (
                    <p
                      key={index}
                      className="bg-purple-600 p-2 rounded-md text-center flex items-center justify-center"
                    >
                      <div className="">
                        <p className="text-black font-bold">{e.trait_type}</p>
                        <p className="text-white text-base">{e.value}</p>
                      </div>
                    </p>
                  );
                })
              : 'No Attributes provided'}
          </div>

          <div
            className=" border-2 rounded-3xl m-5 text-center cursor-pointer hover:bg-purple-950 "
            style={{ cursor: nft?.isListed ? 'not-allowed' : 'pointer' }}
          >
            {address && address !== nft?.owner ? (
              <button className=" p-2  text-2xl ">Buy</button>
            ) : (
              <button
                className=" p-2  text-2xl "
                disabled={nft?.isListed}
                style={{ cursor: nft?.isListed ? 'not-allowed' : 'pointer' }}
              >
                List
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
