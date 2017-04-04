/**
 * Created by minhluong on 4/3/17.
 */
import { addressReducer } from './address.js';
import { viewReducer } from './view.js';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
    address: addressReducer,
    view: viewReducer
});

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
}