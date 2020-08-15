import React, { useState, useEffect } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");    

const MapComponent = withScriptjs(withGoogleMap((props) => {
    const [geo, setGeo] = useState({})

    useEffect(() => {
            const getGeo = async () => {
                const geoCachingUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCZu0xiV2v0ztRCKqfEQA3ID6MrWKOQbbQ&address=${props.address}+${props.postcode}`
                const response = await fetch(geoCachingUrl).then(res => res.json())
                setGeo(response.results[0].geometry.location)
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