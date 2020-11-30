import React from 'react';
import { useDispatch, useSelector } from "react-redux"; //hooks de redux

//import { Link } from 'react-router-dom';
//import { login } from '../../actions/auth';
import { useForm } from '../../../../Desktop/PyP/candidato/src/hooks/useForms';
//import { startLoginEmailPassword, startGoogleLogin, startLogin } from '../../actions/auth';
import { startGoogleLogin, startLogin } from '../../../../Desktop/PyP/candidato/src/actions/auth';

import './login.css';
//está pendiente las validaciones que si están en el Register
export const LoginScreen = () => {
  console.log('Login Screen');
  //este hook lo provee redux para usar en el dispatch
  const dispatch = useDispatch(); //hook
  const { loading } = useSelector( state => state.ui );


  //para manejar email y paswword:
   const [ formValues, handleInputChange] = useForm({
     email: 'eramosarellano@gmail.com',//valores por defecto
     password: '123456'
   })
   const { email, password } =formValues;
   //para manejar el submit del formulario- al tocar el formulario:
   const handleLogin = (e) => {

      e.preventDefault();
      //console.log(email, password); 
      //aquí va el dipatch que usará una acción
      //dispatch( login(3452,'perico') );//prueba
      //dispatch( startLoginEmailPassword ( email, password) ) ;
      dispatch( startLogin ( email, password) ) ;
   }
   //para validar Google
   const handleGoogleLogin = () =>{
     dispatch ( startGoogleLogin() );

   }
    return (
         <div className="container login-container">
            <div className="row">
              <div className="col-md-6 login-form-1">
                <h3>Ingreso </h3> 
                <form onSubmit = { handleLogin } >
                  <div className="form-group">
                    <input 
                          type ="text"
                          placeholder="Email"
                          name="email"
                          className="auth__input"
                          autoComplete="off"
                          value= { email}
                          onChange={ handleInputChange }
                    />

                    <input 
                          type ="password"
                          placeholder="Password"
                          name="password"
                          className="auth__input"
                          value= { password }
                          onChange={ handleInputChange }

                    />

                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled= { loading }
                    >
                      Ingresar
                    </button>

                    <div className="auth__social-networks">
                        <p>Ingresar con clave de red social </p>
                        <div 
                          className="google-btn"
                          onClick = { handleGoogleLogin }
                      >
                          <div className="google-icon-wrapper">
                              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                          </div>
                          <p className="btn-text">
                              <b> con clave Google</b>
                          </p>
                      </div>
                    </div>
                    {/* <Link
                        to="/auth/register"
                        className="link"
                      >
                          Crear nueva cuenta
                    </Link> */}
                  </div>
              </form>
              </div>
            </div>
         </div>

         
    )
}
