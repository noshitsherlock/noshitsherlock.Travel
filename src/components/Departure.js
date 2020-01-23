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
    const hasMultipleTravel = data.responseData.buses.length > 0 && data.responseData.metros.length > 0;
    const busLength = data.responseData.buses.length;
    const metroLength = data.responseData.metros.length

    function handleClick() {
        if (hasMultipleTravel) filter === "BUS" ? setFilter("METROS") : setFilter("BUS");
    }

    const classes = useStyles();

    return (
        <div>
            <Typography variant="h2">
                {busLength > 0 ? <i className={"icon ion-md-bus " + (filter != "BUS" ? "disabled" : "")} onClick={handleClick}></i> : ""}
                {metroLength > 0 ? <i className={"ion ion-md-train icon-space " + (filter != "METROS" ? "disabled" : "")} onClick={handleClick}></i> : ""}
                <span className="icon-space">{busLength > 0 ? data.responseData.buses[0].stopAreaName : data.responseData.metros[0].stopAreaName}</span>
            </Typography>
            {filter === "BUS" ?
                <List className={classes.root}>
                    {data.responseData.buses.map(bus =>
                        <div>
                            <ListItem key={bus.journeyNumber} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className={classes.large}>{bus.displayTime}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${bus.lineNumber} till ${bus.destination}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {
                                                    bus.timeTabledDateTime === bus.expectedDateTime
                                                        ? <Chip label={<RegularLightTime date={bus.timeTabledDateTime}></RegularLightTime>} color="primary" />
                                                        : <span><Chip label={<RegularTime date={bus.expectedDateTime}></RegularTime>} /> <Chip label={<StrikeTroughTime date={bus.timeTabledDateTime}></StrikeTroughTime>} color="secondary" /></span>
                                                }
                                                {
                                                    bus.deviations && bus.deviations.length > 0 ? <Deviation collection={bus.deviations}></Deviation> : ""
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
                    {data.responseData.metros.map(metro =>
                        <div>
                            <ListItem key={metro.journeyNumber} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className={classes.large}>{metro.displayTime}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${metro.lineNumber} till ${metro.destination}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {
                                                    metro.timeTabledDateTime === metro.expectedDateTime
                                                        ? <Chip label={<RegularLightTime date={metro.timeTabledDateTime}></RegularLightTime>} color="primary" />
                                                        : <span><Chip label={<RegularTime date={metro.expectedDateTime}></RegularTime>} /> <Chip label={<StrikeTroughTime date={metro.timeTabledDateTime}></StrikeTroughTime>} color="secondary" /></span>
                                                }
                                                {
                                                    metro.deviations && metro.deviations.length > 0 ? <Deviation collection={metro.deviations}></Deviation> : ""
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