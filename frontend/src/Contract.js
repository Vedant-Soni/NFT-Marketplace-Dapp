import { ethers } from 'ethers';
import { ABI } from './ABI';

const walletAddress = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const contract = new ethers.Contract(
    '0xcd29cb5508d1150b2683366705759A7283bE595b',
    ABI,
    signer,
  );
  return { address, contract };
};

export default walletAddress;
