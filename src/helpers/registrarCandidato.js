import { fetchConToken } from '../helpers/fetch';
import Swal from 'sweetalert2';

export const  registrarCandidato = ( idEleccion, idTerritorio, emailResponsable, lema, candidato, clave, celular, cargo  ) =>{
 
    console.log('helpers-registrarCandidato:',idEleccion, idTerritorio, emailResponsable, lema, candidato, clave, celular, cargo ) 
    return async( dispatch ) =>{
   
        const resp= await fetchConToken('candidato/registrarcandidato', { idEleccion, idTerritorio
            , emailResponsable, lema, candidato, clave, celular, cargo }, 'POST');
        const body = await resp.json();

        if ( body.ok ){ 
            // const { menu }=body;
            // console.log(menu) 
            dispatch ( menus( body.menu ) );
        } else{
            Swal.fire('Error', resp.msg , 'error');
        //    dispatch( menuStartLoad() );
        }



    }
}