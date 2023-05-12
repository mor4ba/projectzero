import Filter from "./graphics/Filter";
import { Popover } from "@mui/material";
import { useState } from "react";

export default function FilterModul({ handleFilterChange, reset }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [barChecked, setBarChecked] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? "filter-popover" : undefined;
  return (
    <>
      <button
        className="absolute left-16 top-2.5 md:relative md:left-2"
        type="button"
        onClick={handleClick}
        aria-describedby={popoverId}
        variant="contained"
      >
        <Filter />
      </button>
      <Popover
        id={popoverId}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className="mt-4"
      >
        <form className="p-4" onChange={(event) => handleFilterChange(event)}>
          <div className="wrapper flex flex-row justify-between">
            <h3 className="monospace">Filter</h3>
            <h3
              className="cursor-pointer monospace"
              onClick={(event) => reset(event)}
            >
              Reset
            </h3>
          </div>
          <fieldset className="checked-group pt-4 flex flex-col gap-2">
            <div className="first-row flex flex-wrap flex-row gap-2">
              <input
                type="checkbox"
                name="filter"
                id="bar"
                value="bar"
                className="hidden"
                onChange={() => {
                  setBarChecked((barChecked) => !barChecked);
                }}
              />
              <label
                htmlFor="bar"
                className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
              >
                #bars
              </label>
              <input
                type="checkbox"
                name="filter"
                id="club"
                value="club"
                className="hidden"
              />
              <label
                htmlFor="club"
                className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
              >
                #clubs
              </label>
              <input
                type="checkbox"
                name="filter"
                id="restaurant"
                value="restaurant"
                className="hidden"
              />
              <label
                htmlFor="restaurant"
                className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
              >
                #restaurants
              </label>
              <input
                type="checkbox"
                name="filter"
                id="other"
                value="other"
                className="hidden"
              />
              <label
                htmlFor="other"
                className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
              >
                #other
              </label>
            </div>

            <h3 className="monospace mt-4">Features</h3>
            <div className="second-row mt-2 border-t-2 border-primary-grey flex flex-row gap-2">
              <fieldset className="checked-group pt-4 flex flex-wrap flex-row gap-2">
                <input
                  type="checkbox"
                  name="filter_feature"
                  id="kicker"
                  value="kicker"
                  className="hidden"
                />
                <label
                  htmlFor="kicker"
                  className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
                >
                  #kicker
                </label>
                <input
                  type="checkbox"
                  name="filter_feature"
                  id="darts"
                  value="darts"
                  className="hidden"
                />
                <label
                  htmlFor="darts"
                  className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
                >
                  #darts
                </label>
                <input
                  type="checkbox"
                  name="filter_feature"
                  id="pool"
                  value="pool"
                  className="hidden"
                />
                <label
                  htmlFor="pool"
                  className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
                >
                  #pool table
                </label>
              </fieldset>
            </div>
          </fieldset>
        </form>
      </Popover>
    </>
  );
}
