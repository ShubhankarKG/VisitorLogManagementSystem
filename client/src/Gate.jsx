import React from 'react';

function Gate(props){
  return(
    <div>
      <label> Gate: </label>
      <select name = "gate" onChange = {props.gateChange} className = "select">
        <option value = "Main Gate"> Main Gate </option>
        <option value = "Mechanical Gate"> Mechanical Gate </option>
      </select>
    </div>
  );
}

export default Gate;
