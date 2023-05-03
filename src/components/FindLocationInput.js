import { useState } from "react";
import styled from "styled-components";

const SuggestionWrapper = styled.div`
  background: white;
  position: absolute;
  color: black;
  width: 400px;
  padding: 10px 20px;
  border-radius: 0px 0px 10px 10px;
  order: 3;
  top: 100%;
  z-index: 100;
  width: 100%;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 0px 10px 2px var(--secondary-color);
`;

const Suggestion = styled.p`
  cursor: pointer;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.25rem 0rem;
`;

export default function FindLocationInput() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  async function handleChange(event) {
    setValue(event.target.value);

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=pk.eyJ1IjoibW9yNGJhIiwiYSI6ImNsZ2dsc2R6NjBjcWwzZXJyM2hqdGZrejEifQ.Tt-v3iroj4ffhu-uJ69Haw&autocomplete=true&country=DE`;
      const response = await fetch(endpoint);
      const results = await response.json();
      setSuggestions(results?.features);
    } catch (error) {
      console.log("Error fetching data, ", error);
    }
  }

  return (
    <>
      <fieldset className="w-full flex flex-col relative justify-center">
        <input
          className="order-2 text-black bg-transparent rounded-lg border-2 border-primary-grey my-2 p-1 text-sm p-2 px-2"
          type="text"
          id="location"
          name="location"
          value={value}
          onChange={(event) => handleChange(event)}
          // isTyping={value !== ""}
        />

        <label className="order-1 block ml-2" htmlFor="location">
          Address
        </label>

        {suggestions?.length > 0 && (
          <SuggestionWrapper>
            {suggestions.map((suggestion, index) => {
              return (
                <Suggestion
                  key={index}
                  onClick={() => {
                    setValue(suggestion.place_name);
                    setLatitude(suggestion.center[1]);
                    setLongitude(suggestion.center[0]);
                    setSuggestions([]);
                  }}
                >
                  {suggestion.place_name}
                </Suggestion>
              );
            })}
          </SuggestionWrapper>
        )}
      </fieldset>
      <div className="wrapper w-full flex flex-row gap-4">
        <fieldset className="w-1/2 flex flex-col relative">
          <input
            className="text-black order-2 p-2 bg-transparent rounded-lg border-2 my-2 text-sm"
            type="number"
            id="latitude"
            name="latitude"
            value={latitude}
            onChange={setLatitude}
          />
          <label className="order-1 ml-2" htmlFor="latitude">
            latitude
          </label>
        </fieldset>

        <fieldset className="w-1/2 flex flex-col relative justify-center">
          <input
            className="text-black order-2 p-2 text-sm bg-transparent rounded-lg border-2 my-2"
            type="number"
            id="longitude"
            name="longitude"
            value={longitude}
            onChange={setLongitude}
          />
          <label className="order-1 ml-2" htmlFor="longitude">
            longitude
          </label>
        </fieldset>
      </div>
    </>
  );
}
