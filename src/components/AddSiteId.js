import React from "react";
import { useGlobalState } from '../state';

function AddSiteId() {
    const [value, update] = useGlobalState('siteIds')
    return(
        <div>
        <button type="button" onClick={() => update(v => v + 1)}>+1</button>

        <p>{value}</p>
        </div>
    )
}

export default AddSiteId;