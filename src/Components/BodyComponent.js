import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, amountAdd, Reset } from "../store/slices/counterSlice";

const BodyComponent = () => {
  let Dispatch = useDispatch();
  let [amount, setAmount] = useState(0);

  let ResetAll = () => {
    setAmount(0);
    Dispatch(Reset())
  }

  return (
    <div className='container-fluid bodyAdd'>
          <h1>Usama Faheem</h1>
      
      <div class="row m-2">
        <div className='col-md-2'></div>
        <div className='col-md-3'>
        <input type="number" name="name" value={amount} className='form-control' onChange={(e) => { setAmount(e.target.value) }} />
        </div>
          
        <div class="col-md-4">
          <button className='btn btn-outline-success mx-2' onClick={()=>Dispatch(amountAdd(parseFloat(amount)))}>Add by number</button>
          <button className='btn btn-outline-danger mx-2' onClick={() =>ResetAll()}>Reset All</button>
        </div>  
        <div className='col-md-12 p-4'>
          <h3> Add / Sub</h3>
          <button className='btn btn-success mx-2' onClick={()=>Dispatch(increment())}>Add +</button>
          <button className='btn btn-danger mx-2' onClick={()=>Dispatch(decrement())}>Sub -</button>
        </div>
        </div>

      
    </div>
  )
}

export default BodyComponent
