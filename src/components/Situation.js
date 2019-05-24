import React from "react";

function Situation({ data }) {
    return (
        <ul className="list-group">
            {JSON.parse(data).ResponseData.TrafficTypes.map(types =>
                <li key={types.Id} className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{types.Name}</h5>
                        {/* <small>3 days ago</small> */}
                    </div>
                    {types.Events.map(event =>
                        <p key={event.EventId} className="mb-1">{event.Message}</p>
                    )}
                    {/* <small>Donec id elit non mi porta.</small> */}
                </li>
            )}
        </ul>
    )
}

export default Situation;