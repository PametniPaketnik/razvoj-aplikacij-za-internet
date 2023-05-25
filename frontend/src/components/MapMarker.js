import { Marker, Popup } from 'react-leaflet'

function MapMarker({lat, lng}) {
    return (
        <Marker position={[lat, lng]}>
            <Popup>
                Lokacija paketnika
            </Popup>
        </Marker>
    );
}

export default MapMarker;
