import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
export default function DashboardMap({ properties }) {
  const mapContainer = useRef();
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  let lngMoy = 0;
  let latMoy = 0;
  properties.forEach((property) => {
    lngMoy += property?.location.lng;
    latMoy += property?.location.lat;
  });

  lngMoy /= 2;
  latMoy /= 2;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lngMoy, latMoy],
      zoom: 8,
    });

    properties.map((property, i) => {
      new mapboxgl.Marker({ color: "red" })
        .setLngLat([property?.location.lng, property?.location.lat])
        .addTo(map);
    });

    return () => map.remove();
  }, []);
  return (
    <div>
      <div
        className="map-container"
        style={{
          width: "100%",
          height: "106vh",
        }}
        ref={mapContainer}
      />
    </div>
  );
}
