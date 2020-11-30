import { types } from '../types/types';
//import { firebase, googleAuthProvider } from '../firebase/firebase-config';

//import { finishLoading, startLoading } from './ui';

//import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';


//import { noteLogout } from './notes';


// export const startLogin = (email , password ) =>{
//     return async( dispatch ) =>{
//         //console.log('StartLogin-ini:',email , password );
//         const resp= await fetchSinToken( 'auth' ,{ email, password }, 'POST' );
//         const body = await resp.json();
//         //console.log('startLogin-body:',body );
//         if ( body.ok ){ //a todo el backend le pusimos es ok:
//             // guardamos el token y la hora en que se consiguió (dura 2 h). No es información sensible
//             localStorage.setItem('token', body.token );
//             localStorage.setItem('token-init-date',new Date().getTime() );
//             //console.log('dispatch login-ini');
//             dispatch( login( {
//                 uid:  body.uid,
//                 name: body.name
//             }));
//             //console.log('dispatch login-end');
//         } else{
//             Swal.fire('Error', body.msg , 'error');
//         }
//         //console.log('StartLogin-end');
//     }

// }
// export const login = ( user ) => ({ //esta funcion es síncrona 
//     type: types.authLogin,
//     payload: user
// })
/*
email ,nombres ,apellidos ,userName ,password ,idOrganizacion ,idPerfil ,externoInterno 
*/
// export const startRegister =   ( email ,nombres ,apellidos  ,password ,idOrganizacion ,idPerfil ) =>{
//     //console.log('startRegister:',{ idOrganizacion ,idPerfil ,nombres ,apellidos, email , password }  ) ;   
//     return async  ( dispatch ) => {
//         /*"idOrganizacion":1,
//         "idPerfil": 1,
//         "nombres":"Erich",
//         "apellidos": "Ramos",
//         "email": "eramosarellano@gmail.com",
//         "password": "123456" */
//         const  resp= await fetchSinToken( 'auth/new' ,{ idOrganizacion ,idPerfil, nombres ,apellidos , email ,password }, 'POST' );
//         const body = await resp.json();
//         // console.log(body ); 
//         if ( body.ok ){ // guardamos el token y la hora en que se consiguió (dura 2 h)
//             localStorage.setItem('token', body.token );
//             localStorage.setItem('token-init-date',new Date().getTime() );
//             dispatch( login( {
//                 uid:  body.uid,
//                 name: body.name
//             }));
//         } else{
//             Swal.fire('Error', body.msg , 'error');
//         }

//     }
//  }
 

// export const startLoginEmailPassword = (email, password) =>{
//     return async ( dispatch ) =>{ //returna un call back
//         dispatch( startLoading () ) ;
//         firebase.auth().signInWithEmailAndPassword ( email, password )
//         .then(  ({ user }) => {
//              dispatch( login( user.uid, user.displayName ) );
//              dispatch( finishLoading ());
//        })
//        .catch( e => { 
//            console.log(e)
//             dispatch( finishLoading ()); // por si acaso
//             Swal.fire('Error',e.message,'error' );
//     })   

//     }
// }
// //la acción para registrar: tarea asíncrona
// export const startRegisterWithEmailPasswordName = (email, password, name) => {
//     return ( dispatch ) => {
//         dispatch( startLoading () ) ; //para poner loading en true y deshabilitar el botón (evitar doble clic)
//         //la sgte instrucción crea al user en firebas con un única userId  
//         firebase.auth().createUserWithEmailAndPassword ( email, password )
//         .then( async ({ user }) => {
//             //lo que sigue obtiene el displayName y es una promesa, para ello el async y await
//             //la promesa no devuelve el displayName, se rquiere porque la funcion de actualización que sigue
//             await user.updateProfile( { displayName: name } );// puede ir la fotografía
//             dispatch( finishLoading ()); 
//             //console.log( user );
//             // dispatch( login( user.uid, user.displayName ));
//            })
//             .catch( e => { 
//                 //console.log(e);
//                 Swal.fire('Error',e.message,'error' );
//                 dispatch( finishLoading ());
//             })
       
//     }
// }

//para validar en Google
// export const startGoogleLogin  = () => {
//     return ( dispatch ) =>{
//     firebase.auth().signInWithPopup( googleAuthProvider )
//     //    .then( userCred =>{
//     //     console.log ( userCred ); //desestructurando
//          .then ( ({ user }) => {
//              dispatch(
//                login( user.uid, user.displayName )
//              )
//        });
//      }
// }
//las acciones son como los helpers, simples funciones
//esta acción la recibirá el authReducers para establecer el uid y payload que vienen
// export const login =( uid,  displayName) =>({
//     type: types.login,
//     payload: {
//         uid,
//         displayName
//     }
// });
// export const startLogout =() => {
//     return async ( dispatch ) => {
//       await     firebase.auth().signOut();//retorna una promesa
        
//       dispatch( logout() );
//       //dispatch (noteLogout ());    
//     }
// };
// export const startChecking = () => { //para verificar el token
//     return async ( dispatch ) =>{
//        const resp= await fetchConToken('auth/renew'); //no requiere + arg porque es get y el token lo toma del localStorage
//        const body = await resp.json();

//        if ( body.ok ){ // guardamos el token y la hora en que se consiguió (dura 2 h)
//            localStorage.setItem('token', body.token );
//            localStorage.setItem('token-init-date',new Date().getTime() );
//            dispatch( login( {
//                uid:  body.uid,
//                name: body.name
//            }));
//        } else{
//            //Swal.fire('Error', body.msg , 'error');
//            dispatch( checkingFinish() );
//        }
//     }

// }
//esto es porque en startCheching al hacer el login pone el checking: false
//const checkingFinish = ( ) => ({ type: types.authCheckingFinish});

//el localstorage no se puede invocar en las acciones, no está permitido
//esto para hacer el logout
export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear(); 
        // falta sacar al usuario del state
        // poner en el auth el uid, name en blanco y el cheching: false
        dispatch( logout() );
                 
    }
}
const logout = () => ({ type: types.authLogout });