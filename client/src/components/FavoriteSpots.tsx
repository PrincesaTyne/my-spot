import React, { useState, useEffect, useCallback } from 'react'
import { markers } from './Map'
import './FavoriteSpots.css'


const FavoriteSpots: React.FC = () => {
    const [list, setList] = useState(markers)

    const Ondelete = useCallback((id)=>{
        const newList = list.filter((item: any) => item.features[0].id.toString() !== id)
        setList(newList)
    },[list])
   
    useEffect(()=>{
    },[Ondelete, list])

    return(
        <div className='favorite-container'>
            <div className='favoriteSpot'>
                {
                    markers.length <= 0 ? (
                        <div>
                            <p>No favorite place added yet!</p>
                        </div>
                    ):(
                        <ul className='spots-list'>
                            {
                            list.map((spot: any)=> 
                                <li key={spot.features[0].id.toString()} >
                                
                                {spot.features[0].place_name.toString()}
                                <div className='delete' onClick={()=>Ondelete(spot.features[0].id.toString())}><button >Remove</button></div>
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
