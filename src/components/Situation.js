import React from "react";

function Situation({situationData}) {
    return (
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
    )
}

export default Situation;