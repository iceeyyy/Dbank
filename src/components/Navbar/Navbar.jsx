import React from 'react'
import './Navbar.css'
import logo from '../../assets/Dbank_logo.png'
import signUp  from '../../assets/SignUp.png'
import {CoinContext} from '../../context/CoinContext'

const Navbar = ({}) => {

  const {setCurrency}=React.useContext(CoinContext);

  const currencyHandler=(event)=>{
    switch(event.target.value){

      case"usd":
      {
        setCurrency({
          name:"usd",
          symbol:"$",
        })
        break;
      }

      case"inr":
      {
        setCurrency({
          name:"inr",
          symbol:"₹",
        })
        break;
      }

      case"eur":
      {
        setCurrency({
          name:"eur",
          symbol:"€",
        })
        break;
      }

      default:
      {
        setCurrency({
          name:"usd",
          symbol:"$",
        })
        break;
      }

    }
  }

  return (
    <div className='navbar'>
      <img src={logo} alt="" className='logo' />  
                    
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>

      <div className='navbar__right'>
        <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">Eur</option>
        </select>

        <button><img src={signUp} alt="" className='logo' /></button>
      </div>

    </div>
  )
}

export default Navbar
