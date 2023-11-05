import {useState,useEffect} from 'react'
import "./linechart.css"
import {Line} from "react-chartjs-2"
import {data} from "../LineGraph/sample"
import { Chart, registerables } from 'chart.js';

const LineChart = () => {
    Chart.register(...registerables)
    const [series,setSeries] = useState([10,20,30,40,50])
    const [dates,setDates] = useState([1,2,3,4,5])
    const days = ["Mon","Tues","Wed","Thus","Fri","Sat"]
    useEffect(()=>{
            const x = []
            const y =[]
            for(let time in data["Time Series (Daily)"]){
                x.push(Number(data["Time Series (Daily)"][time]["1. open"]))
                const date = new Date(time)
                y.push(`${days[date.getDay()-1]} ${date.getDay()}/${date.getMonth()}`)
            }
            x.reverse()
            y.reverse()
            setSeries(x)
            setDates(y)
    },[])
    useEffect(()=>{
        
    },[dates,series])
  return (
      <div className="stockify__linechart">
          <Line
              redraw={true}
              data={{
                  labels: dates,
                  datasets: [
                      {
                          data: series,
                          borderColor: "dodgerblue",
                          label: "OPEN PRICE",
                          backgroundColor: "rgba(30, 144, 255, 0.7)",
                          fill: true,
                      },
                  ],
              }}
              options={{
                  scales: {
                      y: {
                          beginAtZero: true,
                          ticks: { color: "black", font: { size: 13 } },
                      },
                      x: { ticks: { color: "black", font: { size: 13 } } },
                  },
                  elements: {
                      point: { radius: 1 },
                  },
                  plugins: {
                      legend: {
                          labels: {
                              font: {
                                  size: 13,
                              },
                          },
                      },
                  },
              }}
          />
      </div>
  );
}

export default LineChart
