import React from 'react';
import welcomeImage from '../images/welcomeImage.avif';

export const Welcome = () => {
  return (
    <div className=" h-max bg-red-500 flex">
      <div className=" w-1/2 m-auto mx-40 py-6">
        <p className=" font-sans font-bold text-3xl">
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
