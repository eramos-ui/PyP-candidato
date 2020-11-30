

import { types } from '../types/types';

const initialState = {
  checking: true, // si debe autenticarse
  //uid: null,
  //name: null

}
export const authReducer = (state = initialState , action ) => {
  //console.log('Auth-reducer-ini', action, state ) ;
  switch (action.type ) {
    case types.authLogin:
      return {
           ...state,
           ...action.payload,
           checking: false   
          }
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false
      }   
    case types.authLogout:
      return { //no retornamos el state para que borre uid y name
          checking: false   
      }
    default:
      return state;
  }
}