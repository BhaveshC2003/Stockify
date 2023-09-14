import React from 'react'
import DataTable from '../../components/Table/Table'
import './watchlist.css'
import Backgroundimg from '../../components/BackgroundImg/Backgroundimg'
import { TableContainer, Paper } from '@mui/material';

const Watchlist = () => {
  return (
    <>
      <Backgroundimg />
      <div className='stockify__watchlist margin__top'>
        <div className='stockify__watchlist-container'>
          <TableContainer component={Paper} sx={{backgroundColor:"lightblue"}} >
            <DataTable headings={['Company','Stock Price','Percentage return','P/E ratio',]} data={[['Apple','300','4.3','0.7'],['Microsoft','200','5.6','0.4'],['Google','534','3.2','0.5']]} />
          </TableContainer>
        </div> 
      </div>
    </>
  )
}

export default Watchlist
