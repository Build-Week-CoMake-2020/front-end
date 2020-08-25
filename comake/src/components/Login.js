
import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import * as yup from 'yup';
import AxiosAuth from '../../utils/AxiosAuth';


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
        AxiosAuth()
     
           .post('http://amp-node-api.herokuapp.com/api/auth/login', loginData)
            .then((res) => {
                
                localStorage.setItem("token", res.data.token);
                push("/ListPage");

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
            style = {{width: '40%', margin:'0 auto', border:'2px solid black', marginTop: '10px', backgroundColor:'#303030', color:'white', padding: '25px'}}>
            <FormGroup style= {{margin:'0 auto', fontFamily:'Monoton', color:'#e74c3d',  marginLeft:'50px'}}>
                <legend style= {{margin:'0 auto', marginBottom: '30px', postion: 'flex'}}>Login</legend>
            </FormGroup>
                 {/* <h2>Log in to add new items</h2> */}
                 <FormGroup>
                <Input placeholder="Username: testmin" type='username' name='username' onChange={handleChange} style={{ width: '75%', margin: '0 auto'}}></Input>
                </FormGroup>

                <FormGroup>
                <Input placeholder="Password: testmin1234" type='password' name='password' onChange={handleChange} style={{ width: '75%', margin: '0 auto' }}></Input>
                </FormGroup>
                
                <Button style = {{marginLeft:'200px'}}>login</Button>
                {/* <Link to ='/ListPage'>
                
                </Link> */}
            </Form>


        </>
    )
}
export default Login;