import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";

const startPayment = async ({ setError, setTxs, ether, addr }) => {
 
  try {
 
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
      gasLimit: ethers.utils.hexlify(100000), // 100000
      gasPrice: provider.getGasPrice() ,
    })
   
   
    setTxs([tx]);
  } 
  
  catch (err) {
    setError(err.message);
    console.log('eeee')
  }
};

export default function WebTest() {
 
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
        <link
    href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1/dist/tailwind.min.css"
    rel="stylesheet"
    type="text/css"
  />
  <link
    href="https://cdn.jsdelivr.net/npm/daisyui@1.12.0/dist/full.css"
    rel="stylesheet"
    type="text/css"
  />
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Recipient Address"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}
