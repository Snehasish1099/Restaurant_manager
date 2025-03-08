import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, Circle, useJsApiLoader, InfoWindow, } from "@react-google-maps/api";

// For autocomplete and searching place 
const libraries = ['places']
const GoogleMapIndex = (props) => {

    // To get current location 
    const [currentLocation, setCurrentLocation] = useState({
        text: 'This is the center of Earth',
        lat: 0,
        lng: 0
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
                text: 'This is your current location',
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            console.log("Current Location", currentLocation.lat, currentLocation.lng);
        })
    }, [])

    // for saving the value of current location somewhere 
    const [location, setLocation] = useState(currentLocation)
    // Important, this onclick func is for selecting and storing the data of co-ordinates,details
    const onClick = (...args) => {
        setLocation({
            text: 'You have selected somewhere far from your location',
            lat: args[0].latLng.lat(),
            lng: args[0].latLng.lng()
        })
        console.log(
            'Co-ords: ', args[0].latLng.lat(), ',', args[0].latLng.lng()
        )
    }

    // The below state, onclick func is for rendering the details of the location clicked 
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const showInfoWindow = () => {
        setInfoWindowOpen(!infoWindowOpen);
    };

    // Defining the height and width of the container of the map, this one is one of the requirements for showing the map
    const containerStyle = {
        width: '90%',
        height: '100vh'
    };

    // This is where api key for Google map is put 
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAP_SECRET_KEY,
        libraries: libraries
    })

    return (
        <>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentLocation}
                    zoom={10}
                    onClick={onClick}
                    onLoad={props.onLoad}
                    options={props.options}
                >
                    { /* Child components, such as Markers, InfoWindows, Autocomplete, etc. should be called below within the GoogleMap wrapper*/}
                    <Circle
                        center={currentLocation}
                        options={{
                            strokeColor: '#0099CC',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#F5FCFF',
                            fillOpacity: 0.35,
                            clickable: false,
                            draggable: false,
                            editable: false,
                            visible: true,
                            radius: 20000,
                            zIndex: 1
                        }}
                    />
                    {/* For getting the details of the current location  */}
                    <Marker
                        title='Your Location'
                        position={currentLocation}
                        // icon={markerIcon}
                        onClick={showInfoWindow}
                    >
                        {infoWindowOpen && (
                            <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
                                <div className={`border border-black p-1`}>
                                    <p>{currentLocation.text}</p>
                                    <p>Latitude: {currentLocation.lat}</p>
                                    <p>Longitude: {currentLocation.lng}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>

                    {/* For getting the details of the selected location  */}
                    <Marker
                        title='Selected marker'
                        position={location}
                        // icon={markerIcon}
                        onClick={showInfoWindow}
                    >
                        {infoWindowOpen && (
                            <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
                                <div className={`border border-black p-1`}>
                                    <p>{location.text}</p>
                                    <p>Latitude: {location.lat}</p>
                                    <p>Longitude: {location.lng}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                </GoogleMap>
            ) : null}

        </>
    )
}

export default GoogleMapIndex