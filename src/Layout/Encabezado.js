import React ,{ useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Layout, Button } from "antd";
//import { startLogout } from '../actions/auth';


export const Encabezado = () => {
    // useEffect(() => {
    //     window.onbeforeunload = confirmExit;
    //     function confirmExit()
    //     {
    //       return "show warning";
    //     }
    // }, [])
    const dispatch = useDispatch();
    const handleLogout = () =>{
         console.log('handleLogout');  
         //window.onclose(); how can do unload page in react js

        //dispatch (startLogout() );
      };
    return (
        <Layout.Header>
        <div style={{float: 'right', color: 'white'}} >
        <p> 
            <span> Erich Ramos </span> 
        <Button type="primary" size="small"  style={{color: 'white'}}  
        ghost onClick ={ handleLogout }
        >
            <i className="fas fa-sign-out-alt" />
        Salir
        </Button>
        </p>
        </div>
        </Layout.Header>            
    )
}