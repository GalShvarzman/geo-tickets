import { createStore, applyMiddleware, compose} from 'redux';
import {reducer} from './reducer';
import thunk from 'redux-thunk';

export interface IState{
    tickets:any[],
    [i:string]:any
}

const initialState:IState = {
    tickets : []
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer,initialState, composeEnhancers(applyMiddleware(thunk)));

