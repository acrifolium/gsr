import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { nanoid } from 'nanoid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const MemoListItem = React.memo(({ item }) => {
    return (
        <ListItem role={undefined} dense>
            <ListItemText style={{textAlign: 'center'}} primary={item[0]} />
            <ListItemText style={{textAlign: 'center'}} primary={item[1]} />
        </ListItem>
    );
});

const MemoList = (({list}) => {
    return (
        <List>
            <ListItem key={nanoid()} role={undefined} dense>
                <ListItemText style={{textAlign: 'center'}} primary="Price" />
                <ListItemText style={{textAlign: 'center'}} primary="Size" />
            </ListItem>
            {list.map(item => (
                <MemoListItem key={nanoid()} item={item} />
            ))}   
        </List>
    );
});

const MemoizedList = React.memo(MemoList);

const  OrderBook = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="h4">
                                BIDS
                            </Typography>
                        </Box>
                        {props.bids ? (
                            <MemoizedList list={props.bids} />
                        ) : ("No data bids")}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="h4">
                                ASKS
                            </Typography>
                        </Box>
                        {props.asks ? (
                            <MemoizedList list={props.asks} />
                        ) : ("No data asks")} 
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default OrderBook;
