
import React from 'react';
export const CoinContext = React.createContext();

const CoinContextProvider = (props) => {

    const [coins, setCoins] = React.useState([]);
    const [currency, setCurrency] = React.useState({
        name: "USD",
        symbol: "$",
    });

    const fetchCoins = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-AxR2hhSNs4c1jeHEyPzgRudg'
            }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setCoins(res))
            .catch(err => console.error(err));
    }

    React.useEffect(() => {
        fetchCoins();
    }, [currency]);

    const contextValue = {
        coins,
        currency,
        setCurrency
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;
