import Card from "../components/Card";
import { Navigate } from "react-router-dom";
import getCookie from "../constants/getCookie";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";

export default function Dashboard() {
  const [dogIds, setDogIds] = useState([]);
  const [dogData, setDogData] = useState([]);
  const [nextQuery, setNextQuery] = useState();
  const [sortAsc, setSortAsc] = useState(true);

  let sortString;

  sortAsc ? (sortString = "asc") : (sortString = "desc");

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = "https://frontend-take-home-service.fetch.com";

  useEffect(() => {
    axios
      .get(apiUrl + "/dogs/search?sort=breed:" + sortString, {
        withCredentials: true,
        headers: {
          "fetch-api-key": apiKey,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDogIds(response.data.resultIds);
        setNextQuery(response.data.next);
      });
  }, [sortString]);

  useEffect(() => {
    axios
      .post(apiUrl + "/dogs", dogIds, {
        withCredentials: true,
        headers: {
          "fetch-api-key": apiKey,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDogData(response.data);
      });
  }, [dogIds]);

  function getNextDogs() {
    axios
      .get(apiUrl + nextQuery, {
        withCredentials: true,
        headers: {
          "fetch-api-key": apiKey,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDogIds(response.data.resultIds);
        setNextQuery(response.data.next);
      });
  }

  if (getCookie("email") === "") {
    return <Navigate to="/" />;
  } else {
    if (dogData.length > 0) {
      return (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-full">
              <Search />
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 mr-1 rounded"
                onClick={() => setSortAsc(!sortAsc)}
              >
                Change Sort
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 ml-1 rounded"
                onClick={() => getNextDogs()}
              >
                Next Page
              </button>
            </div>
            {dogData.map((dog) => {
              return (
                <Card
                  name={dog.name}
                  image={dog.img}
                  breed={dog.breed}
                  age={dog.age}
                  zip={dog.zip_code}
                />
              );
            })}
          </div>
        </>
      );
    }
  }
}
