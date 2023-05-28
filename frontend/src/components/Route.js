import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

const Route = ({ location1, location2 }) => {
    const mapRef = useRef(null);
    const routeRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const { current: map } = mapRef;

            // Create the map and add tile layer
            map.setView(location1, 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © OpenStreetMap contributors',
            }).addTo(map);

            // Create routing control and add it to the map
            routeRef.current = L.Routing.control({
                waypoints: [
                    L.latLng(location1),
                    L.latLng(location2),
                ],
            }).addTo(map);

            return () => {
                // Clean up the routing control when the component unmounts
                if (routeRef.current) {
                    routeRef.current.getPlan().setWaypoints([]);
                    map.removeControl(routeRef.current);
                }
            };
        }
    }, [location1, location2]);

    return (
        <MapContainer ref={mapRef} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data © OpenStreetMap contributors" />
        </MapContainer>
    );
};

export default Route;

