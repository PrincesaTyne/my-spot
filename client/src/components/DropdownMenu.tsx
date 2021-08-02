import React, { useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './DropdownMenu.css'
import { map } from './Map'

const DropdownMenu: React.FC = () => {
    const dropdownRef = useRef<any>(null);
    const [isActive, setIsActive] = useState(false)

    function menuClick(): void {
      setIsActive(!isActive)
    }

    function satelliteView(): void {
      map.setStyle('mapbox://styles/mapbox/satellite-v9')
    }
    
    function mapView(): void{
      map.setStyle('mapbox://styles/mapbox/streets-v11')
    }

    useEffect(() => {
        const menuClickEvent = (e:any) => {
          if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
            setIsActive(!isActive);
          }
        };
      
        if (isActive) {
          window.addEventListener('click', menuClickEvent);
        }
        return () => {
          window.removeEventListener('click', menuClickEvent);
        }
      
      }, [isActive]);

    return (
      <div className='menu-container' style={{cursor: 'pointer'}} >
          <button onClick={menuClick} className="menu">
              <img src={`${process.env.PUBLIC_URL}/images/menu-icon.png`} alt="menu avatar" />
          </button>
          <div className={`dropdownMenu ${isActive ? 'active' : 'inactive'}`} ref={dropdownRef}>
              <ul>
                <li><h4>My spot</h4></li>
                <li><p onClick={mapView} >Map</p></li>
                <li><p onClick={satelliteView} >Satellite</p></li>
                <li><Link className='link' to="/favoritespots"><p>My favorite spots</p></Link></li>
                <li><Link className='link' to='/about'><p>About us</p></Link></li>
              </ul>
          </div>
      </div>
    )
}

export default DropdownMenu
