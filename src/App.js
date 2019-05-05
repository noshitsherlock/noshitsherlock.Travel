import React, { useState, useEffect } from "react";
import Moment from "react-moment";

function strikeTroughTime(date) {
  return <a href="#" className="badge badge-light"><del><Moment format="HH:mm">{date}</Moment></del></a>
}

function regularTime(date) {
  return <span><a href="#" className="badge badge-primary"><Moment format="HH:mm">{date}</Moment></a></span>
}

function regularLightTime(date) {
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

function App() {

  const {loading,data} = useFetch("http://192.168.86.29:5000/api/travels");

  return (
    <div className="site">
      <h1><i className="icon ion-md-bus"></i> Linje 134</h1>
      {loading ? <div>Loading...</div> :
      <ul className="list-group">
        
      {JSON.parse(data).ResponseData.Buses.map(bus => 
        <li key={bus.JourneyNumber} className="list-group-item">
          <p>Går om <span className="badge badge-pill badge-info">{bus.DisplayTime}</span> {bus.TimeTabledDateTime == bus.ExpectedDateTime 
            ? regularLightTime(bus.TimeTabledDateTime) 
            : <span>{regularTime(bus.ExpectedDateTime)} {strikeTroughTime(bus.TimeTabledDateTime)}</span>}</p>
        </li>
        )}

      </ul>
      }
    </div>
  )
}

export default App;
