import {useState,useEffect} from 'react'
import "./stock.css"
import Backgroundimg from '../../components/BackgroundImg/Backgroundimg'
import {BsFillArrowUpSquareFill} from "react-icons/bs"
import LineChart from '../../components/LineChart/LineChart'
import CustomAccordion from '../../components/Accordion/Accordion'
import Button from '@mui/material/Button';
import {GS,IBM} from "../../components/LineGraph/sample"

const Stock = () => {
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
          <div className="stockify__stock margin__top">
              <div className="stockify__stock-container">
                  <div className="stockify__stock-left">
                      <div className="stockify__stock-name">
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
                          <Button
                              variant="contained"
                              sx={[
                                  {
                                      height: "50%",
                                      width: "25%",
                                      color: "white",
                                      backgroundColor: "black",
                                      fontSize: "1.1vmax",
                                      border: "solid 2px white",
                                      margin:"auto"
                                  },
                                  {
                                      "&:hover": {
                                          backgroundColor: "white",
                                          color: "black",
                                      },
                                  },
                              ]}
                          >
                              Add To Watchlist
                          </Button>
                      </div>
                      <div className="stockify__stock-graph">
                          <LineChart x={dates} y={series} color={colors[Math.floor(Math.random()*colors.length)]} label={"OPEN PRICE"}/>
                      </div>
                  </div>
                  <div className="stockify__stock-right">
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
                      <CustomAccordion
                          label={"Company Details"}
                          data={{
                              About: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit tempore velit asperiores tempora modi dolor perspiciatis voluptatum. Nisi in totam inventore non nostrum accusantium mollitia, illum quae enim officia doloribus.",
                          }}

                      />
                      <Button
                              variant="contained"
                              sx={[
                                  {
                                      height: "8%",
                                      width: "60%",
                                      color: "white",
                                      backgroundColor: "black",
                                      fontSize: "1.1vmax",
                                      border: "solid 2px white",
                                      margin:"0 auto",
                                      
                                  },
                                  {
                                      "&:hover": {
                                          backgroundColor: "white",
                                          color: "black",
                                      },
                                  },
                              ]}
                          >
                              Predict 
                          </Button>
                  </div>
              </div>
          </div>
      </>
  );
}

export default Stock
