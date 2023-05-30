import { createClient } from "@supabase/supabase-js";
import { Button , Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { theme } from 'antd';
import { CloseOutlined} from '@ant-design/icons'
import {  Row , Col } from 'antd';
import style from "./SignUp.module.css"
import axios from "axios";
import { useState } from "react";
import {LoadingOutlined} from "@ant-design/icons"

const supabase = createClient('https://yjfcopvmnoefmqlerdxc.supabase.co' ,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZmNvcHZtbm9lZm1xbGVyZHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMTk3MDUsImV4cCI6MTk5NjU5NTcwNX0.UAlO3qY6sU4fqOqUEpzuOEyStPMf1eQNR1JepD34QS8' );

const api = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    baseURL: 'https://rose-wide-eyed-termite.cyclic.app',
  });

  
export default function SignUp(){

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [Loading , SetLoad] = useState(<div>送出</div>);


    const  handleFinish =  async ( )  => {

        const { Name ,Email , Password } = form.getFieldsValue();

        SetLoad(<LoadingOutlined/>);
        
        await api.post('/BackEnd/AddUser', {
            data: {
              UserData: Email,
            }
        }, (error , response) =>{

           console.log(error)
        
        } );
       

        await supabase.auth.signUp({
            email: Email,
            password: Password,
            options: {
                data: {
                  username:Name
                }
              }
        }).then((response) => {

            SetLoad(<div>送出</div>)
            response.error ? alert("Please Retype") : navigate("/")
        });




        }
  
        


      



        return (
            <div className={style.row}>
              
              <div className={style.form_widget}>
              <div className={style.CrossFlex}>
    
                <h1 style={{paddingLeft:"30%" ,paddingBottom:"3%"}} className="header">Register</h1>
                <div class={style.Cross2}> 
                  <a href="/"><CloseOutlined/></a>
                </div> 
               
             </div>
                    <div>
                        <Form
                        form={form}
                        name="basic"
                        labelCol={{span: 8}}
                        labelAlign="left"
                        wrapperCol={{span: 16}}
                        onFinish={handleFinish}
                        initialValues={{ remember: true }}
                        >
                        <Form.Item
                            label="UserName"
                            name="Name"
                            rules={[
                            {
                                type: 'string',
                                required: true,
                                max:16,
                                min:4,
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="Email"
                            rules={[
                            {
                                type: 'email',
                                required: true,
                                message: '請使用真的email',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="Password"
                            rules={[
                            {
                                type: 'string',
                                required: true,
                                max:16,
                                min:4,
                                message: '密碼介於4-16個字元',
                            },
                            ]}
                        >
                        <Input.Password className="OOPP" />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm"
                            dependencies={['Password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('Password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                            ]}
                        >
                    <Input.Password  className="OOPP" />
                </Form.Item>
                        <Form.Item wrapperCol={{span: 6}}>
                            <Button className={style.SignBtn} type="primary" htmlType="submit">
                               {Loading}
                            </Button>
                        </Form.Item>
                        </Form>
                    </div> 
                    </div>

        </div>
            
        
    );


}

