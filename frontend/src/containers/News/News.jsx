import React from 'react'
import "./news.css"
import NewsCard from '../../components/NewsCard/NewsCard'

const News = () => {
  return (
    <div className='stockify__news margin__top'>
        <h1>Latest Market News</h1>
        <div className='stockify__news-container'>
            <NewsCard /> 
            <NewsCard /> 
            <NewsCard />            
            <NewsCard /> 
            <NewsCard /> 
            <NewsCard /> 
                
        </div>
    </div>
  )
}

export default News