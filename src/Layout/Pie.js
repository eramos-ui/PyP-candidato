import React from 'react';

import { Layout  } from 'antd';
const {  Footer } = Layout;

export const Pie = () => {
    return (
        
            <Footer  style={{ 
                borderTop: '1px solid #e8e8e8',
                position: 'fixed',
                left: 210,
                bottom: 0,
                height: 50,
                width: '100%',
                backgroundColor: 'white',
                textAlign: 'center',
                display: 'flex',}}
                >
                    <span display="flex" textAlign= 'right' >Creado por Cibeles SPA ©2020 </span>
                
            </Footer>
        
    )
}