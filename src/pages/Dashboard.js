import Card from "../components/Card";
import { Navigate } from "react-router-dom";
import getCookie from "../constants/getCookie";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";
import Pill from "../components/Pill";

export default function Dashboard() {
  const [dogIds, setDogIds] = useState([]);
  const [dogData, setDogData] = useState([]);
  const [nextQuery, setNextQuery] = useState();
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedDogs, setSelectedDogs] = useState(new Set());
  const [selectedDogsArr, setSelectedDogsArr] = useState([]);

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

  function getMatchedDog() {
    let selectedDogIds = [];

    for (let i = 0; i < selectedDogsArr.length; i++) {
      let id = selectedDogsArr[i].id;
      selectedDogIds.push(id);
    }

    axios
      .post(apiUrl + "/dogs/match", selectedDogIds, {
        withCredentials: true,
        headers: {
          "fetch-api-key": apiKey,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      });
  }

  function handleSelect(dog) {
    setSelectedDogs(selectedDogs.add(dog));
    setSelectedDogsArr(Array.from(selectedDogs));
  }

  function handleRemove(dog) {
    console.log(dog);
    let newSet = selectedDogs;
    newSet.delete(dog);
    setSelectedDogs(newSet);
    setSelectedDogsArr(Array.from(selectedDogs));
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
                className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 mx-1 rounded"
                onClick={() => getNextDogs()}
              >
                Next Page
              </button>
              {selectedDogsArr.map((dog) => {
                return <Pill dog={dog} handleRemove={handleRemove} />;
              })}

              <button
                className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 mx-1 rounded"
                onClick={() => getMatchedDog()}
              >
                Match Dog
              </button>
            </div>
            {dogData.map((dog) => {
              return <Card dog={dog} handleSelect={handleSelect} />;
            })}
          </div>
        </>
      );
    }
  }
}
