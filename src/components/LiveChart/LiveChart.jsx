import React, { useEffect } from 'react'
import Chart from 'react-google-charts'

const LiveChart = ({HistoricalData}) => {
    const [data, setData] = React.useState([["Date", "Price"]]);

    useEffect(()=>{
        let dataCopy= [["Date", "Price"]];
        if(HistoricalData.prices){

            HistoricalData.prices.map((item)=>{
                //item[0] is date and item[1] is price
                let date=new Date(item[0]);
                let price=item[1];
                dataCopy.push([date.toLocaleDateString().slice(0,-5),price])
            })
            setData(dataCopy);
        }
    },[HistoricalData])

  return (
    <Chart 
        chartType='LineChart' 
        data={data}
        height='400px'
        width='100%'
    />

    
  )
}

export default LiveChart
