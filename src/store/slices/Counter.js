import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from "./counterSlice";


const Counter = () => {
    let count = useSelector((state) => state.counter.count);
    let Dispatch = useDispatch();
  return (
    <div className='row Top px-0 pb-0 m-0'>
          
          <div className='col-md-6 d-none'>
          <button className='btn btn-danger float-end  mx-2' onClick={()=>Dispatch(decrement())}>Sub -</button>
          <button className='btn btn-success float-end mx-2' onClick={()=>Dispatch(increment())}>Add +</button>
          </div>
          <div className='col-md-12 text-center'><p> Counter = {count}</p></div>
    </div>  
  )
}

export default Counter
