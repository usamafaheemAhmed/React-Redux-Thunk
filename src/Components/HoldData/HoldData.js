import React from 'react'
import usamaNew from "../../img/usamaNew.jpg"
import "./holdData.css"


const HoldData = () => {
  return (
    <div className='container-fluid bg-light text-dark p-2'>
      <div className="row">
        <div className="col-md-4">
          <div className="card border shadow ">
            <div className="row p-3">
              <div className="col-md-6 m-0 p-0">
            <div className='card-img border '>
            <img className="flex-img w-50" src={usamaNew} alt="Title"/>
            </div>
              </div>
            <div className="col-md-6 p-0 m-0">
            <div className="card-body border">
              <h4 className="card-title">Title</h4>
              <p className="card-text">Text</p>
                </div>
              </div>
            </div>
            
        </div>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
      </div>
    </div>
  )
}

export default HoldData
