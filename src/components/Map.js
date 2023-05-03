import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import SearchPlace from "./SearchPlace";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import useSWR from "swr";
import Pin from "./graphics/Pin";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9yNGJhIiwiYSI6ImNsZ2dsc2R6NjBjcWwzZXJyM2hqdGZrejEifQ.Tt-v3iroj4ffhu-uJ69Haw";

export default function RenderMap() {
  const [lng, setLng] = useState(13.4);
  const [lat, setLat] = useState(52.52);
  const [zoom, setZoom] = useState(12);
  const [popupInfo, setPopupInfo] = useState(null);
  const mapRef = useRef(null);

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

  function flyToSearchQuery(lat, lng) {
    if (lat && lng) {
      mapRef.current?.flyTo({
        center: [lat, lng],
        zoom: 16,
      });
    }
    return;
  }

  const { data, isLoading } = useSWR("/api/places", {
    fallbackData: [],
  });

  const searchData = data.map((place) => {
    return {
      label: place.name,
      location: [place.latitude, place.longitude],
      id: place._id,
    };
  });

  if (isLoading) return <div>we load this..</div>;

  const verifiedData = data.filter((place) =>
    !place.inModeration ? place : null
  );

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: zoom,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={mapboxgl.accessToken}
    >
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        position={`top-left`}
      />
      <FullscreenControl position="bottom-left" />
      <NavigationControl position="bottom-left" />
      <ScaleControl position="bottom-left" />

      {verifiedData.map((place) => {
        return (
          <Marker
            key={place._id}
            longitude={place.longitude}
            latitude={place.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(place);
            }}
          >
            <Pin typeOf={place.typeOf} />
          </Marker>
        );
      })}
      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => setPopupInfo(null)}
        >
          <Link href={`/places/${popupInfo._id}`}>{popupInfo.name}</Link>
        </Popup>
      )}

      <SearchPlace
        classes="left-10 mt-4"
        index={searchData}
        flyToQuery={flyToSearchQuery}
      />
    </Map>
  );
}
