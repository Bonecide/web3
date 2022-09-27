import s from './Usdt.module.scss'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Usdt() {
    const Web3 = require('web3')
    const [accounts,setAccounts] = useState()
      
    if (window.ethereum) {
  
        // res[0] for fetching a first wallet
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => accountChangeHandler(res[0]));
      } else {
        alert("install metamask extension!!");
      }
      const accountChangeHandler = (account) => {
        // Setting an address data
        setAccounts({
          address: account,
        });
      
      };
    function getDataFieldValue(tokenRecipientAddress, tokenAmount) {
        
        const web3 = new Web3();
        const TRANSFER_FUNCTION_ABI = {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"};
        return web3.eth.abi.encodeFunctionCall(TRANSFER_FUNCTION_ABI, [
            tokenRecipientAddress,
            tokenAmount * 1000000   ,
            
        ]);
    

    }
    const transaction =  async (data) => {
      const transactionParameters = {
        from: accounts.address,
        gas: '10000',
        to: '0xFab46E002BbF0b4509813474841E0716E6730136',
        data: getDataFieldValue(data.to, data.value),
       
    };
    
    window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
       
    })
    .then (res => {
      console.log(res)
    })
    .catch (e => {
      console.log(e)
    })
    
    }
    const {
        register,
        handleSubmit,
        reset,
    
      } = useForm({
        mode: "all"
      });
    return(
        <div className={s.container}>
                   
                <div className={s.main}>
                <form onSubmit={handleSubmit(transaction)}>
                     <div className={s.form}>

                         <input required {...register('to')} className={s.input} placeholder='Адресс получателя' type="text" />
                         <input required {...register('value')} className={s.input} placeholder="Колличество USDT" type="number" />
                         <button type="submit">Отправить</button>
                     </div>
                 </form>
                </div>
        </div>
    )
}