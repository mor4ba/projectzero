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
import Pin from "./graphics/Pin";
import Search from "./graphics/Search";
import FilterModul from "../components/Filter";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9yNGJhIiwiYSI6ImNsZ2dsc2R6NjBjcWwzZXJyM2hqdGZrejEifQ.Tt-v3iroj4ffhu-uJ69Haw";

export default function RenderMap({ places }) {
  const [lng, setLng] = useState(13.4);
  const [lat, setLat] = useState(52.52);
  const [zoom, setZoom] = useState(12);
  const [popupInfo, setPopupInfo] = useState(null);
  const [entries, setEntries] = useState([]);
  const mapRef = useRef(null);
  const data = places.data;

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
  });

  function flyToSearchQuery(lat, lng) {
    if (lat && lng) {
      mapRef.current?.flyTo({
        center: [lat, lng],
        zoom: 16,
      });
    }
    return;
  }

  const searchData = entries.map((place) => {
    return {
      label: place.name,
      location: [place.latitude, place.longitude],
      id: place._id,
    };
  });

  function handleFilterChange(event) {
    const formData = new FormData(event.target.form);
    const filtered = formData.getAll("filter");
    const filtered_feature = formData.getAll("filter_feature");

    if (filtered.length > 0 && filtered_feature.length == 0) {
      setEntries(
        places.data.filter((element) =>
          filtered.some((item) => element.typeOf === item)
        )
      );
    } else if (filtered.length > 0) {
      setEntries(
        places.data.filter(
          (element) =>
            filtered.some((item) => element.typeOf == item) &&
            filtered_feature.every((item) => element.features.includes(item))
        )
      );
    } else if (filtered.length == 0 && filtered_feature.length > 0) {
      setEntries(
        places.data.filter((element) =>
          filtered_feature.every((item) => element.features.includes(item))
        )
      );
    } else if (filtered.length == 0 && filtered_feature.length == 0) {
      setInitial();
    }
  }

  useEffect(() => {
    setEntries(data.filter((place) => (!place.inModeration ? place : null)));
  }, [data]);

  function setInitial() {
    setEntries(data.filter((place) => (!place.inModeration ? place : null)));
  }

  function resetFilter(event) {
    event.target.parentNode.parentNode.reset();
    setInitial();
  }

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

      {entries.map((place) => {
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
            <Pin typeOf={place.typeOf} tooltip={place.name} />
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
        classes=""
        index={searchData}
        flyToQuery={flyToSearchQuery}
      />
      <FilterModul
        handleFilterChange={handleFilterChange}
        reset={resetFilter}
      />
    </Map>
  );
}
