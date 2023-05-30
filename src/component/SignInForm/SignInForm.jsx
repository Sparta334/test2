import { createClient } from "@supabase/supabase-js";
import { Button , Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import style from "./SignIn.module.css"
import { useState } from "react";
import {LoadingOutlined} from "@ant-design/icons"



const supabase = createClient('https://yjfcopvmnoefmqlerdxc.supabase.co' ,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZmNvcHZtbm9lZm1xbGVyZHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMTk3MDUsImV4cCI6MTk5NjU5NTcwNX0.UAlO3qY6sU4fqOqUEpzuOEyStPMf1eQNR1JepD34QS8' );


export default function SignForm(){

    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [Loading , SetLoad] = useState(<div>登入</div>);


    const  handleFinish =  async ( )  => {

        const { Email , Password } = form.getFieldsValue();
        SetLoad(<LoadingOutlined />);
       
        const { data, error } = await supabase.auth.signInWithPassword({
            email: Email,
            password: Password,
        })
        

        if(error){

            alert("Please SignUp or Retype");
            form.resetFields();
            SetLoad(<div>登入</div>)

        }
        else if(data){
            
            navigate("/");
            
        }

    }
           
        




    return (
        
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
                className="labelText"
                label="Email"
                name="Email"
                rules={[
                {
                    type: 'email',
                    required: true,
                    message: '請輸入mail',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                className="labelText"
                label="Password"
                name="Password"
                rules={[
                {
                    type: 'password',
                    required: true,
                    message: '請輸入密碼',
                },
                ]}
            >
            <Input.Password className="OOPP" />
            </Form.Item>
           
            <Form.Item wrapperCol={{span:24}} >
                <div className={style.Formelement}>
                <div className={style.SignBtnBox}>
                    <Button  className={style.SignBtn} type="primary" htmlType="submit">
                     { Loading }
                    </Button>
                   
                    <div className={style.SignUp} >
                    <Link    to={"/SignUp"}  >SignUp</Link>
                    </div>
                 </div>
                 </div>
            </Form.Item>
            </Form>
        </div> 
            
        
    );


}


/*
hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}

        */