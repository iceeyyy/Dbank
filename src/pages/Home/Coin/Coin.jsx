import React from 'react'
import './Coin.css'
import{ useParams } from 'react-router-dom';
import {CoinContext} from '../../../context/CoinContext'
import LiveChart from '../../../components/LiveChart/LiveChart';

const Coin = () => {

  const {coinId}=useParams();
  const [coinData,setCoinData]=React.useState();
  const [HistoricalData,setHistoricalData]=React.useState();
  const {currency}=React.useContext(CoinContext);

  const fetchCoinData=async()=>{

    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-AxR2hhSNs4c1jeHEyPzgRudg'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
    
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-AxR2hhSNs4c1jeHEyPzgRudg'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  React.useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
  },[currency,coinId])

  console.log('Currency:', currency.name);
  if(coinData && HistoricalData){
    return (
      <div className='coin'>
        <div className="coinName">
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className="coinChart">
          <LiveChart HistoricalData={HistoricalData}/>
        </div>
        <div className="coinInfo">
          <ul>
            <li>
              Crypto Market Rank
            </li>
            <li>{coinData.market_cap_rank}</li>
          </ul>

          <ul>
            <li>
              Current Price
            </li>
            <li>{currency.symbol} {
            coinData?.market_data?.current_price[currency.name]
            ? coinData.market_data.current_price[currency.name].toLocaleString()
            :'N/A'
             }</li>
          </ul>

          <ul>
            <li>
              Market Cap
            </li>
            <li>{currency.symbol} {
            coinData?.market_data?.market_cap[currency.name]
            ?coinData.market_data.market_cap[currency.name].toLocaleString()
            :'N/A'
            }</li>
          </ul>
          <ul>
            <li>
              24H High
            </li>
            <li>{currency.symbol} {
               coinData?.market_data?.high_24h?.[currency.name]
               ? coinData.market_data.high_24h[currency.name].toLocaleString()
               : 'N/A' 
              }</li>
          </ul>
          <ul>
            <li>
              24H Low
            </li>
            <li>{currency.symbol} {
                 coinData?.market_data?.low_24h?.[currency.name]
                ? coinData.market_data.low_24h[currency.name].toLocaleString()
                : 'N/A'
                }</li>
          </ul>

        </div>
      </div>
    )
}
else{
  return (
    <div className='spinner'>
      <div className="spin">
      
      </div>
    </div>
    
  )
}
}

export default Coin
