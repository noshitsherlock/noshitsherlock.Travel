import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import Situation from "./Situation";
import Departure from "./Departure";
import ReactPullToRefresh from "react-pull-to-refresh";
import { config } from "./constants";
import uuid from "uuid";

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
    // setInterval(() => {
    //   fetchData()
    // }, 60000);
  }, [refresh]);

  return { loading, data };
};

function Travel() {
  let siteIdsQueryString = "siteids=1532&siteids=9119";
  const [refresh, setRefresh] = useState(false);
  const { loading: travelLoading, data: travelData } = useFetch(config.url.API_URL_TRAVEL_MULTIPLE + siteIdsQueryString, refresh);
  const { loading: situationLoading, data: situationData } = useFetch(config.url.API_URL_SITUATION, refresh);

  function handleRefresh(resolve, reject) {
    setRefresh(!refresh);
    if (true) {
      resolve();
    } else {
      reject();
    }
  };

  return (
    <ReactPullToRefresh onRefresh={handleRefresh}>
      <div id="ptr">
        <div className="loading">
          <span id="l1"></span>
          <span id="l2"></span>
          <span id="l3"></span>
        </div>
      </div>

      <div id="content">
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
      </div>
    </ReactPullToRefresh>
  )
}

export default Travel;
