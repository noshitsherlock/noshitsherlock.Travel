import React, { useState, useEffect } from "react";

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

  const {loading,data} = useFetch("https://localhost:5001/api/travels");

  return (
    <div className="site">
      <h1><i className="icon ion-md-bus"></i> Linje 134</h1>
      {loading ? <div>Loading...</div> :
      <ul className="list-group">
        
      {JSON.parse(data).ResponseData.Buses.map(bus => 
        <li key={bus.JourneyNumber} className="list-group-item">
          Går om <span className="badge badge-pill badge-info">{bus.DisplayTime}</span>
        </li>
        )}

      </ul>
      }
    </div>
  )
}

export default App;
