import React from 'react'
import flag_Yellow from "./Flag (1).svg";
import flag_Green from "./Flag (2).svg";
import flag_Red from "./Flag (3).svg";
import { useDispatch, useSelector } from 'react-redux'
import { AddAttributeData , UpdateFlagAxiosData } from "../../../store/slices/fromSlice/fromSlice";


const FlagUser = (props) => {

  let Dispatch = useDispatch();

  let Flag = (num) => {
    let DataId = {
      id: props.id,
      Flag:num
    }
    Dispatch(UpdateFlagAxiosData(DataId))
    console.log(DataId);
  }



  return (
    <div>
      <img src={flag_Green} alt="Green" className='img-fluid w-25 ' onClick={ ()=>Flag(1)} />
      <img src={flag_Yellow} alt="Yellow" className='img-fluid w-25 mx-2' onClick={ ()=>Flag(2)} />
      <img src={flag_Red} alt="Red" className='img-fluid w-25 ' onClick={ ()=>Flag(3)} />
    </div>
  )
}

export default FlagUser
