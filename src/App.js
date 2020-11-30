
import React from 'react';
import { Provider } from 'react-redux'; 
import { store } from './store/store';
import { CandidatoApp } from './CandidatoApp';
const App=()=>{

return (
    <Provider store= { store }>
       <CandidatoApp /> 
    </Provider>
  );
};

export default App;