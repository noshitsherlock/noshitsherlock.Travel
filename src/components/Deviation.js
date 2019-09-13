import React, { useState } from "react"

function Deviation({deviations}) {
    const [show, setShow] = useState(false);

    function handleClick() {
        setShow(!show);
    }

    return (
        <span>
        <i className="ion ion-md-alert" onClick={handleClick}></i>
            {show ? <p>{deviations[0].text}</p> : "" }
        </span>
    )
}

export default Deviation;