import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { ethers } from 'ethers';

export const Header = () => {
  const [isConnected, setConnection] = useState(false);
  const [address, setAddress] = useState(null);
  const [reload, setReload] = useState(false);

  let signer;
  useEffect(() => {
    let ad = localStorage.getItem('Account');

    const connection = localStorage.getItem('Connection');
    if (ad) {
      ad =
        localStorage.getItem('Account').slice(0, 6) +
        '...' +
        localStorage.getItem('Account').slice(-4);
      setAddress(ad);
    }
    if (connection === 'true') {
      setConnection(true);
    }
  }, [reload]);

  const walletConnect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      if (network.chainId !== 80001) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }], // Mumbai 80001
        });
      }
      await provider.send('eth_requestAccounts', []);
      signer = provider.getSigner();
      let ad = await signer.getAddress();
      ad = ad.slice(0, 6) + '...' + ad.slice(-4);
      setAddress(ad);
      setConnection(true);

      localStorage.setItem('Account', await signer.getAddress());
      localStorage.setItem('Connection', true);
    } catch (err) {
      if (err.code === 4001) {
        setConnection(false);
        setAddress(null);
      }
      localStorage.setItem('Connection', false);
      localStorage.removeItem('Account');

      setReload(true);
      window.location.reload();
    }
  };

  try {
    window.ethereum.on('accountsChanged', walletConnect);
  } catch (error) {
    alert('Metamask Wallet Not Found!!  ');
  }
  return (
    <div className=" h-max flex">
      <Link to={'/home'}>
        <img src={logo} alt="logo" className=" h-36 ml-10 mt-2 px-6 py-3 " />
      </Link>
      <ul className="flex m-auto mr-2 text-xl pl-2 text-white">
        <Link to={'/home'}>
          <li className="mx-3">Home</li>
        </Link>
        <Link to={'/create'}>
          <li className="mx-3">Create</li>
        </Link>
        <Link to={'/profile'}>
          <li className="mx-3">Profile</li>
        </Link>
      </ul>
      <button
        onClick={walletConnect}
        className=" w-40 px-3 text-xl h-auto m-auto mx-10 overflow-hidden rounded-3xl bg-purple-600 text-white"
      >
        {isConnected
          ? address
            ? address
            : localStorage.getItem('Account')
          : 'Connect Wallet'}
      </button>
    </div>
  );
};
