import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        width:'100%',
        height:'100%'
    },
    appBar:{
        height:'100%'
    }
};

function HeaderAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static" color="primary">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Geo Tickets
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(HeaderAppBar);