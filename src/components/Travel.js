import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import Situation from "./Situation";
import Departure from "./Departure";
import Pullable from "react-pullable"
import { config } from "./constants";
import uuid from "uuid";
import Firebase from "firebase";

const useFetch = (url, refresh) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [refresh]);

  return { loading, data };
};

function getUserData() {
  return new Promise(function (resolve, reject) {
    Firebase.database()
      .ref("/")
      .on("value", snapshot => {
        const state = snapshot.val();
        console.log("From promise:" + state);
        resolve(state);
      })
  });
};

function Travel() {
  const [siteIds, setSiteIds] = useState("");
  const [refresh, setRefresh] = useState(false);

  const writeData = () => {
    Firebase.database()
      .ref("/")
      .set("siteids=1532&siteids=9119").then(function() {
        setSiteIds("siteids=1532&siteids=9119");
        setRefresh(!refresh);
      });
    //.set("siteids=1532&siteids=9119&siteids=9192");

    //setSiteIds("siteids=1532&siteids=9119&siteids=9192");

    console.log("DATA SAVED");
  };

  useEffect(() => {
    getUserData().then(function (value) {
      if(siteIds != value) setSiteIds(value);
          
      setRefresh(true);
      console.log("From then");
    });
  });

  const { loading: travelLoading, data: travelData } = useFetch(config.url.API_URL_TRAVEL_MULTIPLE + siteIds, refresh);
  const { loading: situationLoading, data: situationData } = useFetch(config.url.API_URL_SITUATION, refresh);

  return (
    siteIds.length > 0 && !travelLoading && !situationLoading &&
    <Pullable onRefresh={() => setRefresh(!refresh)}>
      <div>
        {
          travelLoading
            ? <div>Loading...</div>
            : <SwipeableViews enableMouseEvents>
              {
                travelData.map(travel =>
                  <Departure key={uuid.v4()} data={travel}></Departure>
                )
              }

              {
                situationLoading
                  ? <div>Loading...</div>
                  : <Situation data={situationData}></Situation>
              }

              <div>
                <button onClick={writeData}>PRESS</button>
                <button onClick={getUserData}>GET DATA</button>

                <p>SiteIds: {siteIds}</p>
              </div>
            </SwipeableViews>
        }

      </div>
    </Pullable>
  )
}

export default Travel;
