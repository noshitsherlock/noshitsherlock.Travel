import React from "react"
import Moment from "react-moment"

function StrikeTroughTime({ date }) {
    return <a href="#" className="badge badge-light"><del><Moment format="HH:mm">{date}</Moment></del></a>
  }
  
  function RegularTime({ date }) {
    return <span><a href="#" className="badge badge-primary"><Moment format="HH:mm">{date}</Moment></a></span>
  }
  
  function RegularLightTime({ date }) {
    return <span><a href="#" className="badge badge-light"><Moment format="HH:mm">{date}</Moment></a></span>
  }

function Departure({ data }) {
    return (
        <ul className="list-group">
            {JSON.parse(data).ResponseData.Buses.map(bus =>
                <li key={bus.JourneyNumber} className="list-group-item">
                    <p>Går om <span className="badge badge-pill badge-info">{bus.DisplayTime}</span> {bus.TimeTabledDateTime === bus.ExpectedDateTime
                        ? <RegularLightTime date={bus.TimeTabledDateTime}></RegularLightTime>
                        : <span><RegularTime date={bus.ExpectedDateTime}></RegularTime> <StrikeTroughTime date={bus.TimeTabledDateTime}></StrikeTroughTime></span>}</p>
                </li>
            )}
        </ul>
    )
}

export default Departure;