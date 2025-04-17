import React from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
const Home = () => {

  const {coins,currency}=React.useContext(CoinContext);
  const [displayCoin,setDisplayCoin]=React.useState([]);

  //we are copying data from coins to displayCoin
  //this is done to avoid infinite loop of rendering
  React.useEffect(()=>{
    setDisplayCoin(coins);
  },[coins])




  return (
    <div className='home'>
      <div className="hero">
        <h1>Cryptocurrency Prices by Market Cap</h1>
        <form >
          <input type="text" placeholder='Search'/>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto_table">
        <div className="table_layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24H Change</p>
          <p className='marketCap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,20).map((coin,index)=>(
            <div className="table_layout" key={index}>
              <p>{coin.market_cap_rank}</p>
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default Home
