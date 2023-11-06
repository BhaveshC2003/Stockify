import {useEffect, useState} from 'react'
import './watchlist.css'
import Backgroundimg from '../../components/BackgroundImg/Backgroundimg'
import WatchlistCard from '../../components/WatchlistCard/WatchlistCard'
import Button from '@mui/material/Button'
import axios from "axios"

const Watchlist = () => {
	const [sheetId,setSheetId] = useState("")
	const [stocks,setStocks] = useState([])
	const handleSubmit = (e)=>{
		const data = stocks.map(stock=>{
			return(
				{
					date : new Date(Date.now()),
					name: stock.name,
					price: stock.price,
					percent_change: stock.percent_change,
					market_cap:stock.stats["Market cap"]
				}
			)
		})
		axios.post("http://localhost:8000/users/sheet",{stocks:data,sheetId})
		.then(()=>console.log("Updated google sheet"))
		.catch((err)=>console.log(err))
	}
	useEffect(()=>{
			if(document.cookie && document.cookie !== ""){
				const csrf_token = document.cookie
					.split(";")[1]
					.split("=")[1]
					.trim();
				console.log(csrf_token);
				axios
					.get("http://localhost:8000/users/watchlist", {
						headers: { "X-CSRFToken": csrf_token },
						withCredentials: true,
					})
					.then(({ data }) => {
						console.log(data);
						setStocks(data.data);
					})
					.catch((err) => console.log(err));
			}
	},[])
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
			{
				stocks.map(stock=>{
					return (
                        <WatchlistCard
                            stock={{
                                name: stock.name,
                                price: stock.price,
                                percent_change: stock.percent_change,
								market_cap:stock.stats["Market cap"]
                            }}
                        />
                    );
				})
			}
        </div> 
      </div>
    </>
  )
}

export default Watchlist

