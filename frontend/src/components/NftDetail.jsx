import { formatEther, parseEther } from 'ethers/lib/utils';
import React, { useEffect, useState } from 'react';
import etherLogo from '../images/Ether.png';
import walletAddress from '../Contract';
import { useParams } from 'react-router-dom';

export const NftDetail = () => {
  const { id } = useParams();
  const [nft, setNft] = useState();
  const [address, setAddress] = useState();
  const [sellingAmount, setSellingAmount] = useState('');
  const [isSellPopupOpen, setIsSellPopupOpen] = useState(false); // State for the popup

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });

  const handleBuy = async (price) => {
    const { contract } = await walletAddress();
    const userBalance = await contract.provider.getBalance(address);
    if (userBalance.lte(parseEther(price))) {
      alert('Insufficient Fund');
      return;
    }
    const buyNft = await contract.purchaseNFT(id - 1, {
      value: parseEther(price),
    });
    await buyNft.wait();
    try {
      const params = { id, owner: address };
      const response = await fetch(`http://localhost:5001/buyNft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSell = async () => {
    const { contract } = await walletAddress();
    const sellNft = await contract.listNFTForSale(
      id - 1,
      parseEther(sellingAmount),
    );
    await sellNft.wait();
    const params = { id, price: sellingAmount };
    try {
      const response = await fetch(`http://localhost:5001/listNft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  // Open the sell popup
  const openSellPopup = () => {
    setIsSellPopupOpen(true);
  };

  // Close the sell popup
  const closeSellPopup = () => {
    setIsSellPopupOpen(false);
  };

  // Confirm selling
  const confirmSell = () => {
    // Execute the handleSell() function here
    if (sellingAmount > 0) {
      handleSell();
    } else {
      alert('Invalid amount');
    }

    // Close the popup
    closeSellPopup();
  };

  useEffect(() => {
    const fetchNft = async () => {
      try {
        const response = await fetch(`http://localhost:5001/nftDetail/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const getnftData = await response.json();
        if (getnftData) {
          setNft(getnftData.nftData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNft();
    const wallet = async () => {
      const { address } = await walletAddress();
      setAddress(address);
    };
    wallet();
  }, []);

  return (
    <div className=" text-white flex h-screen">
      <div className=" w-1/2 ml-10">
        <div className=" w-4/5 transform-gpu text-white drop-shadow-md my-4 rounded-3xl p-2 ml-7  bg-indigo-950 ">
          <div className="  rounded-xl justify-center overflow-hidden flex">
            <img
              src={nft?.image}
              alt="NFT Image"
              className="rounded-t-xl h-full object-contain self-center"
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
                {nft && nft?.price.slice(0, 6)}
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

          <div className=" border-2 rounded-3xl m-5 text-center cursor-pointer hover:bg-purple-950 ">
            {address && address !== nft?.owner ? (
              <button
                className="w-full p-2  text-2xl "
                style={{ cursor: nft?.isListed ? 'pointer' : 'not-allowed' }}
                onClick={() => handleBuy(nft?.price)}
              >
                Buy
              </button>
            ) : (
              <button
                className="w-full p-2  text-2xl "
                disabled={nft?.isListed}
                style={{ cursor: nft?.isListed ? 'not-allowed' : 'pointer' }}
                onClick={() => openSellPopup()}
              >
                List
              </button>
            )}
          </div>
          {/* Sell Popup */}
          {isSellPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-70 bg-gray-900">
              <div className="bg-white p-6 rounded-md">
                <p className="text- text-purple-700 font-semibold mb-3">
                  Enter Selling Amount
                </p>
                <input
                  type="text"
                  value={sellingAmount}
                  onChange={(e) => setSellingAmount(e.target.value)}
                  className="border text-purple-700 border-gray-300 p-2 rounded-md mb-3 w-full"
                />
                <div className="flex justify-center">
                  <button
                    className="bg-purple-600 text-white px-4 py-2 rounded-md mr-2"
                    onClick={confirmSell}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    onClick={closeSellPopup}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
