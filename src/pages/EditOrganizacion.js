// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { Modal, Drawer, Form, Button, Input } from 'antd';
// import { contactReducer } from '../reducers/contactReducer';

// export const EditOrganizacion = ( {
//          show, 
//          handleOnClose , 
//          handleAddOnFinish , 
//          handleOnFinishFailed, 
//          initialValues, 
//          mode, 
//          handleEditOnFinish ,
//          cerrarModal,
//         } ) => {
//     console.log('AddOrganizacion', {initialValues}, mode);
//     //const initialValues={ firstName: "", lastName: "", phoneNumber:null };
   
//     const [form] = Form.useForm();
//     const [, forceUpdate] = useState(); // To disable submit button at the beginning.

//     useEffect(() => {
//       forceUpdate({});
//     }, []);

//     return (
//         <>
//             <Modal 
//              width={512}
//              title={ `${mode === "edit" ? "Modificar organización": "Agregar organización" }` }
//              visible = { show } 
//              onClose ={ handleOnClose } 
//              maskClosable ={ false } 
//              //destroyOnClose = { true }
//              onCancel= { cerrarModal }
//              onOK= { handleAddOnFinish  } 
             
//              footer={[
//                         <Button onClick={ cerrarModal }>Cancelar </Button>,
//                         <Button type="primary"  
//                         htmlType="submit"
                        
//                         // onClick={ handleOnClose } 
//                        // onClick= { mode === "edit" ? handleEditOnFinish : handleAddOnFinish } 
//                         >Grabar </Button>
//                     ]}
//              >
//                 <Form
//                     form={ form }
//                     name="basic"
//                     initialValues={ initialValues }
//                    // onFinish= { mode === "edit" ? handleEditOnFinish : handleAddOnFinish } 
                    
                    
//                    //onFinish= { mode === "edit" ? handleEditOnFinish : handleOnFinish } 
//                     onFinishFailed={handleOnFinishFailed}
//                     layout="vertical"

//                     >
//                     <Form.Item
//                         label="Fist Name"
//                         name="firstName"
//                         rules={[{ required: true, message: 'Please input your first name!' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         label="Last Name"
//                         name="lastName"
//                         rules={[{ required: true, message: 'Please input your last name!' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         label="Phone Number"
//                         name="phoneNumber"
//                         rules={[{ required: true, message: 'Please input your phone number!' }]}
//                     >
//                         <Input type ="tel"/>
//                     </Form.Item>
//                     {/* <Form.Item shouldUpdate >
//                         {() => (
//                             <>
//                             <Button 
//                                 style={{ marginRight: 20 }}
//                                 type="primary" 
//                                 htmlType="submit"
//                                 disabled={
//                                     !form.isFieldsTouched(true) ||
//                                     form.getFieldsError().filter(({ errors }) => errors.length).length
//                                 }
//                             >
//                              { mode === "edit" ? "Modificar":"Agregar"}
//                             </Button>
//                             <Button  htmlType="button" onClick={() => form.resetFields()} > Limpiar  </Button>
//                             </>
//                         )}
                    
//                     </Form.Item> */}

//                 </Form>
//             </Modal>
//        </>
//     )
// };
// EditOrganizacion.propTypes = {
//     show: PropTypes.bool.isRequired,
//     handleOnClose: PropTypes.func.isRequired,
//     handleAddOnFinish: PropTypes.func.isRequired,
//     handleOnFinishFailed: PropTypes.func.isRequired,
//     initialValues: PropTypes.object.isRequired,
//     mode: PropTypes.oneOf(['add','edit']),
//     handleEditOnFinish: PropTypes.func.isRequired,
// }