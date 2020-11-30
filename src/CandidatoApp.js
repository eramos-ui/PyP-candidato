import React, { useState, useEffect} from 'react';
// import { Provider } from 'react-redux'; 
// import { store } from './store/store';
import {  Layout, Form , Input, Select, Upload, Checkbox , ConfigProvider , Button, Cascader   } from  'antd';
import esES from 'antd/lib/locale/es_ES';
import { Encabezado } from './Layout/Encabezado';
import { Pie } from './Layout/Pie';
//import { listaElecciones } from './hooks/leeElecciones';
import { fetchSinToken } from './helpers/fetch';
import { textoConsiste, textoModoContrato } from './data/textoFijos';
import 'antd/dist/antd.css';
import  './Layout/full.css';
import ImgCrop from 'antd-img-crop';
import { territoriocandidato } from './data/territorios';
import { armaTerritorios} from './helpers/armaTerritorios';

const { Content } = Layout;
const { Item } =Form;
const { TextArea } = Input;
const { Option } = Select;
//import { AppRouter } from './routers/AppRouter';
const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 16 },
 };
const tailFormItemLayout = {
   wrapperCol: {
     xs: {
       span: 24,
       offset: 0,
     },
     sm: {
       span: 16,
       offset: 8,
     },
   },
 };

export const CandidatoApp = () => {
   const [form] = Form.useForm();
   const [ eleccion, setEleccion]= useState([{value:0, text:''}]); // toda las elecciones
   useEffect(() => {
        fetchSinToken('candidato/elecciones')
         .then ( elecc =>{
            const arr= elecc.eleccion;
            setEleccion({
                    data: arr,
                })
         });
    }, []);
    const options=[];
    if (!!eleccion.data){
      eleccion.data.forEach((element ) =>{
      options.push(<Option key={element.idEleccion}>{element.Descripcion}</Option>)  
      })
    } 
    const [ territorios, setTerritorios]= useState([]);//todos los territorios de todas la elecciones
    useEffect(() => {
      fetchSinToken('candidato/territoriocandidatura')
       .then ( terr =>{
          const arr= terr.territorio;
          setTerritorios({
                  data: arr,
              })
       });
    }, []);
   const [ territories, setTerritories]= useState([]); //territorios filtrados por idSeleccion
   
   const handleChangeEleccion =value =>{
      //setSelectedEleccion(parseInt(value));
       const territories=armaTerritorios(territorios.data,parseInt(value) );
       setTerritories(
         territories
       );
    }
   const [fileList, setFileList] = useState([ ]);
   const onChange = ({ fileList: newFileList }) => {
        //console.log('fileList:',fileList) ;
        setFileList(newFileList);
      };
    
   const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };
   const prefixSelector = (
         <Form.Item name="prefix" noStyle>
           <Select style={{ width: 70 }} defaultValue="56" value="56">
             <Option value="56">+56</Option>
           </Select>
         </Form.Item>
       );
   const [ selectedidTerritorio, setSelectedidTerritorio]= useState(0); //idTerritorio selected
   const [ selectedCargo, setSelectedCargo]= useState(''); //cargo selected
   const onChangeCascade=( value, selectedOptions) =>{
      //console.log('cambio en cascada',value, selectedOptions);
      setSelectedidTerritorio(selectedOptions[1].idTerritorio );
      setSelectedCargo(selectedOptions[2].value);
   }
   const onFinish=( values) =>{
         //console.log('onFinish', values);
         const data = {
            idEleccion: values.idEleccion,
            idTerritorio: selectedidTerritorio,
            cargo: selectedCargo,
            emailResponsable: values.email,
            contraseña: values.password,
            candidato: values.candidato,
            celular: values.celular,
            image: values.imagen,
            lema: values.lema,
         }
         //console.log(data);
         fetchSinToken('candidato/registrarcandidato',data,'POST');
      };
return (
  <ConfigProvider locale={esES}>
      <Encabezado />
      <Layout className="layout" style={{padding: '0 10px 10px'}}>
         <div style={{minWidth: '100%' }}>
            <div className="logo" />
               <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                  <div className="site-layout-background" style={{ padding: 5, minHeight: 380 }}>
                     <Form {...layout}
                        layout="vertical"
                        name="form"
                        form={ form }
                        onFinish={ onFinish }
                        >
                        <Item label="¿En qué consite?">
                           <TextArea autoSize={{ minRows: 3, maxRows: 4 }} 
                           value={textoConsiste}
                           />
                        </Item>   
                        <Item label="¿Cómo se contrata?">
                           <TextArea autoSize={{ minRows: 2, maxRows: 4 }} 
                           value={textoModoContrato}
                           />
                        </Item>
                        <div className="row">
                           <div className="col-md-4">
                        
                              <Item label="A qué postula"
                                 name="idEleccion" 
                                    rules={[
                                       {
                                       required: true,
                                       message: '¡Debe seleccionar la elección a que postula!',
                                       },
                                    ]}
                                 >
                                 <Select onChange={handleChangeEleccion}
                                          style={{ width: 280 }}
                                          placeholder="Seleccionar elección."
                                 >
                                    {options } 
                                 </Select>
                              </Item>
                           </div> 
                           <div className="col-md-4">
                                 <Item label="Dónde postula" 
                                    name="idTerritorio" 
                                    
                                       rules={[
                                          {
                                          required: true,
                                          message: '¡Debe indicar el territorio al que portula!',
                                          },
                                       ]}
                                 >
                                    <Cascader options={!!territories ? territories : territoriocandidato } 
                                    onChange={onChangeCascade} placeholder="Seleccionar el territorio en que postula."  
                                    style={{ width: 350 }}
                                    />
                                 </Item>
                           </div>                    
                           <div className="col-md-4">
                                 <Item label="Candidato(a)" 
                                 name="candidato"
                                 rules={[
                                    {
                                    required: true,
                                    message: '¡Debe ingresar el nombre del candidato(a)!',
                                    },
                                 ]}
                                 >
                                    <Input  style={{ width: 350 }}  
                                       placeholder="Ingresar nombre del candidato(a)."
                                    >
                                    </Input>
                                 </Item>
                           </div> 
                        </div> 
                        <div className="row">
                              <div className="col-md-6">
                                    <Item label="Lema de la campaña"
                                          name="lema"
                                       >
                                       <TextArea autoSize={{ minRows: 4, maxRows: 5 }} 
                                       placeholder="Aquí debe ingresar el lema de campaña en un máximo de 400 caracteres."
                                       maxLength="400"
                                       />
                                    </Item>
                              </div>   
                              <div className="col-md-6">
                                 <Item label="imagen de la campaña"
                                          name="imagen"
                                       >
                                          <ImgCrop rotate>
                                             <Upload
                                             action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                             listType="picture-card"
                                             fileList={ fileList }
                                             onChange={onChange}
                                             onPreview={onPreview}
                                             >
                                             {fileList.length < 1 && '+ Subir'}
                                             </Upload>
                                          </ImgCrop>
                                       </Item> 
                              </div>
                           </div>   
                        <div className="row">
                           <div className="col-md-4">
                              <Item label="Correo"
                                          name="email"
                                          rules={[
                                             {
                                             type: 'email',
                                             message: 'Lo ingresado no es un correo válido!',
                                             },
                                             {
                                             required: true,
                                             message: '¡Por favor ingrese su correo!',
                                             },
                                          ]}
                                       >
                                    <Input />
                              </Item>
                           </div>   
                           <div className="col-md-4">
                                 <Form.Item
                                    name="password"
                                    label="Clave acceso"
                                    rules={[
                                       {
                                          required: true,
                                          message: '¡Por favor ingrese su contraseña!',
                                       },
                                    ]}
                                    hasFeedback
                                    >
                                    <Input.Password placeholder="Ingrese al menos 6 caracteres." />
                                    </Form.Item>                        
                           </div>
                           <div className="col-md-4">
                                 <Form.Item
                                    name="confirm"
                                    label="Confirme clave"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                    {
                                       required: true,
                                       message: '¡Por favor confirme su contraseña!',
                                    },
                                    ({ getFieldValue }) => ({
                                       validator(rule, value) {
                                          if (!value || getFieldValue('password') === value) {
                                          return Promise.resolve();
                                          }
                                          return Promise.reject('¡Las contraseñas no coinciden!');
                                       },
                                    }),
                                    ]}
                                    >
                                    <Input.Password placeholder="Reingrese su clave."  />
                                    </Form.Item>  
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-md-4">
                              <Form.Item
                                 name="celular"
                                 label="Celular contacto"
                                 rules={[{ required: true, message: '¡Por favor ingrese su celular!' }]}
                                 >
                                 <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                              </Form.Item>
                           </div>
                           <div className="col-md-7">
                              <Form.Item
                                 name="agreement"
                                 valuePropName="checked"
                                 rules={[
                                    {
                                       validator: (_, value) =>
                                       value ? Promise.resolve() : Promise.reject('Debe aceptar el acuerdo'),
                                    },
                                 ]}
                                 {...tailFormItemLayout}
                                 >
                                 <Checkbox>
                                    He leído el <a href="">acuerdo</a>
                                 </Checkbox>
                              </Form.Item>
                           </div>
                           <div className="col-md-1">
                              <Form.Item {...tailFormItemLayout}>
                                 <Button type="primary" htmlType="submit">
                                    Registrar 
                                 </Button>
                              </Form.Item>
                           </div>
                        </div>
                     </Form>
                  </div>
               </Content>
         </div> 
      </Layout>
      <Pie/>
  </ConfigProvider>
  )   
}; 

 
 