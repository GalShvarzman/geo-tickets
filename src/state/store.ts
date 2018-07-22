import { createStore, applyMiddleware, compose} from 'redux';
import {reducer} from './reducer';
import thunk from 'redux-thunk';
import {ITicket} from "../App";

export interface IState{
    tickets:ITicket[],
    errorMsg:string|null,
    [i:string]:any
}

const initialState:IState = {
    tickets : [],
    errorMsg:null
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer,initialState, composeEnhancers(applyMiddleware(thunk)));

