import React from 'react'
import "./watchlistCard.css"

const WatchlistCard = ({stock}) => {
  return (
    <>
    <div className='stockify__watchlist-card'>
      <p class="watchlist-card-heading">{stock.name}</p>
      <div>
        <p><b style={{"fontWeight":500}}>OPEN : </b> {stock.open}</p>
        <p><b style={{"fontWeight":500}}>CLOSE : </b> {stock.close}</p>
        <p><b style={{"fontWeight":500}}>RETURN : </b> {stock.return}</p>
        <p><b style={{"fontWeight":500}}>P/E : </b> {stock.pe}</p>
      </div>
    </div> 
  </>
  )
}

export default WatchlistCard