import React from 'react';

function Gender(props){
  return(
    <div>
      <label> Gender: </label>
      <select onChange = {props.change} name = "gender" className = "select" >
        <option value = "Male"> Male </option>
        <option value = "Female"> Female </option>
      </select>
    </div>
  );
}

export default Gender;
