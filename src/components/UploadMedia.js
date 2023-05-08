import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import UploadIcon from "./graphics/Upload";

export default function UploadMedia({ id }) {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const place = useSWR(`/api/places/${id}`, {});

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);

    // for multiple files

    /*
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc((imgs) => [...imgs, reader.result]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
    */
  }

  async function handleOnSubmit(event, id) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "xoclrdrj");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dqcleqhsb/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);

    const imageData = {
      id: id,
      inModeration: true,
      image: data.secure_url,
    };

    const response = await fetch("/api/places", {
      method: "PUT",
      body: JSON.stringify(imageData),
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

  return (
    <div className="mb-10">
      <form
        className=""
        method="post"
        onChange={handleOnChange}
        onSubmit={(event) => handleOnSubmit(event, id)}
      >
        <fieldset className="upload flex flex-col mb-4">
          <input className="hidden" id="file" type="file" name="file" />
          <label
            htmlFor="file"
            className="rounded-lg bg-white px-8 w-fit p-2 border-2 border-primary-grey monospace flex flex-row cursor-pointer items-center order-2"
          >
            <UploadIcon classes="mr-2" />
            upload...
          </label>
          <p className="monospace ml-2 mb-1 order-1">Upload images</p>
        </fieldset>

        {imageSrc ? (
          <Image
            src={imageSrc}
            className="preview"
            width="200"
            height="100"
            alt="preview of uploaded media content"
          />
        ) : null}

        {imageSrc && !uploadData && (
          <p>
            <button className="px-4 py-1 my-4 bg-secondary-color text-white rounded-lg hover:bg-secondary-darker">
              Upload File
            </button>
          </p>
        )}

        {uploadData && (
          <div className="wrapper mt-6">
            <h3 className="text-lg text-secondary-darker mb-2">
              Upload successful!
            </h3>
            <p className="monospace max-w-3/4">
              Your image is now in moderation. As soon as we verify that it
              follows our code of conduct, the image will be visible on this
              page.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
