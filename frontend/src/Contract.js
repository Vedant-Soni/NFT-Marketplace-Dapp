import { ethers } from 'ethers';
import { ABI } from './ABI';

const walletAddress = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const contract = new ethers.Contract(
    '0xed57a0AC449C040C43DA24455fA9d4CA92569000',
    ABI,
    signer,
  );
  return { address, contract };
};

export default walletAddress;
