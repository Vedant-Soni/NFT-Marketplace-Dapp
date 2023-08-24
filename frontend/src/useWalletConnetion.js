import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useWalletConnection = () => {
  const [isConnected, setConnection] = useState(false);
  const [address, setAddress] = useState(null);

  const checkNetworkAndConnect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 80001) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }],
        });
      }
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const ad = await signer.getAddress();
      setAddress(ad);
      setConnection(true);

      localStorage.setItem('Account', ad);
      localStorage.setItem('Connection', true);
    } catch (err) {
      if (err.code === 4001) {
        setConnection(false);
        setAddress(null);
      }
      localStorage.setItem('Connection', false);
      localStorage.removeItem('Account');

      // window.location.reload();
    }
  };

  useEffect(() => {
    const connection = localStorage.getItem('Connection');
    if (connection === 'true') {
      setConnection(true);
    }
  }, []);

  useEffect(() => {
    try {
      window.ethereum.on('accountsChanged', checkNetworkAndConnect);
    } catch (error) {
      alert('Metamask Wallet Not Found!!');
    }
  }, []);

  return { isConnected, address, checkNetworkAndConnect };
};
