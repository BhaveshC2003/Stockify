import {useState} from 'react'
import DataTable from '../../components/Table/Table'
import './watchlist.css'
import Backgroundimg from '../../components/BackgroundImg/Backgroundimg'
import { TableContainer, Paper } from '@mui/material'
import WatchlistCard from '../../components/WatchlistCard/WatchlistCard'
import Button from '@mui/material/Button'
import axios from "axios"

const Watchlist = () => {
	const [sheetId,setSheetId] = useState("")
	const stocks = [
		{date:new Date(Date.now()),name:"APPL",open:250,close:300,return:1.8,pe:0.5},
		{date:new Date(Date.now()),name:"IRCTC",open:200,close:270,return:1.2,pe:0.6},
		{date:new Date(Date.now()),name:"INFOSYS",open:350,close:500,return:1.1,pe:0.75}
	]
	const handleSubmit = (e)=>{
		axios.post("http://localhost:8000/users/sheet",{stocks,sheetId})
		.then(()=>console.log("Updated google sheet"))
		.catch((err)=>console.log(err))
	}
  return (
    <>
      <Backgroundimg />
      <div className='stockify__watchlist margin__top'>
	  	<h2>My Watchlist</h2>
		<div className='stockify__watchlist-sheet margin__top'>
			<p>Click on <b style={{"fontWeight":500}}>Import</b> to add today's data to your google sheet.</p>
			<div>
				<input type="text" placeholder='Enter Google Sheet ID' onChange={(e)=>setSheetId(e.target.value)}/>
				<Button variant="text" sx={[{width:"15%",color:"white",backgroundColor:"black",
				fontSize:"1.1vmax",border:"solid 2px white",textTransform:"capitalize"},
				{'&:hover':{backgroundColor:"white",color:"black"}}]}
				onClick={handleSubmit}
				>
					Import
				</Button>
			</div>
		</div>
        <div className='stockify__watchlist-container'>
          <WatchlistCard stock={{name:"APPL",open:250,close:300,return:1.8,pe:0.5}} />
          <WatchlistCard stock={{name:"IRCTC",open:200,close:270,return:1.2,pe:0.6}} />
          <WatchlistCard stock={{name:"INFOSYS",open:350,close:500,return:1.1,pe:0.75}} />
        </div> 
      </div>
    </>
  )
}

export default Watchlist


/* <TableContainer component={Paper} sx={{backgroundColor:"lightblue"}} >
            <DataTable headings={['Company','Stock Price','Percentage return','P/E ratio',]} data={[['Apple','300','4.3','0.7'],['Microsoft','200','5.6','0.4'],['Google','534','3.2','0.5']]} />
</TableContainer> */