import { types } from "../types/types"

const initialState = {
    idOrganizacion: 0,
    loading: false,
    msgError: null 
}

//este reducer es para el manejo de errores y bloqueo del click en botón ingreso
export const uiReducer = ( state= initialState, action) =>{
    // console.log(state);
    //  console.log(action);

     switch ( action.type ) {
         case types.uiSetError:
            return {
               ...state,
               msgError: action.payload
            }  
            case types.uiRemoveError:
                return {
                   ...state,
                   msgError: null
                }  
            case types.uiStartLoading:
                   return {
                    ...state, 
                    loading: true                     
                }
            case types.uiFinishLoading:
                return {
                    ...state, 
                    loading: false
                }
            case types.uiSetOrganizacion:
                return {
                    ...state,
                    idOrganizacion: action.payload
                }    
            default:
                 return state;
        }
}