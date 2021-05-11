import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
export default function Map({ location }) {
  const mapContainer = useRef();
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

  useEffect(() => {
    console.log(location);
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [location.lng, location.lat],
      zoom: 8,
    });
    new mapboxgl.Marker({ color: "red" })
      .setLngLat([location.lng, location.lat])
      .addTo(map);
    return () => map.remove();
  }, []);
  return (
    <div>
      <div
        className="map-container"
        style={{
          width: 400,
          height: 400,
        }}
        ref={mapContainer}
      />
    </div>
  );
}
