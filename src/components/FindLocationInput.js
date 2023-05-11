import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0 auto;
`;

const SuggestionWrapper = styled.div`
  background: white;
  position: absolute;
  color: black;
  width: 400px;
  padding: 10px 20px;
  border-radius: 0px 0px 10px 10px;
`;

const Suggestion = styled.p`
  cursor: pointer;
  max-width: 400px;
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
    <Wrapper>
      <label htmlFor="location">Address</label>
      <input
        className="text-white bg-transparent rounded-lg border-2 my-2"
        type="text"
        placeholder="Address"
        id="location"
        name="location"
        value={value}
        onChange={(event) => handleChange(event)}
        // isTyping={value !== ""}
      />

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

      <label htmlFor="latitude">latitude</label>
      <input
        className="text-white bg-transparent rounded-lg border-2 my-2"
        type="number"
        id="latitude"
        name="latitude"
        value={latitude}
        onChange={setLatitude}
      />

      <label htmlFor="longitude">longitude</label>
      <input
        className="text-white bg-transparent rounded-lg border-2 my-2"
        type="number"
        id="longitude"
        name="longitude"
        value={longitude}
        onChange={setLongitude}
      />
    </Wrapper>
  );
}
