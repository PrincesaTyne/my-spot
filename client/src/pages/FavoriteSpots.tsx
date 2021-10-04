import React, { useState, useEffect, useCallback } from 'react'
import { markers } from './Map'
import '../css/pages/FavoriteSpots.css'
import mapboxgl from 'mapbox-gl'


const FavoriteSpots = () => {
    const [list, setList] = useState(markers)

    const handleDelete = useCallback((id)=>{
        const newList = list.filter((item: mapboxgl.EventData) => item?.features[0]?.id.toString() !== id)
        setList(newList)
    },[list])
   
    useEffect(()=>{
    },[handleDelete, list?.length])

  return(
    <div className='favorite-container'>
      <div className='favoriteSpot'>
        {
          !markers?.length ? (
            <div>
              <p>No favorite place added yet!</p>
            </div>
          ):(
            <ul className='spots-list'>
              {
                list.map((spot: mapboxgl.EventData)=> 
                  <li key={spot?.features[0]?.id.toString()} >
                  {spot?.features[0]?.place_name.toString()}
                  <div 
                    className='delete' 
                    onClick={ ()=> handleDelete(spot?.features[0]?.id.toString()) }
                  >
                    <button> Remove </button>
                  </div>
                </li>)
              }
            </ul> 
          )
        }
      </div>
    </div> 
  )
}

export default FavoriteSpots
