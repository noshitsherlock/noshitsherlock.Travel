import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

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

function Situation({ data }) {

    const classes = useStyles();

    return (
        <List className={classes.root}>
            {data.ResponseData.TrafficTypes.map(types =>
                <div key={types.Id}>
                    <ListItem>
                    <ListItemText
                        primary={<Typography variant="h5">{types.Name}</Typography>}
                        secondary={
                            types.Events.map(event =>
                            <React.Fragment key={event.EventId}>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {event.Message}
                            </Typography>                            
                            </React.Fragment>
                            )
                        }
                        />
                    </ListItem>    
                    <Divider variant="middle"/>                
                </div>                
            )}
        </List>
    )
}

export default Situation;