import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MapMarker from './MapMarker.js'

function Map({lat, lng, id}) {
    return (
        <MapContainer className='rounded-map' center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{ height: '80vh', width: '80%' }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMarker lat={lat} lng={lng} id={id} />
        </MapContainer>
    );
}

export default Map;
