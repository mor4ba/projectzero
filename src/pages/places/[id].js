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
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { useTheme } from "@mui/material/styles";
import Bucket from "../../components/graphics/Bucket";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SMSapi from "../../components/SMScomponent";
import { uid } from "uid";
import UploadMedia from "../../components/UploadMedia";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Approve from "../../components/graphics/Approve";
import No from "../../components/graphics/No";
import { validateEntry } from "./moderation";
import Spinner from "../../components/Spinner";

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
  const theme = useTheme();
  const { data: session, update } = useSession();

  if ((session, data)) {
    var isBucket = session.user.savedPlaces.find((element) => element === id);
    var visited = session.user.beenTo.find((element) => element === id);
    var isRated = data.ratedBy.includes(session.user.id);
  }

  const [isVisited, setisVisited] = useState(visited ? true : false);
  const [isBucketlist, setIsBucketlist] = useState(isBucket ? true : false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function declineEntry(id) {
    const response = await fetch(`/api/places/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await response.json();
      router.push("/places/moderation");
    } else {
      console.error(`"Error: ${response.status}`);
    }
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  if (isLoading) return <Spinner />;

  const staticLocationUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-l+000(${data.longitude},${data.latitude})/${data.longitude},${data.latitude},14/800x400/?access_token=pk.eyJ1IjoibW9yNGJhIiwiYSI6ImNsZ2dsc2R6NjBjcWwzZXJyM2hqdGZrejEifQ.Tt-v3iroj4ffhu-uJ69Haw`;

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

  async function handleUpdateComment(id, placeId, userId) {
    const data = { commentID: id, placeID: placeId, userID: userId };

    const response = await fetch(`/api/places/${id}`, {
      method: "PUT",
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

  async function handleIsVisited(place, session) {
    if (!session) {
      alert("you must be logged in to use this feature");
      return;
    }

    if (isVisited) {
      return;
    }

    setisVisited((isVisited) => true);

    const data = {
      bool: isVisited,
      place: place.data._id,
      session: session.user,
    };

    const response = await fetch(`/api/user/`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      update();
      place.mutate();
    } else {
      console.error(`"Error: ${response.status}`);
    }
  }

  async function handleBucketlist(place, session) {
    if (!session) {
      alert("you must be logged in to use this feature");
      return;
    }

    setIsBucketlist((isBucketlist) => !isBucketlist);

    const data = {
      bool: isBucketlist,
      place: place.data._id,
      session: session.user,
    };

    const response = await fetch(`/api/user/`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      update();
      console.log(session);
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

  return (
    <div className="flex flex-col p-10 pt-0 m-auto max-w-4xl">
      <div className="entry-section flex flex-row justify-between border-b-2 pb-4 mb-2 border-secondary-color">
        <h1 className="text-2xl">
          {data.name}
          <span className="tag rounded-lg border-primary-grey border-2 p-1 px-2 ml-4 text-lg">
            <span className="monospace">#{data.typeOf}</span>
          </span>
        </h1>
        <div className="button-group flex flex-row gap-2">
          <button
            type="button"
            className="flex text-2xl"
            onClick={() => handleBucketlist(place, session)}
          >
            <Bucket state={isBucketlist} />
          </button>
          <button
            className="flex text-2xl"
            onClick={() => handleIsVisited(place, session)}
          >
            <Flag state={isVisited} />
          </button>
        </div>
      </div>
      <p className="text-xl mb-10">
        <span className="monospace">
          {data.count} {data.count === 1 ? "person has" : "people have"} been
          here.
        </span>
      </p>

      {data.features ? (
        <ul className="features ml-0 flex flex-row gap-2 mb-10">
          {data.features.map((feature) => {
            return (
              <li key={uid()}>
                <span className="tag rounded-lg border-primary-grey border-2 p-1 px-2 text-lg">
                  <span className="monospace">#{feature}</span>
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}

      {data.images ? (
        <Swiper
          spaceBetween={50}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className="w-full max-h-50 mb-10 shadow-lg"
        >
          <SwiperSlide>
            <span className="absolute left-0 top-0 p-2 text-black monospace">
              {data.location}
            </span>
            <Image
              src={staticLocationUrl}
              alt={`${data.name} location static image`}
              width={700}
              className="object-cover w-full"
              height="400"
            />
          </SwiperSlide>
          {data.images.map((slide) => {
            return (
              <SwiperSlide key={uid()}>
                <Image
                  src={slide.url}
                  width={800}
                  height={400}
                  alt={`${data.name} view`}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}

      <UploadMedia id={data._id} />

      <div>
        <div className="text-white mb-8">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Comments, Ratings and Ratingform organised in tabs"
          >
            <Tab
              className="shadow-2xl font-medium"
              label="Comments"
              {...a11yProps(0)}
            />
            <Tab label="Ratings" {...a11yProps(1)} />
            {!isRated || isVisited ? (
              <Tab label="Rate it!" {...a11yProps(2)} />
            ) : null}
          </Tabs>
        </div>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <CommentSection
              data={data}
              onSubmit={handleSubmit}
              handleUpdateComment={handleUpdateComment}
              session={session}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <RatingDisplay data={data} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <form
              className="flex flex-col"
              onSubmit={(event) => handleSubmit(event, "rating")}
            >
              <RatingForm />
              <button
                className="relative inline-flex w-fit items-center mt-10 self-center text-xl bg-secondary-color text-white p-1.5 px-6 mb-6 font-medium rounded-lg hover:bg-secondary-darker"
                type="submit"
              >
                submit
              </button>
            </form>
          </TabPanel>
        </SwipeableViews>
      </div>
      <SMSapi />
      {data.inModeration ? (
        <div className="moderation-wrapper flex flex-row w-full py-8 justify-center gap-8">
          <button
            className="text-secondary-color p-2 relative rounded-full border-2 border-secondary-color flex flex-col gap-4"
            type="button"
            onClick={() => validateEntry(data._id)}
          >
            <Approve />
            <span className="absolute self-center monospace">verify</span>
          </button>
          <button
            className="p-2 border-2 relative border-red-500 rounded-full text-red-500 flex flex-col gap-4"
            type="button"
            onClick={() => declineEntry(data._id)}
          >
            <No />
            <span className="absolute self-center monospace">decline</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
