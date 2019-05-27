import React from "react"
import { RegularLightTime, RegularTime, StrikeTroughTime } from "./Times"

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