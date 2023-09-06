import React from 'react'
import "./newscard.css"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NewsCard = () => {
  return (
        <Card className='stockify__newscard'>
            <CardMedia className='stockify__newscard-img' component="img" src='https://cdn.benzinga.com/files/images/story/2023/08/31/bulls_bears5.jpg?width=1200&height=800&fit=crop' alt='img' />
            <CardContent sx={{padding:"0 4px"}}>
                <Typography className='stockify__newscard-heading' variant="p" component="div">
                    Apple, Tesla, Nvidia, And Dogecoin May Spike 150% Contingent On Musk's Next Move: Bulls And Bears
                </Typography>
                <Button sx={{width:"100%",display:"flex",alignContent:"flex-end",flexDirection:"column"}} className='stockify__newscard-btn'>READ MORE</Button>
            </CardContent>
        </Card>
  )
}

export default NewsCard