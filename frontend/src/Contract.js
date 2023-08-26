import { ethers } from 'ethers';
import { ABI } from './ABI';

const walletAddress = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const contract = new ethers.Contract(
    '0x8bD22C2981Cd0Ce46Dd1b3Cbf1EEFd8212b95BaD',
    ABI,
    signer,
  );
  return { address, contract };
};

export default walletAddress;
