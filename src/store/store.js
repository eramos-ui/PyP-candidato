import { createStore, combineReducers, applyMiddleware, compose  }  from 'redux';

import thunk from 'redux-thunk'; //para utilizar redux-thunk--middleware

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';

//import { menuReducer } from '../reducers/menuReducer';
//import { contactReducer } from '../reducers/contactReducer';
//import { usuarioReducer } from '../reducers/usuarioReducer';
//para tener varios middlewares
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const  reducers = combineReducers({
 auth: authReducer,
 ui: uiReducer,  

})
export const store = createStore( 
    reducers ,
    composeEnhancers(
        applyMiddleware( thunk )
    )
    ); 