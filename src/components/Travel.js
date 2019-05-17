import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import SwipeableViews from "react-swipeable-views"
import Situation from "./Situation";

function StrikeTroughTime({date}) {
  return <a href="#" className="badge badge-light"><del><Moment format="HH:mm">{date}</Moment></del></a>
}

function RegularTime({date}) {
  return <span><a href="#" className="badge badge-primary"><Moment format="HH:mm">{date}</Moment></a></span>
}

function RegularLightTime({date}) {
  return <span><a href="#" className="badge badge-light"><Moment format="HH:mm">{date}</Moment></a></span>
}

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

  return {loading,data};
};

function Travel() {

  //const {loading,data} = useFetch("http://192.168.86.29:5000/api/travels");
  const {loading:travelLoading,data:travelData} = useFetch("http://localhost:5000/api/travel");
  const {loading:situationLoading,data:situationData} = useFetch("http://localhost:5000/api/situation");
  
  return (
    <SwipeableViews enableMouseEvents>
        <div className="site">
          <h1><i className="icon ion-md-bus"></i> Linje 134</h1>
          {travelLoading ? <div>Loading...</div> :
          <ul className="list-group">
            
          {JSON.parse(travelData).ResponseData.Buses.map(bus => 
            <li key={bus.JourneyNumber} className="list-group-item">
              <p>Går om <span className="badge badge-pill badge-info">{bus.DisplayTime}</span> {bus.TimeTabledDateTime === bus.ExpectedDateTime 
                ? <RegularLightTime date={bus.TimeTabledDateTime}></RegularLightTime> 
                : <span><RegularTime date={bus.ExpectedDateTime}></RegularTime> <StrikeTroughTime date={bus.TimeTabledDateTime}></StrikeTroughTime></span>}</p>
            </li>
            )}
          </ul>
          }
        </div>   
        <div>
        {situationLoading ? <div>Loading...</div> :
          <div className="list-group">
            
          {JSON.parse(situationData).ResponseData.TrafficTypes.map(types => 
            <a key={types.Id} href="#" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{types.Name}</h5>
              {/* <small>3 days ago</small> */}
            </div>
            {types.Events.map(event =>
              <p class="mb-1">{event.Message}</p>
              )}
            {/* <small>Donec id elit non mi porta.</small> */}
          </a>
            )}
          </div>

          // <Situation trafficTypes={situationData}></Situation>
          }
         
        </div> 
    </SwipeableViews>
  )
}

export default Travel;
