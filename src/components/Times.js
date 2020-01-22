import React from "react";
import Moment from "react-moment"

// When the departure should have been
function StrikeTroughTime({ date }) {
    return (
        <del><Moment format="HH:mm">{date}</Moment></del>
    )
}

// When everything is awesome
function RegularTime({ date }) {
    return (
        <Moment format="HH:mm">{date}</Moment>
    )
}

// This will be shown together with the StrikeTrough component
function RegularLightTime({ date }) {
    return (
        <Moment format="HH:mm">{date}</Moment>
    )
}

export { StrikeTroughTime, RegularLightTime, RegularTime }