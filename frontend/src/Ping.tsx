import { useEffect, useState } from "react";

const Ping = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/ping/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error:", err));
  }, []);

  return <h2>Backend dice: {message}</h2>;
};

export default Ping;
