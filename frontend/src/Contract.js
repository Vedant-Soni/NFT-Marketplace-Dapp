import { ethers } from 'ethers';
import { ABI } from './ABI';

const walletAddress = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const contract = new ethers.Contract(
    '0xCA6C2b31853268f045253860D77455A6906076c6',
    ABI,
    signer,
  );
  return { address, contract };
};

export default walletAddress;
