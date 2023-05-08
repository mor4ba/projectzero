import { useState } from "react";
import Popover from "@mui/material/Popover";
import Message from "./graphics/Message";

export default function SMSapi() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const sendMessage = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    const response = await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone, message: message }),
    });

    const apiResponse = await response.json();

    if (apiResponse.success) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="text-tertiary-color fixed bottom-6 left-6 p-2 border-2 border-tertiary-color rounded-full hover:bg-secondary-color hover:border-secondary-color hover:text-white transition-all"
      >
        <Message />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className=""
      >
        <form onSubmit={sendMessage} className="p-8 px-10 popover__form">
          <fieldset className="flex flex-col mb-10 relative">
            <input
              onChange={(event) => setPhone(event.target.value)}
              required
              className="px-4 py-2 border-2 border-primary-grey order-2 "
            />
            <label
              className="ml-2 bottom-1.5 monospace block order-1 relative"
              htmlFor="phone"
            >
              Phone Number
            </label>
          </fieldset>
          <fieldset className="flex flex-col mb-10">
            <textarea
              onChange={(event) => setMessage(event.target.value)}
              id="message"
              required
              className="px-4 py-2 border-2 border-primary-grey order-2"
            ></textarea>
            <label
              htmlFor="message"
              className="order-1 monospace ml-2 relative bottom-1.5"
            >
              Message
            </label>
          </fieldset>
          <button
            disabled={loading}
            type="submit"
            className="rounded-lg bg-secondary-color text-white p-4 py-2 hover:bg-secondary-darker font-bold"
          >
            Send Message
          </button>
          {success && <p className="">Message sent successfully.</p>}
          {error && (
            <p className="">Something went wrong. Please check the number.</p>
          )}
        </form>
      </Popover>
    </>
  );
}
