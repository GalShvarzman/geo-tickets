import * as React from 'react';
import {ITicket} from "../App";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

interface ITicketsListProps {
    tickets:ITicket[],
    classes:any,
    onDeleteTickets(ticketsToDeleteIds:string[]):void
}

interface ITicketsListState {
    checked : any[]
}

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper
    },
    listItemText :{
        fontSize:'1em'
    },
    button: {
        padding:0,
    },
    header:{
        fontSize:'1.3em'
    }
});

class TicketsList extends React.Component<ITicketsListProps, ITicketsListState> {
    constructor(props:ITicketsListProps){
        super(props);

        this.state = {
            checked: [],
        };
    }

    handleToggle = ticketId => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(ticketId);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(ticketId);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({checked: newChecked});
    };

    onDelete = () => {
        this.props.onDeleteTickets(this.state.checked);
    };

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <List>
                        <ListItem disabled classes={{root: 'classes-state-root', disabled: 'disabled'}} key="1" dense button>
                            <ListItemText className={classes.header} primary={`Tickets`} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={this.onDelete} className={classes.button} aria-label="Delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        {this.props.tickets.map((ticket) => (
                            <ListItem key={ticket.id} dense button className={classes.listItem}>
                                <ListItemText className={classes.listItemText} primary={`${ticket.lat}, ${ticket.lng}`} />
                                <ListItemSecondaryAction>
                                    <Checkbox color="primary"
                                        onChange={this.handleToggle(ticket.id)}
                                        checked={this.state.checked.indexOf(ticket.id) !== -1}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                        <Divider />
                    </List>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(TicketsList);