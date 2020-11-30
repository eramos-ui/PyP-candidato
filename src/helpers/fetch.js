/* el uso de este helpers es para decidir cuando poner o no los token */
//const baseUrl= process.env.REACT_APP_API_URL;
const baseUrl='http://localhost:5000/api';
export const fetchSinToken =  ( endpoint, data, method ='GET') => {
    //console.log('fetch sin token', baseUrl);
    const url =`${ baseUrl }/${ endpoint }`; //locallhost:5000/api/....
    //console.log('url ST:', url, data );
    if (method ==='GET' ) {
        const salida = fetch ( url )
        .then(( resp  ) => resp.json()) ;
        //console.log('salida GET-ST:', salida );
        return  salida;
        // fetch ( url )
        //         .then(( resp  ) => resp.json()) ;
    } else {
        //console.log('POST url ST:', url, data );
        const salida= fetch( url, { 
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        }); 
        //console.log('salida POST-ST:',salida);
        return salida;
        //  fetch( url, {
        //      method,
        //      headers: {
        //          'Content-type': 'application/json'
        //      },
        //      body: JSON.stringify( data )
        //  });
    }
}
export const fetchConToken = async ( endpoint, data, method ='GET') => {
    console.log('fetch con token', baseUrl);
    const url = `${ baseUrl }/${ endpoint }`; //localhost:4000/api/auth....

    const token = localStorage.getItem('token') || '_'; //puede retornar un null
    //console.log('url CT:',url,  data, method );


    if (method ==='GET' ) {
         //con token hay que mandar los headers
         const salida = await  fetch ( url ,{
            method,
            headers : {
                'Content-type': 'application/json',
                'x-token': token
            }
        } );
        //.then ((resp) => resp.json());
        //console.log('salida GET-CT:',salida);
        return salida;
        // fetch ( url ,{
        //     method,
        //     headers : {
        //         'Content-type': 'application/json',
        //         'x-token': token
        //     }
        // } );

        //.then(( resp) => resp.json())

    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
  }