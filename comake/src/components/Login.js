
import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import * as yup from 'yup';
import axiosAuth from '../utils/axiosAuth';


const Login = () => {
    
    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    });
    const schema = yup.object().shape({


        email: yup.string().required().min(2),
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

            <Form onSubmit={handleSubmit}>
        
            <FormGroup style= {{margin:'0 auto', fontFamily:'Monoton', color:'white',  marginLeft:'50px'}}>
                <legend style= {{margin:'0 auto', marginBottom: '30px', postion: 'flex'}}>Login</legend>
            </FormGroup>
                 {/* <h2>Log in to add new items</h2> */}
                 <FormGroup>

                <Input placeholder="Email " type='email' name='email' onChange={handleChange} style={{ width: '75%', margin: '20px auto'}}></Input>
                </FormGroup>

                <FormGroup>
                <Input placeholder="Password" type='password' name='password' onChange={handleChange} style={{ width: '75%', margin: '20px auto' }}></Input>
                </FormGroup>
                {/*<Link to ='/profilepage'>*/}
                <Button style = {{marginLeft:'85px'}} type='submit' to='/profilepage' >login</Button>

                {/* <Link to ='/ListPage'>
                
                </Link> */}
                {/*/</Link>*/}
            </Form>


        
    )
}
export default Login;