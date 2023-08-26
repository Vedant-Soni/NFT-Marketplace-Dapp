import { ethers } from 'ethers';
import { ABI } from './ABI';

const walletAddress = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const contract = new ethers.Contract(
    '0x8F9a3C162AB13C743A91324d630Af316371b7f3D',
    ABI,
    signer,
  );
  return { address, contract };
};

export default walletAddress;
