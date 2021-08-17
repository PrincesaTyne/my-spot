import React, { useRef, useEffect} from 'react'
import mapboxgl from 'mapbox-gl'
import '../css/pages/Map.css'
import DropdownMenu from '../components/DropdownMenu'

const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`

export let markers: Array<mapboxgl.EventData>
export let map: mapboxgl.Map

const Map = () => {
  const mapContainerRef = useRef(null)
  
  useEffect(()=> {
    
    map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [32.553634, 0.338296],
      zoom: 13
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: 'Search for places here',
      mapboxgl: mapboxgl
    })

    map.addControl(geocoder, 'top-right')

    map.addControl( new mapboxgl.NavigationControl(), 'bottom-right')

    map.on('click', function (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
    
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${event.lngLat.lng},${event.lngLat.lat}.json?access_token=${mapboxgl.accessToken}`)
        .then((response)=>response.json())
        .then((jsonObj)=>{
          markers?.push(jsonObj)

          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: [0, -7]
          }).setHTML(`<p><strong>${jsonObj.features[0].place_name}</strong></p>`)

          const markerElement = document.createElement('div')
          markerElement.id = 'marker'
    
          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([event.lngLat.lng, event.lngLat.lat])
            .setPopup(popup)
            .addTo(map)

          markerElement.onmouseenter = () => marker.togglePopup()
          markerElement.onmouseleave = () => marker.togglePopup()
        })    

      map.flyTo({center: [event.lngLat.lng, event.lngLat.lat]})

    })

    var markerElement = document.createElement('div');
    markerElement.id = 'marker-home';

    var  popupOne = new mapboxgl.Popup({ offset: 25, closeButton: false })
    .setHTML(`<p><strong>Home Sweet Home</strong></p>`)
    const marker =new mapboxgl.Marker(markerElement).setLngLat([32.553634, 0.338296]).setPopup(popupOne).addTo(map)

    markerElement.onmouseenter = () => marker.togglePopup()
    markerElement.onmouseleave = () => marker.togglePopup()
    
    return () => map.remove()
  },[])

  return (
    <div className="map" ref={mapContainerRef} >
      <DropdownMenu />
      <div className='click-here'><strong>Click any point in the map to add a marker</strong></div>
    </div>
  )
}

export default Map
