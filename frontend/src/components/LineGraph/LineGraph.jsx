import React from 'react'
import "./linegraph.css"
import { LineChart } from '@mui/x-charts/LineChart';

const index=[]
const generateSample = () => {
    const sample = []
    for (let i = 0; i < 12; i++){
        sample.push(i*i)
        index.push(i+1)
    }
    console.log(index.length)
    return sample
}
const data = generateSample()
const LineGraph = () => {
    return (
        <div className='stockify__linegraph'>
            <LineChart
                xAxis={[{ data: index }]}
                series={[
                    {   curve: "monotoneX",
                        data: data,
                    },
                ]}
                width={1000}
                height={300}
            />
        </div>
    )
}

export default LineGraph