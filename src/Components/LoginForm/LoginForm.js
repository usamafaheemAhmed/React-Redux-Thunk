import React, { useState } from 'react'
import * as Yup from "yup";
import background from "../../img/4.png";
import background1 from "../../img/3.png";
import { ErrorMessage, Field, Form, Formik } from 'formik';
const LoginForm = () => {

  let [pageState, setPageState] = useState(false);
  let [signIn, setSignIn] = useState("translate(0px)");
  let [signIn2, setSignIn2] = useState("translate(0px)");
  let [SwitchButton, setSwitchButton] = useState("<b>&#60;</b>");

  let onSubmitForm = () => {
    alert("jon");  
  }
  let initial = {
    Email: "",
    Password:""
  }
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

  let Valid = Yup.object({
    Email: Yup.string().required("Required"),
    Password: Yup.string().matches(passwordRules, { message: "Please include Capital and small letters with numbers" }).required("Required"),
  }); 
 

  let Change = () => {
    
    if (pageState) {
      setSignIn("translate(0px)");
      setSignIn2("translate(0px)");
      setPageState(false);
      // alert("true");
    }
    else {
      setSignIn("translate(420px)");
      setSignIn2("translate(-445px)");
      setPageState(true);
      // alert("false");
    }
  }

  return (
      <div className='container-fluid  p-0 m-0'>
          <div className="row m-0 p-0">
          <div></div>
          </div>
          <div className='row p-0 m-0'>
          <div className='col-md-2 p-0 m-0'></div>
              <div className='col-md-8  p-0 m-0'>
                  <div className='box p-3 border shadow'>
            <div className='imgBox' style={{transform: signIn}}>
            <img src={pageState ? background1 : background} alt="Background_Img" />
            </div>
                    <div className='FormBox' style={{transform: signIn2}}>
                    <p>{pageState ? "Sign In" : "Login"}</p>
              <Formik
                initialValues={initial}
                validationSchema={Valid}
                onSubmit={onSubmitForm}
              >
                {({ values, setFieldValue, setValues, handleChange, formik }) => (
                  <Form className='px-5'>
                  
                    {pageState ? 
                    <div className='row'>
                    <div className="form-group w-50">
                    <label htmlFor="Name" className='float-start'> Name</label>
                    <Field name="Name" id="Name" type="text" className="form-control shadow-sm" />
                    <ErrorMessage component='div'  className='text-danger fw-bold' name='Name' />
                    </div> 
                    <div className="form-group w-50">
                    <label htmlFor="Name" className='float-start'> Last</label>
                    <Field name="Name" id="Name" type="text" className="form-control shadow-sm" />
                    <ErrorMessage component='div'  className='text-danger fw-bold' name='Name' />
                    </div> 
                    </div>
                      : ""}
                    
                    
                    
                    <div className="form-group">
                    <label htmlFor="Email" className='float-start'> Email</label>
                    <Field name="Email" id="Email" type="text" className="form-control shadow-sm" />
                    <ErrorMessage component='div'  className='text-danger fw-bold' name='Email' />
                    </div>

                    <div className="form-group">
                    <label htmlFor="Password" className='float-start'> Password</label>
                    <Field name="Password" id="Password" type="password" className="form-control shadow-sm" />
                      <ErrorMessage component='div' className='text-danger fw-bold' name='Password' />
                    </div>
                    <div className="form-group">
                      <p className='float-start'>{pageState ? "You already have an account" : "You do't have an account"} <span onClick={Change}>{pageState ? "Login" : "Sign In"}</span></p>
                    </div>
                    <div className="mt-5">
                    <button typeof='btn' className='btn btn-success w-100'> Submit </button>
                    </div>
                    <div className="mt-5 float-end">
                    <button type='button' className='btn btn-success register' onClick={Change}>{pageState? <b> &#62;</b> : <b>&#60;</b> }</button>
                    </div>
                  </Form>
                ) }
                
              </Formik>
                    </div>
                  </div>
              </div>
          <div className='col-md-2 p-0 m-0'></div>
          </div>
    </div>
  )
}

export default LoginForm
