import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function SearchPlace({ classes, index, flyToQuery }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  if (value != null) {
    flyToQuery(value.location[1], value.location[0]);
  }

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      className={classes}
      disablePortal
      id="combo-box-demo"
      options={index}
      sx={{ width: 400, ml: 10 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for quirky places.."
          isOptionEqualToValue={index.label}
        />
      )}
    />
  );
}
