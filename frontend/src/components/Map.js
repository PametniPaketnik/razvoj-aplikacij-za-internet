import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'

const geocodeAddress = async (address, postcode, city, country) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&
        street=${encodeURIComponent(address)}&
        city=${encodeURIComponent(city)}&
        country=${encodeURIComponent(country)}&
        postalcode=${encodeURIComponent(postcode)}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    } else {
        throw new Error('Address not found');
    }
};

function Map({street, postcode, city, country}) {
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const { lat, lng } = await geocodeAddress(street, postcode, city, country);
                setLocation({ lat, lng });
            }
            catch (error) {
                console.error('Error geocoding address:', error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchLocation();
    }, [street]);

    if(isLoading) {
        return <p>Loading...</p>
    }
    
    if(location) {
        return (
            <MapContainer center={location} zoom={13} scrollWheelZoom={false} style={{ height: '50vh', width: '25%' }}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={location}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Marker position={[46.5547, 15.6459]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        );
    }

    return null;
}

export default Map;
