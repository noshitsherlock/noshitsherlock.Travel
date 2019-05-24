import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import Situation from "./Situation";
import Departure from "./Departure";

const useFetch = url => {
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
  }, []);

  return { loading, data };
};

function Travel() {

  const { loading: travelLoading, data: travelData } = useFetch("http://192.168.86.29:5000/api/travel");
  const { loading: situationLoading, data: situationData } = useFetch("http://192.168.86.29:5000/api/situation");
  //const {loading:travelLoading,data:travelData} = useFetch("http://localhost:5000/api/travel");
  //const {loading:situationLoading,data:situationData} = useFetch("http://localhost:5000/api/situation");

  return (
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
  )
}

export default Travel;
