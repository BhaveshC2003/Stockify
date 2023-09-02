import React from 'react'
import Card from '../../components/Card/Card'
import "./whystockify.css"
import { reasons } from './reasons'
import Button from '@mui/material/Button';
import {default as analysisImg} from "../../Images/analysis.jpg"

const WhyStockify = () => {
  return (
    <div className='stockify-home__whystockify margin'>
        <h1>Reasons To Choose Us</h1>
        <div className='stockify-home__whystockify-card-container'>
            {
                reasons.map(reason=><Card title={reason.title} />)
            }
        </div>
        <div className='stockify-home__whystockify-analysis'>
            <div className='stockify-home__whystockify-analysis-left'>
                <h1>Get Every Information You Need.Right Away !</h1>
                <p>
                    Analyzing stock is a serious affair and with Ticker you get one-stop destination for cutting edge
                    stock research.Our stock analysis platform provides a sophisticated yet simple interface that would be
                    impressed with while carrying out your stock analysis.
                </p>
                <Button variant="contained" sx={[{width:"50%",color:"white",backgroundColor:"black",fontSize:"1.2vmax",border:"solid 2px white"},{'&:hover':{backgroundColor:"white",color:"black"}}]}>Start Now</Button>
            </div>
            <div className='stockify-home__whystockify-analysis-right'>
                <img src={analysisImg} alt="" />            
            </div>
        </div>
    </div>
  )
}

export default WhyStockify