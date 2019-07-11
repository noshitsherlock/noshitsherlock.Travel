import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import Situation from "./Situation";
import Departure from "./Departure";
import ReactPullToRefresh from "react-pull-to-refresh";

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
  const [refresh, setRefresh] = useState(false);

  function handleRefresh(resolve, reject) {
    setRefresh(!refresh);
    if (true) {
      resolve();
    } else {
      reject();
    }
  };

  //const { loading: travelLoading, data: travelData } = useFetch("http://192.168.86.29:5000/api/travel");
  //const { loading: situationLoading, data: situationData } = useFetch("http://192.168.86.29:5000/api/situation");
  const { loading: travelLoading, data: travelData } = useFetch("http://localhost:5000/api/travel", refresh);
  const { loading: situationLoading, data: situationData } = useFetch("http://localhost:5000/api/situation", refresh);

  return (
    <ReactPullToRefresh
      onRefresh={handleRefresh}>
      <div id="ptr">
        <div className="loading">
          <span id="l1"></span>
          <span id="l2"></span>
          <span id="l3"></span>
        </div>
      </div>

      <div id="content">
        <SwipeableViews enableMouseEvents>
          <div className="site">
            <h1><i className="icon ion-md-bus"></i> Linje 134</h1>
            {travelLoading
              ? <div>Loading...</div>
              : <Departure data={travelData}></Departure>
            }
          </div>
          <div>
            {situationLoading
              ? <div>Loading...</div>
              : <Situation data={situationData}></Situation>
            }

          </div>
        </SwipeableViews>
      </div>
    </ReactPullToRefresh>
  )
}

export default Travel;
