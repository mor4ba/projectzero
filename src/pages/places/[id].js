import useSWR from "swr";
import { useRouter } from "next/router";
import RatingForm from "../../components/RatingForm";
import RatingDisplay from "../../components/RatingDisplay";
import CommentSection from "../../components/CommentSection";
import React from "react";
import Flag from "../../components/graphics/Flag";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Singleplace() {
  const router = useRouter();
  const { id } = router.query;
  const place = useSWR(`/api/places/${id}`);
  const { data, isLoading } = place;
  const [value, setValue] = useState(0);
  const [isVisited, setisVisited] = useState(false);
  const theme = useTheme();

  var optionalDisabled = {};

  if (!isVisited) {
    optionalDisabled["disabled"] = "disabled";
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  async function handleAddComment(data) {
    const response = await fetch(`/api/places/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      place.mutate();
    } else {
      console.error(`"Error: ${response.status}`);
    }
  }

  async function handleUpdateRating(data) {
    const response = await fetch(`/api/places/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      place.mutate();
    } else {
      console.error(`"Error: ${response.status}`);
    }
  }

  function handleSubmit(event, formKey = "") {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    event.target.reset();

    formKey === "rating" ? handleUpdateRating(data) : handleAddComment(data);
  }

  if (isLoading) return <div>We are currently loading this place.</div>;

  return (
    <div className="flex flex-col p-20 px-10 m-auto max-w-4xl">
      <div className="entry-section flex flex-row justify-between border-b-2 pb-4 mb-2 border-white">
        <h1 className="text-2xl">
          {data.name}{" "}
          <span className="tag rounded-lg border-white border-2 py-0 px-2 ml-4 text-lg">
            #{data.typeOf}
          </span>
        </h1>

        <button
          className="flex text-2xl"
          onClick={() => setisVisited((isVisited) => !isVisited)}
        >
          {isVisited ? "" : "been here? hit the flag."}
          <Flag state={isVisited} />
        </button>
      </div>
      <p className="text-xl mb-10">location: {data.location}</p>

      {/* TABBOX */}
      <div>
        <div className="text-white mb-8">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Comments, Ratings and Ratingform organised in tabs"
          >
            <Tab label="Comments" {...a11yProps(0)} />
            <Tab label="Ratings" {...a11yProps(1)} />
            <Tab label="Rate it!" {...a11yProps(2)} {...optionalDisabled} />
          </Tabs>
        </div>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <CommentSection data={data} onSubmit={handleSubmit} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <RatingDisplay data={data} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <form onSubmit={(event) => handleSubmit(event, "rating")}>
              <RatingForm />
              <button
                className="relative inline-flex mt-4 items-center justify-center p-0.5 mb-6 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                type="submit"
              >
                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  submit
                </span>
              </button>{" "}
            </form>
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}
