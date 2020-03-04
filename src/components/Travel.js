import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import Situation from "./Situation";
import Departure from "./Departure";
import Pullable from "react-pullable"
import { config } from "./constants";
import uuid from "uuid";

const useFetch = (url, refresh) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    console.log(url);
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // setInterval(() => {
    //   fetchData()
    // }, 60000);
  }, [refresh]);

  return { loading, data };
};

function Travel() {
  const [refresh, setRefresh] = useState(false);
  const { loading: travelLoading, data: travelData } = useFetch(config.url.API_URL_TRAVEL_MULTIPLE, refresh);
  const { loading: situationLoading, data: situationData } = useFetch(config.url.API_URL_SITUATION, refresh);

  return (
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
                 { <div>
                   {
                     situationLoading
                     ? <div>Loading...</div>
                     : <Situation data={situationData}></Situation>
                   }

                 </div> }
              </SwipeableViews>
          }

        </div>
      </Pullable>
  )
}

export default Travel;
