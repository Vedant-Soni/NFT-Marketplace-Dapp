import React, { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ThreeDots } from 'react-loader-spinner';
import walletAddress from '../Contract';
import { useWalletConnection } from '../useWalletConnetion';

export const CreateNft = () => {
  const { checkNetworkAndConnect } = useWalletConnection();
  const [traitsDropdown, setTraitsDropdown] = useState(false);
  const [address, setAddress] = useState();

  const [traitsType, setTraitType] = useState('');
  const [traitsValue, setTraitsValue] = useState('');
  const [traits, setTraitData] = useState([]);

  const uploadImage = useRef(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = React.useState(false);

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });

  useEffect(() => {
    const wallet = async () => {
      const { address } = await walletAddress();
      setAddress(address);
    };
    wallet();
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const setTrait = () => {
    if (traitsType !== '' && traitsValue !== '') {
      const currentTrait = {
        trait_type: traitsType,
        value: traitsValue,
      };
      setTraitData([...traits, currentTrait]);
    }
  };

  const removeTraits = (index) => {
    const indexToRemove = index;
    if (indexToRemove >= 0 && indexToRemove < traits.length) {
      const newArray = [...traits];
      newArray.splice(indexToRemove, 1);
      setTraitData(newArray);
    }
  };
  const uploadToIpfs = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    const requestOptions = {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
    };

    try {
      const response = await fetch(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        requestOptions,
      );
      const data = await response.json();
      return data.IpfsHash;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateNFT = async () => {
    try {
      if (selectedFile && name) {
        handleClickOpen();
        const imageIpfsHash = await uploadToIpfs(selectedFile);
        const imageUrl = `https://coffee-different-cat-534.mypinata.cloud/ipfs/${imageIpfsHash}`;
        const generatedMetadata = await uploadMeta(imageUrl);

        checkNetworkAndConnect();
        const { contract } = await walletAddress();
        const mintNFT = await contract.safeMint(
          `https://coffee-different-cat-534.mypinata.cloud/ipfs/${generatedMetadata}`,
        );
        await mintNFT.wait();
        const params = {
          name,
          image: imageUrl,
          description,
          attributes: traits,
          metadata: generatedMetadata,
          owner: address,
        };
        try {
          const response = await fetch(`http://localhost:5001/createNft`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          });
          await response.json();
          alert('NFT Created Successfully');
          window.location.reload();
        } catch (error) {
          console.log(error);
        }

        handleClose();
      } else {
        alert('NFT Image and Name is necessary');
      }
    } catch (error) {
      handleClose();
      console.log(error);
      alert('NFT Creation Failed');
    }
  };
  const metadata = {};
  const uploadMeta = async (imageUrl) => {
    metadata.name = name;
    metadata.description = description;
    metadata.image = imageUrl;
    if (traits) {
      metadata.attributes = traits;
    }

    const json = JSON.stringify(metadata, null, 2);

    const file = new File([json], 'metadata.json', {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
          },
        },
      );
      const data = await response.json();
      return data.IpfsHash;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pt-1 py-10">
      <div className="justify-center flex pt-2 text-left">
        <div className=" w-1/3">
          <p className="text-3xl text-white my-2 p-2 text-center">
            Create New Item
          </p>
          \
          <div className=" p-4">
            <div>
              <h1>Upload Your Art Here</h1>
              <div
                className="bg-gray-200 border border-gray-400 h-56 relative rounded-xl cursor-pointer group "
                onClick={() => {
                  uploadImage.current.click();
                }}
              >
                {selectedFile && (
                  <div className="h-full justify-center flex object-cover ">
                    {selectedFile.type.startsWith('image/') && (
                      <img
                        className="h-full "
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected File"
                      />
                    )}
                  </div>
                )}
                <div className="h-full w-full group-hover:backdrop-blur-sm absolute top-0 left-0 rounded-xl">
                  <p className="absolute  left-1/2 top-1/2 text-center  opacity-0  transition-opacity duration-300  group-hover:opacity-100 group-hover:flex ">
                    <span className="material-symbols-outlined left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2 text-7xl ">
                      +
                    </span>
                  </p>
                  {selectedFile && (
                    <span
                      className="material-symbols-outlined absolute right-1 top-1 opacity-0  transition-opacity duration-300  group-hover:opacity-100 group-hover:flex"
                      onClick={(event) => {
                        setSelectedFile(null);
                        event.stopPropagation();
                      }}
                    >
                      Remove
                    </span>
                  )}
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
                ref={uploadImage}
              />
            </div>
          </div>
          {/* Name */}
          <div className="flex flex-col text-white p-4">
            <label> Name</label>
            <input
              type="text"
              placeholder="NFT Name"
              className="bg-transparent border text-purple-600 border-gray-400 rounded-xl p-4 outline-0"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          {/* Description */}
          <div className="flex flex-col text-white p-4">
            <label> Description</label>
            <textarea
              rows=""
              cols=""
              placeholder="Provide a detailed description of your NFT."
              className="bg-transparent border text-purple-600 border-gray-400 rounded-xl p-4 outline-0"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          {/* properties-traits */}
          <div className="flex flex-col p-4 justify-center ">
            <div className="flex justify-between bg-transparent rounded-xl mb-2 ">
              <p className=" text-white">Properties</p>
              <div>
                <span
                  className="material-symbols-outlined text-white  bg-purple-600 rounded-xl p-2 cursor-pointer"
                  onClick={() => setTraitsDropdown(!traitsDropdown)}
                >
                  {!traitsDropdown ? 'Add' : 'Close'}
                </span>
              </div>
            </div>

            {/* current traits div */}
            {traits.length > 0 ? (
              <div className="bg-transparent border grid grid-cols-3 p-4 gap-2 border-gray-400 rounded-xl my-2 ">
                {traits.map((e, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-purple-600 p-2 rounded-md text-center flex items-center justify-between"
                    >
                      <div>
                        <p className=" font-bold">{e.trait_type}</p>
                        <p className="">{e.value}</p>
                      </div>
                      <div>
                        <span
                          className="material-symbols-outlined cursor-pointer"
                          onClick={() => {
                            removeTraits(index);
                          }}
                        >
                          &#128465;
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
            {/* prop form */}
            {traitsDropdown ? (
              <div className="bg-transparent border border-gray-400 rounded-xl my-2">
                <div className="my-2 flex w-full gap-4 text-center p-6 ">
                  <div>
                    <p className="text-white">Type</p>
                    <input
                      type="text"
                      placeholder="Type"
                      className="w-full border text-purple-600 border-gray-400 rounded-xl p-2 bg-transparent"
                      onChange={(event) => {
                        setTraitType(event.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-white">Name</p>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border text-purple-600 border-gray-400 rounded-xl p-2 bg-transparent"
                      onChange={(event) => {
                        setTraitsValue(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="p-8">
                  <button
                    className="p-2 bg-purple-600 w-full rounded-xl text-white my-2"
                    onClick={() => setTrait()}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* create button */}
          <div className="justify-center w-full p-4">
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Transaction Running...
              </DialogTitle>
              <DialogContent>
                <div className="text-center  flex flex-col">
                  <div className="flex justify-center">
                    <p className="text-xl">Nft Creating</p>
                  </div>
                </div>
              </DialogContent>
              <div className="flex justify-center">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#9DB2BF"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            </Dialog>
            <button
              className="bg-purple-950 hover:bg-purple-600 transition-all duration-300 px-4 py-2 text-2xl  text-white rounded-xl w-full"
              onClick={() => {
                handleCreateNFT();
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
