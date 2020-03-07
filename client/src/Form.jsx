import React from 'react';
import Gender from './gender.jsx';
import Gate from './Gate.jsx';





function Form(){

  const [form , updateForm] = React.useState({
    firstName : "",
    lastName : "",
    contact : "",
    gender : "",
    address : "",
    email : "",
    gate : "",
    faculty : "",
    description : "",
  });

  function handleChange(event){
      const{name , value} = event.target;
      updateForm(prevDetails => {
        return(
          {
            ...prevDetails,
            [name] : value
          }
        );
      });

  }

  function submitDetails(event){
    console.log(form);
    event.preventDefault();
  }


  return (
    <div>
    <h1 className = "heading"> VISITOR'S LOG </h1>
    <form >
        <div>
        <label> Name : </label>
        <input onChange = {handleChange} type = "text" placeholder = "First Name" name = "firstName" value = {form.firstName} />
        <input onChange = {handleChange} type = "text" placeholder = "Last Name" name = "lastName" value = {form.lastName} />
        </div>

        <Gender change = {handleChange} />

        <div>
          <label> Contact Number : </label>
          <input onChange = {handleChange} type = "text" placeholder = "Phone No." name = "contact" value = {form.contact} />
        </div>

        <div>
          <label> Email : </label>
          <input onChange = {handleChange} type = "email" placeholder = "Email" name = "email" value = {form.email} />
        </div>

        <div>
          <label> Address : </label>
          <input onChange = {handleChange} className = "address-input" type = "text" placeholder = "Enter Address" name = "address" value = {form.address} />
        </div>

        <Gate gateChange = {handleChange} />

        <div>
          <label> Faculty : </label>
          <input onChange = {handleChange} type = "text" placeholder = "Concerned Faculty" name = "faculty" value = {form.faculty} />
        </div>

        <div>
          <label> Description : </label>
          <input onChange = {handleChange} className = "address-input" type = "text" placeholder = "Reason for meeting" name = "description" value = {form.description} />
        </div>

        <input onSubmit = {submitDetails} type = "submit" className = "submit"/>

    </form>
    </div>

  );
}

export default Form;
