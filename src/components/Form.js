import useSWR from "swr";
import RatingForm from "./RatingForm";
import FindLocationInput from "./FindLocationInput";
import UploadIcon from "./graphics/Upload";
import { useState } from "react";
import Image from "next/image";

export default function Form({ classes, handleClose, session }) {
  const places = useSWR("/api/places");
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);

    // for multiple files

    // for (const file of e.target.files) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     setImageSrc((imgs) => [...imgs, reader.result]);
    //   };
    //   reader.onerror = () => {
    //     console.log(reader.error);
    //   };
    // }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData(event.target);

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "xoclrdrj");
    const upload = await fetch(
      "https://api.cloudinary.com/v1_1/dqcleqhsb/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(upload.secure_url);
    setUploadData(upload);

    const features = formData.getAll("features");
    const data = Object.fromEntries(formData);
    data.features = features;
    data.ratedBy = session.user.id;
    data.inModeration = true;
    data.images = imageSrc
      ? [{ url: upload.secure_url, inModeration: true }]
      : [];
    event.target.reset();
    console.log(data);
    handleAddPlace(data);
  }

  async function handleAddPlace(data) {
    const response = await fetch(`/api/places/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      places.mutate();
      //push("/");
      handleClose();
    } else {
      console.error(`"Error: ${response.status}`);
    }
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      autoComplete="off"
      className={`p-6 flex align-center flex-col gap-6 items-center ${classes} ratingform`}
    >
      <h2 className="text-2xl p-2 border-b border-tertiary-color mb-10">
        Create a new Location
      </h2>
      <fieldset className="w-full flex flex-col relative justify-center">
        <input
          className="w-full text-black bg-transparent rounded-lg border-primary-grey p-2 text-sm border-2 my-2 order-2"
          type="text"
          id="name"
          name="name"
        />
        <label htmlFor="name" className="block order-1 ml-2">
          Tell us it&apos;s quirky name!
        </label>
      </fieldset>

      <FindLocationInput />

      <fieldset className="w-full relative flex mb-1 flex-row radio-group gap-4">
        <input
          type="radio"
          name="typeOf"
          id="bar"
          value="bar"
          className="hidden"
        />
        <label
          htmlFor="bar"
          className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
        >
          #Bar
        </label>
        <input
          type="radio"
          name="typeOf"
          id="club"
          value="club"
          className="hidden"
        />
        <label
          htmlFor="club"
          className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
        >
          #Club
        </label>
        <input
          type="radio"
          name="typeOf"
          id="restaurant"
          value="restaurant"
          className="hidden"
        />
        <label
          htmlFor="restaurant"
          className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
        >
          #Restaurant
        </label>
        <input
          type="radio"
          name="typeOf"
          id="other"
          value="other"
          className="hidden"
        />
        <label
          className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
          htmlFor="other"
        >
          #Other
        </label>
      </fieldset>

      <fieldset className="w-full flex flex-col relative mb-1 checked-group">
        <legend className="ml-2 monospace mb-2">features</legend>
        <div className="wrapper flex flex-row gap-4">
          <input
            type="checkbox"
            name="features"
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
            name="features"
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
          <input
            type="checkbox"
            name="features"
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
        </div>
      </fieldset>

      <fieldset className="w-full flex flex-col relative">
        <textarea
          className="w-full text-black bg-transparent rounded-lg border-primary-grey p-2 text-sm border-2 my-2 order-2"
          type="text"
          id="comment"
          name="body"
        />
        <label htmlFor="comment" className="block order-1 ml-3">
          what makes this place so special?
        </label>
      </fieldset>
      <fieldset className="upload flex flex-col mb-4 self-start">
        <input
          className="hidden"
          id="file"
          type="file"
          name="file"
          onChange={handleOnChange}
        />
        <label
          htmlFor="file"
          className="rounded-lg bg-white px-8 w-fit p-2 border-2 border-primary-grey monospace flex flex-row cursor-pointer items-center order-2"
        >
          <UploadIcon classes="mr-2" />
          upload...
        </label>
        <p className="monospace ml-2 mb-1 order-1">Upload image</p>
      </fieldset>

      {imageSrc ? (
        <Image
          src={imageSrc}
          className="preview self-start"
          width="200"
          height="100"
          alt="preview of uploaded media content"
        />
      ) : null}

      <RatingForm />
      <button
        className="relative inline-flex items-center text-xl bg-secondary-color text-white p-1.5 px-6 mb-6 font-medium rounded-lg hover:bg-secondary-darker"
        type="submit"
      >
        submit
      </button>
    </form>
  );
}
