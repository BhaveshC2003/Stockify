import React, { useEffect, useState } from 'react'
import "./linegraph.css"
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';
import {data} from "./sample"

const index=[]
// const generateSample = () => {
//     const sample = []
//     for (let i = 0; i < 12; i++){
//         sample.push(i*i)
//         index.push(i+1)
//     }
//     console.log(index.length)
//     return sample
// }
//const data = generateSample()

const LineGraph = () => {
    const [series,setSeries] = useState([10,20,30,40,50])
    const [dates,setDates] = useState([1,2,3,4,5])
    useEffect(()=>{
        //axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GS&apikey=IJ9GT8ELNE4GDPON&outputsize=compact")
        //.then(({data})=>{
            const x = []
            const y =[]
            let count = 0
            for(let time in data["Time Series (Daily)"]){
                if(count == 15) break
                x.push(Number(data["Time Series (Daily)"][time]["1. open"]))
                //(new Date(time)).getDate()
                y.push(time.split("-")[2] + "/" + time.split("-")[1])
                console.log(time.split("-")[2])
                count++
            }
            x.reverse()
            y.reverse()
            console.log(x)
            console.log(y)
            setSeries(x)
            setDates(y)
        //})
    },[])
    return (
        <div className="stockify__linegraph">
            {
                <LineChart
                    xAxis={[
                        {
                            scaleType: "point",
                            data: dates,
                            id: "dates",
                        },
                    ]}
                    series={[
                        {
                            curve: "natural",
                            data: series,
                            area: true,
                            color: "#2ad110",
                        },
                    ]}
                    bottomAxis={{ 
                        axisId: "dates", 
                        tickFontSize:"15px",
                   }}
                   sx={{
                    ".MuiChartsAxis-tickLabel":{
                        "fill":"white"
                    }    
                }}
                />
            }
        </div>
    );
}

export default LineGraph