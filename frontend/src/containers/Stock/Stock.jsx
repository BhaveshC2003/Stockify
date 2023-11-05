import React from 'react'
import "./stock.css"
import Backgroundimg from '../../components/BackgroundImg/Backgroundimg'
import {BsFillArrowUpSquareFill} from "react-icons/bs"
import LineChart from '../../components/LineChart/LineChart'
import CustomAccordion from '../../components/Accordion/Accordion'
import Button from '@mui/material/Button';

const Stock = () => {
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
                          <LineChart />
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
                                      height: "10%",
                                      width: "75%",
                                      color: "white",
                                      backgroundColor: "black",
                                      fontSize: "1.1vmax",
                                      border: "solid 2px white",
                                      margin:"auto",
                                      
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
              </div>
          </div>
      </>
  );
}

export default Stock
