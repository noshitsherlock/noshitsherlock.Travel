import React, { useState } from "react"
import { RegularLightTime, RegularTime, StrikeTroughTime } from "./Times"

function Departure({ data }) {
    const [filter, setFilter] = useState("BUS");
    const hasMultipleTravel = data.responseData.buses.length > 0 && data.responseData.metros.length > 0;
    const busLength = data.responseData.buses.length;
    const metroLength = data.responseData.metros.length

    function handleClick() {
        if (hasMultipleTravel) filter === "BUS" ? setFilter("METROS") : setFilter("BUS");
    }

    return (
        <div>
            <h1>
                {busLength > 0 ? <i className={"icon ion-md-bus " + (filter != "BUS" ? "disabled" : "")} onClick={handleClick}></i> : ""}
                {metroLength > 0 ? <i className={"ion ion-md-train icon-space " + (filter != "METROS" ? "disabled" : "")} onClick={handleClick}></i> : ""}
                <span className="icon-space">{busLength > 0 ? data.responseData.buses[0].stopAreaName : data.responseData.metros[0].stopAreaName}</span>
            </h1>
            {filter === "BUS" ?
                <ul className="list-group">
                    {data.responseData.buses.map(bus =>
                        <li key={bus.journeyNumber} className="list-group-item">
                            <small>{bus.lineNumber} till {bus.destination}</small>                                
                            <p>Går om <span className="badge badge-pill badge-info">{bus.displayTime}</span> {bus.timeTabledDateTime === bus.expectedDateTime
                                ? <RegularLightTime date={bus.timeTabledDateTime}></RegularLightTime>
                                : <span><RegularTime date={bus.expectedDateTime}></RegularTime> <StrikeTroughTime date={bus.timeTabledDateTime}></StrikeTroughTime></span>}
                            </p>
                        </li>
                    )}
                </ul>
                : <div></div>
            }

            {filter === "METROS" ?
                <ul className="list-group">
                    {data.responseData.metros.map(metro =>
                        <li key={metro.journeyNumber} className="list-group-item">
                            <small>{metro.lineNumber} till {metro.destination}</small>
                            <p>Går om <span className="badge badge-pill badge-info">{metro.displayTime}</span> {metro.timeTabledDateTime === metro.expectedDateTime
                                ? <RegularLightTime date={metro.timeTabledDateTime}></RegularLightTime>
                                : <span><RegularTime date={metro.expectedDateTime}></RegularTime> <StrikeTroughTime date={metro.timeTabledDateTime}></StrikeTroughTime></span>}
                            </p>
                        </li>
                    )}
                </ul>
                : <div></div>
            }
        </div>
    )
}

export default Departure;