import { useState } from "react";

export default function SMSapi() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
      <form onSubmit={sendMessage}>
        <fieldset>
          <label htmlFor="phone">Phone Number</label>
          <input
            onChange={(event) => setPhone(event.target.value)}
            placeholder="phoen number"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="message">Message</label>
          <textarea
            onChange={(event) => setMessage(event.target.value)}
            id="message"
            required
            placeholder="Message"
            className={styles.textarea}
          ></textarea>
        </fieldset>
        <button disabled={loading} type="submit" className={styles.button}>
          Send Message
        </button>
        {success && (
          <p className={styles.success}>Message sent successfully.</p>
        )}
        {error && (
          <p className={styles.error}>
            Something went wrong. Please check the number.
          </p>
        )}
      </form>
    </>
  );
}
