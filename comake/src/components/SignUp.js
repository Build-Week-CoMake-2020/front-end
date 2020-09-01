import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axiosAuth from '../utils/axiosAuth';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from "react-router-dom"

export default function SignUp() {
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    address: "",
    terms: true
  });

  // server error
  const [serverError, setServerError] = useState("");

  // control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // managing state for errors. empty unless inline validation (validateInput) updates key/value pair to have error

  const [errors, setErrors] = useState({
    name: "", // strings describing error that has occured, set from yup in schema when invalid
    email: "",
    motivation: "",
    terms: ""
  });

  // temporary state used to display response from API. this is not a commonly used convention
  const [post, setPost] = useState([]);

  // inline validation, validating one key/value pair at a time
  const validateChange = (e) => {
    // get the rules out of schema with reach at key "e.target.name" --> "formSchema[e.target.name]"

    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "terms" ? e.target.checked : e.target.value) // compare with real value. does it break the rule?
      .then((valid) => {
        // if valid param is true, then erase any errors in error state at that key/value in errors
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch((err) => {
        console.log(err);

        // if failing validation, set error in state
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };
  // onSubmit function
  const formSubmit = (e) => {
    e.preventDefault(); // <form> onSubmit has default behavior from HTML!
    console.log("form submitted!");

    // send out POST request with obj as second param, for us that is formState.
    // trigger .catch by changing URL to "https://reqres.in/api/register" -> see step 7 in notion notes
    axiosAuth
      .post("/auth/register", formState)
      .then((res) => {
        console.log("success!", res.data);
        // update temp state with value from API to display in <pre>
        setPost(res.data);

        // if successful request, clear any server errors
        setServerError(null); // see step 7 in notion notes

        // clear state, could also use a predetermined initial state variable here
        setFormState({
          name: "",
          email: "",
          motivation: "",
         
          terms: true
        });
      })
      .catch((err) => {
        // this is where we could create a server error in the form! if API request fails, say for authentication (that user doesn't exist in our DB),
        // set serverError
        setServerError("oops! something happened!");
      });
  };

  // onChange function
  const inputChange = (e) => {
    // use persist with async code -> we pass the event into validateChange that has async promise logic with .validate
    e.persist(); // necessary because we're passing the event asyncronously and we need it to exist even after this function completes (which will complete before validateChange finishes)
    console.log("input changed!", e.target.value);
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e); // for each change in input, do inline validation
    setFormState(newFormData); // update state with new data
  };

  // schema used for all validation to determine whether the input is valid or not
  const formSchema = yup.object().shape({
    name: yup
    .string()
    .required("Name is a required field"), // must include name or else error
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Must include an email"), // must have string present, must be of the shape of an email
    motivation: yup
    .string()
    .required("Must include why you wanna join"),
    // value must be one of the values in the array, otherwise throws error
    terms: yup.boolean().oneOf([true], "Please agree to T&Cs")
  });

  // whenever state updates, validate the entire form. if valid, then change button to be enabled.
  useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {
      // isValid is a boolean
      // !true === false
      // !false === true
      // if the form is valid, and we take the opposite --> we do not want disabled btn
      // if the form is invalid (false) and we take the opposite (!) --> we will disable the btn
      setButtonDisabled(!isValid); // true means btn will be disabled
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
      <label htmlFor="motivation">
        Address
        <textarea
          id="motivation"
          name="motivation"
          value={formState.motivation}
          onChange={inputChange}
        />
        {errors.motivation.length > 0 ? (
          <p className="error">{errors.motivation}</p>
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
      <button disabled={buttonDisabled} type="submit">
        Submit
      </button>
      </Link>
      <Link to = '/login'>
      <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
            </p>
            </Link>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </Form>
  );
}