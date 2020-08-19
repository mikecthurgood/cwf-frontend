import React, { useState, useEffect } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const key = process.env.REACT_APP_MAPSAPIKEY

const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");    

const MapComponent = withScriptjs(withGoogleMap((props) => {
    const [geo, setGeo] = useState({})
    const wallName = encodeURI(props.wallName.replace(',', ' ' ).replace('&', '%26'))
    useEffect(() => {
            const getGeo = async () => {
                const geoCachingUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${wallName}+${props.postcode}`
                const response = await fetch(geoCachingUrl).then(res => res.json())
                if (response.results.length > 0) setGeo(response.results[0].geometry.location)
                
            }
            getGeo()
        }, [props.postcode]);

    return (
        <>
            {geo.lat && 
            <GoogleMap
                defaultZoom={14}
                defaultCenter={geo}
            >
                {props.isMarkerShown && geo && <Marker position={geo} />}
            </GoogleMap>}
        </>
        )
}
  


))

export default MapComponent