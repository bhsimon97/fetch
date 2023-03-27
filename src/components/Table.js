import axios from "axios";
import { useEffect, useState } from "react";

export default function Table() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = "https://frontend-take-home-service.fetch.com";

  const [dogIds, setDogIds] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl + "/dogs/search", {
        withCredentials: true,
        headers: {
          "fetch-api-key": apiKey,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.resultIds);
        setDogIds(response.data.resultIds);
        console.log(dogIds);
      });
  }, []);

  useEffect(() => {
    axios
      .post(apiUrl + "/dogs", dogIds, {
        withCredentials: true,
        headers: {
          "fetch-api-key": apiKey,
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response));
  }, [dogIds]);

  return <></>;
}
