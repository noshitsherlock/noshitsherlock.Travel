import React from "react";
import Moment from "react-moment"

function StrikeTroughTime({ date }) {
    return (
        <a href="#" className="badge badge-light"><del><Moment format="HH:mm">{date}</Moment></del></a>
    )
}

function RegularTime({ date }) {
    return (
        <span><a href="#" className="badge badge-primary"><Moment format="HH:mm">{date}</Moment></a></span>
    )
}

function RegularLightTime({ date }) {
    return (
        <span><a href="#" className="badge badge-light"><Moment format="HH:mm">{date}</Moment></a></span>
    )
}

export { StrikeTroughTime, RegularLightTime, RegularTime }