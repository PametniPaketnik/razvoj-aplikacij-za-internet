import { Marker, Popup } from 'react-leaflet'

function MapMarker({lat, lng, id}) {
    return (
        <Marker position={[lat, lng]}>
            <Popup>
                Paketnik #{id}
            </Popup>
        </Marker>
    );
}

export default MapMarker;
