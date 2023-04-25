import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import Image from "next/image";
import useSWR from "swr";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9yNGJhIiwiYSI6ImNsZ2dsc2R6NjBjcWwzZXJyM2hqdGZrejEifQ.Tt-v3iroj4ffhu-uJ69Haw";

export default function RenderMap() {
  const [lng, setLng] = useState(13.4);
  const [lat, setLat] = useState(52.52);
  const [zoom, setZoom] = useState(12);
  const [popupInfo, setPopupInfo] = useState(null);

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
      <FullscreenControl position="bottom-left" />
      <NavigationControl position="bottom-left" />
      <ScaleControl position="bottom-left" />

      {data.map((place) => {
        return (
          <Marker
            key={place._id}
            longitude={place.longitude}
            latitude={place.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(place);
              console.log("popupinfo:", popupInfo);
              console.log(place);
            }}
          >
            <Image src="/red_pin@3x.png" alt="marker" width={25} height={25} />
          </Marker>
        );
      })}
      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => setPopupInfo(null)}
        >
          <p>{popupInfo.name}</p>
        </Popup>
      )}
    </Map>
  );
}
