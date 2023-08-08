import React from 'react'
import Basket from "../../img/Bukket.svg";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";




const MAX_FILE_SIZE = 102400; // 100KB

const validFileExtensions = { csv: ['csv'] };

function isValidFileType(fileName, fileType) {
    // alert(fileName+"  "+fileType)
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const CSVTask = () => {
    let initialValues = {
        Date: "",
        VenderName: "",
        CVSFile:"",
    }

    let validate = Yup.object({
        Date: Yup.string().required('Required'),
        VenderName: Yup.string().required('Required'),
        CVSFile: Yup.mixed()
          .required('CSV file is required')
          .test('is-valid-type', 'Not a valid CSV file type', (value) =>
            isValidFileType(value, 'csv')
          ),
      });
     
    let onSubmit = async (values) => {
        try {
            // alert(values.CVSFile)

            

            const { Date, VenderName, CVSFile } = values;

            // Log the form values and the file object
            console.log('Form Values:', Date, VenderName);
            console.log('File Object:', CVSFile);

            // Now you can process the CVSFile as needed
            // For example, you can read the file using FileReader API:
            const reader = new FileReader();
            reader.onload = (event) => {
            const csvContent = event.target.result;
            console.log('CSV Content:', csvContent);
            };
            reader.readAsText(CVSFile);
            
            return

            const response = await fetch(values.CVSFile);
            const csvText = await response.text();
            const lines = csvText.split('\n');
            const data = lines.map(line => line.split(',')); // Split by comma for each column
            console.log(data);
            // setCsvData(data);
          } catch (error) {
            console.error('Error fetching CSV data:', error);
          }

    }
    const readCSVFile = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const csvContent = event.target.result;
            resolve(csvContent);
          };
          reader.onerror = (event) => {
            reject(event.target.error);
          };
          reader.readAsText(file);
        });
      };
      

  return (
    <div className='container-fluid'>
          <div className="row">
          <div className="col-md-3"></div>
              <div className="col-md-6">
                    <div className="card text-left border shadow">
                     <div className='TaskImage'><img className="card-img-top w-25" src={Basket} alt=""/></div> 
                      <div className="card-body">
                          <Formik initialValues={initialValues}
                              validationSchema={validate}
                              onSubmit={onSubmit}>
                              {({ values,handleChange }) => <Form>
                                  <div className='row'>
                                  <div className="form-group w-50">
                                  <label htmlFor="Date" className='float-start'> Date :</label>
                                  <Field name="Date" id="Date" type="date" className="form-control shadow-sm" />
                                  <ErrorMessage component='div'  className='text-danger fw-bold' name='Date' />
                                  </div>
                                  <div className="form-group w-50">
                                  <label htmlFor="VenderName" className='float-start'> Vender Name :</label>
                                  <Field name="VenderName" id="VenderName" type="text" className="form-control shadow-sm" />
                                  <ErrorMessage component='div'  className='text-danger fw-bold' name='VenderName' />
                                  </div>
                                  </div>
                                  <div className='row'>
                                      
                                     <div className="form-group">
                                    <label htmlFor="CVSFile" className='float-start'> CSVFIle</label>
                                    <Field name="CVSFile" id="CVSFile" type="file" className="form-control shadow-sm" handleChange={readCSVFile}  />
                                    <ErrorMessage component='div'  className='text-danger fw-bold' name='CVSFile' />
                                    </div>
                                  </div>
                                  <div className='row'>
                                      <div className="form-group">
                                          <button type='btn' className='btn btn-success w-25 float-end'>Submit</button>
                                  </div>
                                  </div>
                              </Form>}</Formik>
                      </div>
                    </div>
              
              </div>
              <div className="col-md-3">
                
              
              </div>
          
          </div>
    </div>
  )
}

export default CSVTask
