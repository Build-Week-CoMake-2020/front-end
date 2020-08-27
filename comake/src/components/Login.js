
import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import * as yup from 'yup';
import axiosAuth from '../utils/axiosAuth';


const Login = () => {
    
    const [loginData, setloginData] = useState({
        username: "",
        password: ""
    });
    const schema = yup.object().shape({


        username: yup.string().required().min(2),
        password: yup.string().required().min(1)
    });
    const { push } = useHistory()
    const api_login = (loginData) => {
        axiosAuth()
     
           .post('/auth/login', loginData)
            .then((res) => {
                
                localStorage.setItem("token", `Bearer ${res.data.token}`);
                push("/ProfilePage");

            })
            .catch(err => {
                console.log('error!', err)
            });

    };
    const handleChange = (e) => {

        setloginData({ ...loginData, [e.target.name]: e.target.value })
        console.log(loginData)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        api_login(loginData);
    };
    
    return (

        <>
            <Form onSubmit={handleSubmit}
            style = {{width: '40%', margin:'0 auto', marginTop: '10px', backgroundColor:'white', color:'white', padding: '25px'}}>
            <FormGroup style= {{margin:'0 auto', fontFamily:'Monoton', color:'white',  marginLeft:'50px'}}>
                <legend style= {{margin:'0 auto', marginBottom: '30px', postion: 'flex'}}>Login</legend>
            </FormGroup>
                 {/* <h2>Log in to add new items</h2> */}
                 <FormGroup>
                <Input placeholder="Email: Mark@email.com " type='email' name='email' onChange={handleChange} style={{ width: '120%', margin: '20px auto'}}></Input>
                </FormGroup>

                <FormGroup>
                <Input placeholder="Password: 1234" type='password' name='password' onChange={handleChange} style={{ width: '120%', margin: '20px auto' }}></Input>
                </FormGroup>
                
                <Button style = {{marginLeft:'110px'}}>login</Button>
                {/* <Link to ='/ListPage'>
                
                </Link> */}
            </Form>


        </>
    )
}
export default Login;