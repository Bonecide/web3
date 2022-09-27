###  Как поменять сеть в Metamask у пользователя
Пример кода можете посмотреть здесь : https://github.com/Bonecide/web3/blob/master/src/components/SwitchNetwork/SwitchNetwork.jsx
```
Никакая библиотека здесь не требуется,всё делается на нативном уровне
```
### Создаём список сетей,которые хотим в будущем хотим подключить,все данные от сети можно найти в гугле
```javascript 
const networks = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"]
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org"
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  },
  
};

``` 
### Создание функций изменения сети 

```javascript
   const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found"); //Проверяем наличие Metamask в браузере
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName]
        }
      ]
    });
  } catch (err) {
    setError(err.message);
  }
};
const [error, setError] = useState();

const handleNetworkSwitch = async (networkName) => { //В networkName передаём ключ от сети,которые мы добавили вначале
  setError();
  await changeNetwork({ networkName, setError });
};
```
### Как поставить сеть ETH обратно 
Для переключения сети на ETH создадим отдельную функцию
```javascript
const setETH = () => {
  window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{
       chainId: "0x1"
    }]
 })
}
```
