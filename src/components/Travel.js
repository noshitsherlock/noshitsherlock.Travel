import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import Situation from "./Situation";
import Departure from "./Departure";
import Pullable from "react-pullable"
import { config } from "./constants";
import uuid from "uuid";
import { useGlobalState } from "../state";
import AddSiteId from "./AddSiteId";

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
                 <AddSiteId></AddSiteId>
              </SwipeableViews>
          }

        </div>
      </Pullable>
  )
}

export default Travel;
