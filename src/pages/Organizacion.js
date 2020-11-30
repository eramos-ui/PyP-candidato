import React, { useEffect, useState } from 'react';

import { Table, Button, Modal, Input, Form } from 'antd';
import 'antd/dist/antd.css';
import './organizacion.css'

import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleFilled
} from '@ant-design/icons';

import { fetchConToken} from '../helpers/fetch';

const { Item } = Form;
const layout={
  labelCol:{
    span:7,
  },
  wrapperCol:{
    span:16,
  }
};
export const Organizacion = ( ) => {
  const [ data, setData] =useState( [] );
  const [ modalInsertar, setModalInsertar]= useState(false);
  const [ modalEditar, setModalEditar]= useState(false);
  const [ modalEliminar, setModalEliminar]= useState(false);
  const [ organizacion, setOrganizacion]= useState({
    id:'',
    organizacion:'',
    rut:'',
 
   });
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar( !modalInsertar );
  };
  const abrirCerrarModalEditar=()=>{
    //console.log('Abrir editar:',organizacion );
    setModalEditar( !modalEditar );
  };
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar( !modalEliminar );
  };
  const handleChange = e =>{
    const {name, value}=e.target;
    setOrganizacion({...organizacion,
    [name]: value });
  };
  const seleccionarOrganizacion = ( organizacion, caso ) =>{
    //console.log('seleccionarOrganizacion:',organizacion,caso);
      setOrganizacion( organizacion ) ;
      (caso ==="Editar") ?abrirCerrarModalEditar():abrirCerrarModalEliminar();
  };
  const columns=[
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      fixed: 'right',
      key: 'id',
    },
    {
      title: 'Organización',
      dataIndex: 'organizacion',
      width:400,
      key: 'organizacion',
    },
    {
      title: 'Rut',
      dataIndex: 'rut',
      width:140,
      key: 'rut',
    },
     {
      title: 'Acciones',
      key: 'acciones',
      width:100,
      render: fila =>(
        <>
            <Button icon={<EditOutlined />} onClick={() => seleccionarOrganizacion(fila,"Editar")}  ></Button> 
            <Button style= {{marginLeft: 5} }  icon={<DeleteOutlined />} onClick={() => seleccionarOrganizacion(fila,"Eliminar")} ></Button> 
        </>
      ),
    },
  ];
  const peticionGet = async()=> {
    const resp= await fetchConToken('auth/org', {}, 'GET');
    const body = await resp.json()
    .then (body=> {
      //console.log('resp:',body);
      setData( body.organizaciones   )
      
    }).catch(error =>{
      console.log(error);
    }) 
  }; 
   const peticionPost = async()=> {
         delete organizacion.id;
         const resp= await fetchConToken('auth/neworg',  organizacion , 'POST');
         const body = await resp.json()
         .then (body => {
           setData( data.concat(body.organiza )); 
           abrirCerrarModalInsertar();
       }).catch(error =>{
         console.log(error);
       }) 
    }; 
    const peticionPut = async()=> {
      const resp= await fetchConToken('auth/actorg',  organizacion , 'POST') 
      .then (resp => {
        const dataAux=data;//actualizar data en memoria - tabla
        dataAux.map(org =>{
            if(org.id === organizacion.id) {
              org.organizacion =organizacion.organizacion;
              org.rut=organizacion.rut;
            }
        });
        abrirCerrarModalEditar();
      }).catch(error =>{
        console.log(error);
      }) 
    };
    const peticionDelete = async()=> {
      const resp= await fetchConToken('auth/eliorg',  organizacion , 'POST') 
      .then (resp => {
        setData( data.filter( org => org.id !==organizacion.id ))
        abrirCerrarModalEliminar();
      }).catch(error =>{
        console.log(error);
      }) 
    };
    //const showTotal=() =>( data.length)
      
      //return `Total ${data.length} items`;
    
    useEffect(() =>{
       peticionGet();
    },[]);
  return(
  <div className="App">
       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
         <div></div>
          <Button type="primary" icon={<PlusCircleFilled />}  onClick={ abrirCerrarModalInsertar } 
          size="middle" shape="round"
          > Agregar organización  </Button>
        </div>
        <Table columns={columns} dataSource={data} bordered pagination={{ pageSize: 8  } } 
          
          //  className="mi-tabla"
          />
        <Modal
        maskClosable={false}
        visible={ modalInsertar }
        
        title="Ingresar Organización"
        destroyOnClose={true}
        onCancel={ abrirCerrarModalInsertar }
        //style= {{marginRight: 5} } 
        //onOk={() => {
          // Form.useForm()
          //   .validateFields()
          //   .then(values => {
          //     form.resetFields();
          //     onCreate(values);
          //   })
          //   .catch(info => {
          //     console.log('Validate Failed:', info);
          //   });
        //}}
        centered
        footer={[
          <Button onClick={ abrirCerrarModalInsertar }>Cancelar</Button>,
          <Button type="primary" onClick={ peticionPost } >Grabar</Button>
        ]}
        >
          <Form {...layout}>
            <Item label="Organización" ><Input name="organizacion" onChange={handleChange}/></Item>
            <Item label="Rut" ><Input name="rut" onChange={handleChange}/></Item>
          </Form>

        </Modal>
        <Modal
        visible={modalEditar}
        maskClosable={false}
        title="Modificar organización"
        onCancel={abrirCerrarModalEditar}
        centered
        footer={[
          <Button onClick={ abrirCerrarModalEditar }>Cancelar</Button>,
          <Button type="primary" onClick={ peticionPut } >Grabar</Button>
        ]}
        >
          <Form {...layout}>
            <Item label="Organización" ><Input name="organizacion" onChange={handleChange} value={organizacion && organizacion.organizacion } /></Item>
            <Item label="Rut" ><Input name="rut" onChange={handleChange} value={organizacion && organizacion.rut }/></Item>
          </Form>

        </Modal>
        <Modal
        visible={modalEliminar}
        maskClosable={false}
        title="Elimina Organización"
        onCancel={abrirCerrarModalEliminar}
        centered
        footer={[
          <Button onClick={ abrirCerrarModalEliminar }>No</Button>,
          <Button type="primary"  danger onClick={ peticionDelete } >Si</Button>
        ]}
        >
          <Form {...layout}>
            Confirme que desea eliminar la organización <b>{organizacion && organizacion.organizacion }</b>
          </Form>
        </Modal>
    </div>
   )
}