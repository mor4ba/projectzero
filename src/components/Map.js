import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, GeolocateControl } from "react-map-gl";
import Image from "next/image";
import useSWR from "swr";
//import Geocoder from "react-mapbox-gl-geocoder";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9yNGJhIiwiYSI6ImNsZ2dsc2R6NjBjcWwzZXJyM2hqdGZrejEifQ.Tt-v3iroj4ffhu-uJ69Haw";

export default function RenderMap() {
  const [lng, setLng] = useState(13.4);
  const [lat, setLat] = useState(52.52);
  const [zoom, setZoom] = useState(12);

  //   useEffect(() => {
  //     if (map.current) return; // initialize map only once
  //     map.current = new mapboxgl.Map({
  //       container: mapContainer.current,
  //       style: "mapbox://styles/mapbox/streets-v12",
  //       center: [lng, lat],
  //       zoom: zoom,
  //     });
  //   });

  //   useEffect(() => {
  //     if (!map.current) return; // wait for map to initialize
  //     map.current.on("move", () => {
  //       setLng(map.current.getCenter().lng.toFixed(4));
  //       setLat(map.current.getCenter().lat.toFixed(4));
  //       setZoom(map.current.getZoom().toFixed(2));
  //     });
  //   });

  const [viewport, setViewport] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 3.5,
      });
    });
  }, []);

  const { data, isLoading } = useSWR("/api/places", {
    fallbackData: [],
  });

  if (isLoading) return <div>we load this..</div>;

  return (
    <Map
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: zoom,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1IjoibW9yNGJhIiwiYSI6ImNsZ2dsc2R6NjBjcWwzZXJyM2hqdGZrejEifQ.Tt-v3iroj4ffhu-uJ69Haw"
    >
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      <Marker longitude={13.4} latitude={52.5} anchor="bottom">
        <Image src="/flag.svg" alt="mark" width={25} height="25" />
      </Marker>
    </Map>
  );
}
