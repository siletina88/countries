import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";

import "./Map.scss";

export default function Map({ country }) {
  const [position, setPosition] = useState(country.latlng);

  function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  }

  useEffect(() => {
    setPosition(country.latlng);
  }, [country.latlng]);
  return (
    <div className="map">
      Location on map :
      <MapContainer
        style={{
          height: "100%",
          width: "100%",
          border: "1px solid rgba(124, 124, 124, 0.233)",
        }}
        center={position}
        zoom={3}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ChangeMapView coords={position}></ChangeMapView>
        <Marker position={position}></Marker>
      </MapContainer>
    </div>
  );
}
