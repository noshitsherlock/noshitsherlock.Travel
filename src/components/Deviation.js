import React, { useState } from "react"

function Deviation({collection}) {
    const [show, setShow] = useState(false);
    var collectionStyle = {display : "block"};

    function handleClick() {
        setShow(!show);
    }

    return (
        <span>
        <i className="ion ion-md-alert" onClick={handleClick}></i>
            {show ? <span>{collection.map((deviation, index) => <span key={index} style={collectionStyle}>{deviation.text}</span>)}</span> : "" }
        </span>
    )
}

export default Deviation;