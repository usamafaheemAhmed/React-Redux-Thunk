import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import "./ReduxLearning.css";
import { useDispatch, useSelector } from 'react-redux'
// import { addData } from "../../store/slices/fromSlice/fromSlice";
import { SelectAllFrom, getPostStatus, StateErrors, fetchPosts } from "../../store/slices/fromSlice/fromSlice";
import { addData, deleteData, updateData, PostData } from "../../store/slices/fromSlice/fromSlice";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FlagUser from "./FlagUser/FlagUser";


import flag_Yellow from "./FlagUser/Flag (1).svg";
import flag_Green from "./FlagUser/Flag (2).svg";
import flag_Red from "./FlagUser/Flag (3).svg";

const ReduxLearning = () => {

  let [updateFlag, SetUpdateFlag] = useState(false);

  let PreviousData = useSelector(SelectAllFrom);
  let Dispatch = useDispatch();

  let Post = useSelector(SelectAllFrom);
  let PostStatus = useSelector(getPostStatus);
  let PostError = useSelector(StateErrors);
  let useOne = 1;

  useEffect(() => {
    // alert(Post + "\n" + PostStatus + "\n" + PostError);
    if (PostStatus === 'idle') {
      if (useOne == 1) {
        Dispatch(fetchPosts())
      }
    }
    console.log(PreviousData)
    useOne++
  }, [PostStatus, Dispatch])
  




  let initialValues = {
    Name: "",
    FatherName: "",
    date: "",
    gender: "",
  };

  let Validate = Yup.object({
    Name: Yup.string().required("Required"),
    FatherName: Yup.string().required("Required"),
    date: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
  });    

  let Redux_OnSubmit = (values, { resetForm } ) => {
    let data = {
      id: values.id,
      Name: values.Name,
      FatherName: values.FatherName,
      date: values.date,
      gender: values.gender,
    };

    if (updateFlag) {
      Dispatch(updateData(data)); // this is for the Slice which does not have Payload prepare
      SetUpdateFlag(false);
    }
    else {
      Dispatch(addData(values.Name,values.FatherName,values.date,values.gender,)); // this is for the the Slice which has Payload Prepare
    }    
    resetForm();
  };

  let deleteFunction = (elem,index) => {Dispatch(deleteData(--index));
  }

  return (
    <div className=" container-fluid reduxContainer">
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={Validate}
        onSubmit={Redux_OnSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, setValues, handleChange, formik }) => (
          <Form>
            <div className="row">
              <div className="col-md-12 p-0 text-center my-2">
              <h1 className="reduxH3">Redux Form</h1>
              </div>
            </div>
            
            <div className="row my-3 ">
              <div className="col-md-3"></div>
              
              <div className="col-md-6">
                <div className="row">
                <div className="col-md-12 p-0">
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="Name" className="reduxLabel">Name</label>
                    <Field type="text" name="Name" id="Name" className="form-control shadow-sm " />
                    <ErrorMessage component='div' className='text-light fw-bold' name='Name' />
                  </div>
                  <div className="col-md-6">
                  <label htmlFor="FatherName" className="reduxLabel">Father Name</label>
                  <Field type="text" name="FatherName" id="FatherName" className="form-control shadow-sm " />
                  <ErrorMessage component='div' className='text-light fw-bold' name='FatherName' />
                  </div>
                  <div className="col-md-6">
                  <label htmlFor="date" className="reduxLabel">Date of Berth </label>
                  <Field type="date" name="date" id="date" className="form-control shadow-sm " />
                  <ErrorMessage component='div' className='text-light fw-bold' name='date' />
                  </div>
                  <div className="col-md-6">
                  <label htmlFor="gender" className="reduxLabel">Gender</label>
                    <Field as='select' name="gender" id="gender" className="form-select  shadow-sm " >
                      <option value={""}>Select</option>
                      <option value={"male"}>Male</option>
                      <option value={"Female"}>Female</option>
                      <option value={"other"}>Other</option>
                    </Field>
                    <ErrorMessage component='div' className='text-light fw-bold' name='gender' />
                  </div>
                </div>
              </div>

              <div className="col-md-12 p-0 ">
                <button
                  className="btn btn-success w-25 float-end"
                >
                  Save
                      </button>
                {/** 
                  <button type="button"
                        className="btn btn-success w-25 float-end mx-3"
                        onClick={getData}
                >
                  Get Data 
                </button> */}     
              </div>
                  
                </div>
              </div>


              <div className="col-md-3"></div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8 table-responsive">
                  <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">ID# {PostStatus} </th>
                      <th scope="col">Name</th>
                      <th scope="col">Father Name</th>
                      <th scope="col">Date </th>
                      <th scope="col">Gender </th>
                      <th scope="col">option</th>
                    </tr>
                  </thead>
                    <tbody className="table-group-divider">
                      { PostStatus=='loading'? (<tr>
                            <td colSpan={6}>Loading....</td>
                          </tr>) : PostStatus == 'succeeded'? 
                          PreviousData.map((elem, index) => {
                        return (<tr>
                            <td>{++index} {elem.Flag == 1 ? (<img src={flag_Green} alt="Green" className='img-fluid Flags' />) : 
                              elem.Flag == 2 ? (<img src={flag_Yellow} alt="Yellow" className='img-fluid Flags' />) :
                              elem.Flag == 3 ? (<img src={flag_Red} alt="Red" className='img-fluid Flags' />) : " "} </td>
                           <td>{elem.Name}</td>
                           <td>{elem.FatherName}</td>
                           <td>{elem.date}</td>
                           <td>{elem.gender}</td>
                           <td>
                           <DropdownButton id="dropdown-button-dark-example"  variant="secondary" title="" data-bs-theme="light">
                                <Dropdown.Item as="button" eventKey="1"  type="button"  onClick={()=>{deleteFunction(elem,index)}}>Delete</Dropdown.Item>
                                <Dropdown.Item as="button" eventKey="2" type="button" onClick={() => { setValues(elem); SetUpdateFlag(true); }} >Update</Dropdown.Item>
                                <Dropdown className="px-3"  eventKey="3"><FlagUser id={elem.id} /></Dropdown>
                           </DropdownButton>
                           </td>
                          </tr>)
                          })
                          :PostStatus == 'failed'? (<tr>
                            <td colSpan={6}>{PostError}</td>
                          </tr>):""
                      }
                    </tbody>
                </table>
              </div>
              <div className="col-md-2"></div>

            </div>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
};

export default ReduxLearning;
