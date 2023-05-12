import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Search from "./graphics/Search";
import { Popover } from "@mui/material";

export default function SearchPlace({ classes, index, flyToQuery }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [barChecked, setBarChecked] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? "search-popover" : undefined;

  if (value != null) {
    flyToQuery(value.location[1], value.location[0]);
  }

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        className={`${classes} md:w-96 md:ml-20 mt-20 ml-2 w-80 md:mt-4`}
        disablePortal
        id="combo-box-demo"
        options={index}
        // sx={{ width: 400, ml: 10 }}
        renderInput={(params) => (
          <TextField {...params} label="Search for places.." />
        )}
      />
    </>
  );
}
