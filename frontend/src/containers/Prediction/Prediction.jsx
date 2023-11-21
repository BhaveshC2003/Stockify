import {useEffect, useState} from 'react'
import "./prediction.css"
import { default as AI } from "../../Images/AI.png"
import Slider from '@mui/material/Slider';
import LineChart from "../../components/LineChart/LineChart"
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Prediction = () => {
    const {ticker} = useParams()
    const [predictions,setPredictions] = useState([])
    const [dates,setDates] = useState([])
    useEffect(()=>{
        if(predictions.length === 0){
            const date = new Date(Date.now())
            axios.get(`https://stockify-backend-q52a.onrender.com/stocks/predict?ticker=${ticker.split(":")[0]}`)
            .then(({data})=>{
                console.log(data)
                const arr = []
                const date = new Date(Date.now())
                console.log(date)
                data.data.forEach((pred,i)=>{
                    arr.push(`${date.getDay()+1}/${date.getMonth()}`)
                })
                setDates(arr)
                setPredictions(data.data)

            })
            .catch(err=>console.log(err.response.data.message))
        }
    },[ticker])
    return (
        <div className='stockify__prediction'>
            <div className='stockify__prediction-about padding'>
                <div className='stockify__prediction-about-left'>
                    <h1>About Our Stock Price Prediction Model</h1>
                    <p>
                    Our model delves into a vast repository of historical and current market data, meticulously analyzing trends, patterns, and correlations that often go unnoticed by the human eye. This deep-dive approach enables our model to identify subtle shifts and potential turning points in stock prices, providing you with a valuable edge in anticipating market movements.
                    </p>
                </div>
                <div className='stockify__prediction-about-right'>
                    <img src={AI} alt="" />
                </div>
            </div>
            <div className='stockify__prediction-model padding'>
                <LineChart
                     y={predictions}
                     x={dates}
                     label={ticker}
                />
            </div>
        </div>
    )
}

export default Prediction