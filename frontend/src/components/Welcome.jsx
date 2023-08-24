import React from 'react';
import welcomeImage from '../images/welcomeImage.avif';

export const Welcome = () => {
  return (
    <div className=" h-max flex">
      <div className=" w-1/2 m-auto mx-40 py-6 text-purple-600">
        <p className=" font-sans font-bold text-7xl">
          Welcome to the World of NFT
        </p>
        <p>One stop dApp for all NFTs</p>
      </div>
      <div className=" w-1/2 m-auto py-6">
        <img src={welcomeImage} alt="welcome Image" className=" w-80" />
      </div>
    </div>
  );
};
