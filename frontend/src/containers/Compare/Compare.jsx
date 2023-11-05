import {useEffect,useState} from 'react'
import "./compare.css"
import Backgroundimg from '../../components/BackgroundImg/Backgroundimg'
import {BsFillArrowUpSquareFill} from "react-icons/bs"
import LineChart from '../../components/LineChart/LineChart'
import CustomAccordion from '../../components/Accordion/Accordion'
import {GS,IBM} from "../../components/LineGraph/sample"

const Compare = () => {
    const [series,setSeries] = useState([10,20,30,40,50])
    const [dates,setDates] = useState([1,2,3,4,5])
    const days = ["Mon","Tues","Wed","Thus","Fri","Sat"]
    const colors = ["#ff6384", "#5959e6", "#2babab", "#8c4d15", "#8bc34a", "#607d8b", "#009688"]
    useEffect(()=>{
            const x = []
            const y =[]
            for(let time in GS["Time Series (Daily)"]){
                x.push(Number(GS["Time Series (Daily)"][time]["1. open"]))
                const date = new Date(time)
                y.push(`${days[date.getDay()-1]} ${date.getDay()}/${date.getMonth()}`)
            }
            x.reverse()
            y.reverse()
            setSeries(x)
            setDates(y)
    },[])
  return (
    <>
          <Backgroundimg />
          <div className="stockify__compare margin__top">
              <div className="stockify__compare-container">
                  <div className="stockify__compare-left">
                      <div className="stockify__compare-name">
                          <div>
                              <p>Reliance Industries Ltd</p>
                              <div>
                                  <p>$300</p>
                                  <span>
                                      <BsFillArrowUpSquareFill
                                          color="green"
                                          style={{ marginRight: "10px" }}
                                      />
                                      0.18%
                                  </span>
                              </div>
                          </div>
                          <div>
                              <p>INFOSYS</p>
                              <div>
                                  <p>$450</p>
                                  <span>
                                      <BsFillArrowUpSquareFill
                                          color="green"
                                          style={{ marginRight: "10px" }}
                                      />
                                      0.12%
                                  </span>
                              </div>
                          </div>
                      </div>
                      <div className="stockify__compare-graph">
                          <LineChart x={dates} y={series} color={colors[Math.floor(Math.random()*colors.length)]} label={"RELIANCE"}/>
                          <LineChart x={dates} y={series} color={colors[Math.floor(Math.random()*colors.length)]} label={"INFOSYS"}/>
                      </div>
                  </div>
                  <div className="stockify__compare-right">
                      <CustomAccordion
                          expanded={true}
                          label={"Statistics"}
                          data={{
                              "Previous Close": "$320",
                              "Day Range": "$450-$500",
                              "Market Cap": "25.63$",
                              "P/E Ratio": "25.2",
                              "Dividend Yeild": "0.37%",
                          }}
                      />
                  </div>
              </div>
          </div>
      </>
  )
}

export default Compare