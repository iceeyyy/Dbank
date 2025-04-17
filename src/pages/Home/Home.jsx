import React from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
const Home = () => {

  const {coins,currency}=React.useContext(CoinContext);
  const [displayCoin,setDisplayCoin]=React.useState([]);
  const [input,setInput]=React.useState("");
  
  const inputHandler=(e)=>{
    setInput(e.target.value);
    
    if(e.target.value===""){
      setDisplayCoin(coins);
    }
  }

  const searchHandler= async(e)=>{
    e.preventDefault();
    const coin = await coins.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase()) 
    })
    setDisplayCoin(coin);
  }

  //we are copying data from coins to displayCoin
  //this is done to avoid infinite loop of rendering
  React.useEffect(()=>{
    setDisplayCoin(coins);
  },[coins,currency])


  return (
    <div className='home'>
      <div className="hero">
        <h1>Cryptocurrency Prices by Market Cap</h1>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} value={input} type="text" placeholder='Search' required/>
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
          displayCoin.slice(0,10).map((item,index)=>(
            <div className="table_layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>

              
              <p className={item.price_change_percentage_24h > 0?"green":"red"}>
                {Math.floor(item.price_change_percentage_24h*100)/100}
                </p>

              <p className='marketCap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default Home
