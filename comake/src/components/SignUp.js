import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axiosAuth from '../utils/axiosAuth';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from "react-router-dom"

export default function SignUp() {

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    address: "",
    terms: true
  });

  
  const [serverError, setServerError] = useState("");

  
  const [buttonDisabled, setButtonDisabled] = useState(true);



  const [errors, setErrors] = useState({
    name: "", 
    email: "",
    address: "",
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
          address: "",
         
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
    address: yup
    .string()
    .required("Must include why you wanna join"),
    
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
      <FormGroup style= {{margin:'0 auto', fontFamily:'Monoton', color:'white',  marginLeft:'50px'}}>
                <legend style= {{margin:'0 auto', marginBottom: '30px', postion: 'flex'}}>Login</legend>
            </FormGroup>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="text"
          name="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <label htmlFor="address">
        Address
        <textarea
          id="address"
          name="address"
          value={formState.address}
          onChange={inputChange}
        />
        {errors.motivation.length > 0 ? (
          <p className="error">{errors.address}</p>
        ) : null}
      </label>
      
      <label htmlFor="terms" className="terms">
        <input
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
      </label>
      <Link to = '/login'>
      <button disabled={buttonDisabled} type="submit" onClick = {() => history.push('/login')}>
        Submit
      </button>
      </Link>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </Form>
  );
}