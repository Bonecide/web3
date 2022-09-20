import { TonhubConnector , TonhubCreatedSession } from "ton-x";
import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import axios from "axios";
import s from './ton.module.scss'
import { useForm } from "react-hook-form";
import { clear } from "@testing-library/user-event/dist/clear";
export default function Ton() {
    const connector = new TonhubConnector({ network: 'sandbox' });
    const [session,setSession] = useState()
    const [TrueSession,setTrueSession] = useState()
    const [isAuth,setIsAuth] = useState(false)
    const [wallet,setWallet] = useState()
    const [isConnecting,setIsConnecting] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
       
      } = useForm({
        mode: "all"
      });
    useEffect(() => {
        if(!session) {
            connector.createNewSession({
                name: 'Sandbox',
                url: 'https://test.tonhub.com/'
                }).then(res => {
                    setSession(res)
                    setIsConnecting(true)
                })
        }
       
      },[])

   
      useEffect(() => {
       if(TrueSession) {
        setIsAuth(true)
       }
           
           
      },[TrueSession])
      const transaction = (data) => {
        const correctConfig = TonhubConnector.verifyWalletConfig(session.id, wallet);
        if (correctConfig) {
           
            const request = {
                seed: session.seed, // Session Seed
                appPublicKey: wallet.appPublicKey, // Wallet's app public key
                to: data.to, // Destination
                value: data.value * 1000000000, // Amount in nano-tons
                timeout: 5 * 60 * 1000,
                 // 5 minut timeout
               
            };
            alert('Транзакция успешно создана,зайдите в приложение')
            connector.requestTransaction(request).then(res => {
                const result = res
                console.log(result)
                if(result.type === 'success') {
                    alert('Отлично! Транзакция прошла успешно!')
                }
            })
            reset()
            
           
           
        }
      }

   if (isConnecting) {
        connector.awaitSessionReady(session.id,1 * 60 * 1000).then(res => {
            
       
        setTrueSession(res)
        
       
       
       
      
      
    })
    if(TrueSession) {
        setIsConnecting(false)
        
         if (TrueSession.state === 'revoked' || TrueSession.state === 'expired') {
     
         } else if (TrueSession.state === 'ready') {
             
             setWallet (TrueSession.wallet)
             
            
            
          
         
         } else {
             throw new Error('Impossible');
         
        }
        }
   }


    return(
        <div className={s.container}>
                {session && !isAuth && (
                    <div className={s.qr}>
                        <h1>Пожалуйста,просканируйте QR-код и подключите ваш кошелёк</h1>
                        <QRCode value={session.link} renderAs="canvas" />
                        <input  defaultChecked={true}  type="checkbox" />
                    </div>
                )}
               {isAuth && wallet && (
                <div className={s.main}>
                   
                 <form onSubmit={handleSubmit(transaction)}>
                     <div className={s.form}>
                        <h2>Ваш кошелёк : {wallet.address}</h2>
                         <input required {...register('to')} className={s.input} placeholder='Адресс получателя' type="text" />
                         <input required {...register('value')} className={s.input} placeholder="Колличество ton" type="number" />
                         <button type="submit">Отправить</button>
                     </div>
                 </form>
             </div>
               )}
        </div>
    )
}