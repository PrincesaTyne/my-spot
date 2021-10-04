import React, { useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import '../css/components/DropdownMenu.css'
import { map } from '../pages/Map'

const DropdownMenu: React.FC = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState<boolean>(false)

    function menuClick() {
      setIsActive(!isActive)
    }

    function satelliteView() {
      map.setStyle('mapbox://styles/mapbox/satellite-v9')
    }
    
    function mapView(){
      map.setStyle('mapbox://styles/mapbox/streets-v11')
    }

    useEffect(() => {
        const menuClickEvent = (e: MouseEvent) => {
          if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target as HTMLElement)) {
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
