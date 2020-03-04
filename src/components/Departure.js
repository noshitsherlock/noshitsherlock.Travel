import React, { useState } from "react"
import { RegularLightTime, RegularTime, StrikeTroughTime } from "./Times"
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import Deviation from "./Deviation"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 600,
        backgroundColor: theme.palette.background.paper,
        marginTop: 5,
    },
    large: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        width: theme.spacing(7),
        height: theme.spacing(7),
        textAlign: "center",
        marginRight: "10px"
    },
    inline: {
        display: 'inline',
    },
}));

function Departure({ data }) {
    const [filter, setFilter] = useState("BUS");
    const hasMultipleTravel = data.ResponseData.Buses.length > 0 && data.ResponseData.Metros.length > 0;
    const busLength = data.ResponseData.Buses.length;
    const metroLength = data.ResponseData.Metros.length

    function handleClick() {
        if (hasMultipleTravel) filter === "BUS" ? setFilter("METROS") : setFilter("BUS");
    }

    const classes = useStyles();

    return (
        <div>
            <Typography variant="h2">
                {busLength > 0 ? <i className={"icon ion-md-bus " + (filter != "BUS" ? "disabled" : "")} onClick={handleClick}></i> : ""}
                {metroLength > 0 ? <i className={"ion ion-md-train icon-space " + (filter != "METROS" ? "disabled" : "")} onClick={handleClick}></i> : ""}
                <span className="icon-space">{busLength > 0 ? data.ResponseData.Buses[0].StopAreaName : data.ResponseData.Metros[0].StopAreaName}</span>
            </Typography>
            {filter === "BUS" ?
                <List className={classes.root}>
                    {data.ResponseData.Buses.map(bus =>
                        <div key={bus.JourneyNumber}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className={classes.large}>{bus.DisplayTime}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${bus.LineNumber} till ${bus.Destination}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {
                                                    bus.TimeTabledDateTime === bus.ExpectedDateTime
                                                        ? <Chip component="span" label={<RegularLightTime date={bus.TimeTabledDateTime}></RegularLightTime>} color="primary" />
                                                        : <span><Chip component="span" label={<RegularTime date={bus.ExpectedDateTime}></RegularTime>} /> <Chip component="span" label={<StrikeTroughTime date={bus.TimeTabledDateTime}></StrikeTroughTime>} color="secondary" /></span>
                                                }
                                                {
                                                    bus.Deviations && bus.Deviations.length > 0 ? <Deviation collection={bus.Deviations}></Deviation> : ""
                                                }
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="middle" />
                        </div>
                    )}
                </List>
                : <div></div>
            }

            {filter === "METROS" ?
                <List className={classes.root}>
                    {data.ResponseData.Metros.map(metro =>
                        <div>
                            <ListItem key={metro.JourneyNumber} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className={classes.large}>{metro.DisplayTime}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${metro.LineNumber} till ${metro.Destination}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {
                                                    metro.TimeTabledDateTime === metro.ExpectedDateTime
                                                        ? <Chip label={<RegularLightTime date={metro.TimeTabledDateTime}></RegularLightTime>} color="primary" />
                                                        : <span><Chip label={<RegularTime date={metro.ExpectedDateTime}></RegularTime>} /> <Chip label={<StrikeTroughTime date={metro.TimeTabledDateTime}></StrikeTroughTime>} color="secondary" /></span>
                                                }
                                                {
                                                    metro.Deviations && metro.Deviations.length > 0 ? <Deviation collection={metro.Deviations}></Deviation> : ""
                                                }
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="middle" />
                        </div>
                    )}
                </List>
                : <div></div>
            }
        </div>
    );
}

export default Departure;