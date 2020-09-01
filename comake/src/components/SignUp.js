import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axiosAuth from '../utils/axiosAuth';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from "react-router-dom"

export default function SignUp() {

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirm: '',
    terms: true
  });

  
  const [serverError, setServerError] = useState("");

  
  const [buttonDisabled, setButtonDisabled] = useState(true);



  const [errors, setErrors] = useState({
    name: "", 
    email: "",
    password: "",
    confirm:'',
    terms: ""
  });

  
  const [post, setPost] = useState([]);

  
  const validateChange = (e) => {
    
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "terms" ? e.target.checked : e.target.value) 
      .then((valid) => {
        
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch((err) => {
        console.log(err);

        
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };
  
  const formSubmit = (e) => {
    e.preventDefault(); 
    console.log("form submitted!");

    
    axiosAuth
      .post("/auth/register", formState)
      .then((res) => {
        console.log("success!", res.data);
       
        setPost(res.data);

        
        setServerError(null); 

        
        setFormState({
          name: "",
          email: "",
          password: "",
          confirm: '',
         
          terms: true
        });
      })
      .catch((err) => {
    
        setServerError("oops! something happened!");
      });
  };


  const inputChange = (e) => {
    
    e.persist(); 
    console.log("input changed!", e.target.value);
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e); 
    setFormState(newFormData); 
  };

 
  const formSchema = yup.object().shape({
    name: yup
    .string()
    .required("Name is a required field"), 
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Must include an email"),
    password: yup
    .string()
    .required("Must include password"),
    confirm: yup
    .string()
    .required("Must confrim password"),
    
    terms: yup.boolean().oneOf([true], "Please agree to T&Cs")
  });

  
  useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {
      
      setButtonDisabled(!isValid); 
    });
  }, [formState]);

  return (
    <Form onSubmit={formSubmit}>
      {serverError ? <p className="error">{serverError}</p> : null}
      <FormGroup style= {{margin:'0 auto',fontSize:'3rem', fontFamily:'Monoton', color:'white',  marginLeft:'50px'}}>
                <legend style= {{margin:'0 auto', marginBottom: '30px', postion: 'flex'}}>Login</legend>
            </FormGroup>
      <Label htmlFor="name">
        Name
        <Input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </Label>
      <Label htmlFor="email">
        Email
        <Input
          id="email"
          type="text"
          name="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </Label>
      <Label htmlFor="password">
        Password
        <Input
          id="password"
          type = 'password'
          name="password"
          value={formState.password}
          onChange={inputChange}
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </Label>

      <Label htmlFor="confirm">
        Confirm Password
        <Input
          id="confirm"
          type = 'password'
          name="confirm"
          value={formState.confirm}
          onChange={inputChange}
        />
        {errors.confirm.length > 0 ? (
          <p className="error">{errors.confirm}</p>
        ) : null}
      </Label>
      
      <Label htmlFor="terms" className="terms">
        <Input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Terms & Cs
        {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
      </Label>
      <Link to = '/login'>
      <Button disabled={buttonDisabled} type="submit"   to = '/login'>
        Submit
      </Button>
      </Link>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </Form>
  );
}