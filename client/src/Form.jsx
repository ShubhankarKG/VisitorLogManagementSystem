import React, { useEffect } from "react";
import { Select, MenuItem, Typography, Container, Grid, TextField, Paper, Button } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import "./Error.css";

function Form() {

  const [form, updateForm] = React.useState({
    firstName: "",
    lastName: "",
    contact: "",
    gender: "",
    address: "",
    email: "",
    gate: "",
    facultyID: "",
    description: "",
    facultyEmail: "",
    facultyUserName: "",
  });

  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
    contact: "",
    gender: "",
    address: "",
    email: "",
    gate: "",
    description: "",
    facultyUserName: ""
  });

  const [step, setStep] = React.useState(1);
  const [otp, setOtp] = React.useState(null);

  const otpFieldRef = React.useRef(null);
  const [status, setStatus] = React.useState("Validating visitor...");
  const [error, setError] = React.useState(false);
  const [faculty, setFaculty] = React.useState([]);

  function getData() {
    axios.get("https://localhost:5000/api/faculty/")
      .then((response) => {
        setFaculty(response.data);
      })
      .catch((e) => {
        alert(e.toString());
      })
  }

  function isFormValid() {
    let formIsValid = true;
    if (!form.firstName) {
      formIsValid = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        firstName: "*First Name can't be empty"
      })
      )
    }

    if (!form.lastName) {
      formIsValid = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        lastName: "*Last Name can't be empty"
      }))
    }

    if (!form.address) {
      formIsValid = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        address: "*Address can't be empty"
      }))
    }

    if (!form.contact) {
      formIsValid = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        contact: "*Contact Number can't be empty"
      }))
    }

    if (!form.description) {
      formIsValid = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        description: "*Reason for meeting can't be empty"
      }))
    }

    if (!form.email) {
      formIsValid = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        email: "*Email can't be empty"
      }))
    }

    if (!form.facultyUserName) {
      formIsValid = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        facultyUserName: "*Faculty to meet can't be empty"
      }))
    }

    if (!form.gender) {
      formIsValid = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        gender: "*Gender can't be empty"
      }))
    }

    if (!form.gate) {
      formIsValid = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        gate: "*Name of gate entered can't be empty"
      }))
    }

    return formIsValid;
  }

  useEffect(() => {
    getData();
  }, []);

  function handleClick(event) {
    if (isFormValid()) {
      event.preventDefault();
      fetch("https://localhost:5000/api/visitor/create", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then((result) => {
          setOtp(result.otp);
          setStep(2);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      alert("There are errors in your form !");
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    updateForm((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  }

  function validateOTP(event) {
    if (otpFieldRef.current && parseInt(otpFieldRef.current.value) !== otp) {
      otpFieldRef.current.value = "";
      setError(true);
      otpFieldRef.current.placeholder = "Please try again.";
    }
    if (otpFieldRef.current && parseInt(otpFieldRef.current.value) === otp) {
      setError(false);
      fetch("https://localhost:5000/api/visitor/validate", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(result => {
          setStatus(result.info);
        });
    }
  }

  function renderForm(step) {
    if (step === 1) {
      return (
        <>
          <Grid item container xs={12}>
            <label> Name : </label>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              value={form.firstName}
            />
            <div className="errorMsg">{errors.firstName}</div>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              value={form.lastName}
            />
            <div className="errorMsg">{errors.lastName}</div>
          </Grid>

          <Grid item xs={12}>
            <label> Gender: </label>
            <Select
              defaultValue="Male"
              onChange={(event) => {
                updateForm(form => ({
                  ...form,
                  gender: event.target.value,
                }))
              }}
            >
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Female'>Female</MenuItem>
            </Select>
            <div className="errorMsg">{errors.gender}</div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              onChange={handleChange}
              type="text"
              placeholder="Phone No."
              name="contact"
              value={form.contact}
            />
            <div className="errorMsg">{errors.contact}</div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              onChange={handleChange}
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
            />
            <div className="errorMsg">{errors.email}</div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              onChange={handleChange}
              type="text"
              placeholder="Enter Address"
              name="address"
              value={form.address}
            />
            <div className="errorMsg">{errors.address}</div>
          </Grid>

          <Grid item xs={12}>
            <label> Gate: </label>
            <Select
              defaultValue="Main Gate"
              onChange={(event) => {
                updateForm(form => ({
                  ...form,
                  gate: event.target.value,
                }))
              }}
            >
              <MenuItem value='Main Gate'>Main Gate</MenuItem>
              <MenuItem value='Mechanical Gate'>Mechanical Gate</MenuItem>
            </Select>
            <div className="errorMsg">{errors.gate}</div>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              id="combo-box-demo"
              // options is an array of objects.
              options={faculty}
              style={{ width: 250 }}
              // getOptionLabel defines what to show on the list.
              getOptionLabel={option => option.name}
              onChange={(event, value, reason) => {
                // value = option = {name, id, email, username} 
                updateForm(form => ({
                  ...form,
                  facultyEmail: value.email,
                  facultyID: value.id,
                  facultyUserName: value.username,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Concerned Faculty"
                  name="faculty"
                  type="text"
                  value={form.faculty}
                />
              )}
            />
            <div className="errorMsg">{errors.facultyUserName}</div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              onChange={handleChange}
              type="text"
              placeholder="Reason for meeting"
              name="description"
              value={form.description}
            />
            <div className="errorMsg">{errors.description}</div>
          </Grid>

          <Grid container justify="center" item>
            <Button onClick={handleClick} variant="contained" color="secondary">Submit</Button>
          </Grid>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <Grid item xs={9}>
            <TextField
              type="text"
              placeholder="Enter OTP"
              error={!!error}
              inputRef={otpFieldRef}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={validateOTP}
            >
              Validate OTP
          </Button>
          </Grid>
          <Grid container justify="center" item xs={12}>
            <Typography>
              {status}
            </Typography>
          </Grid>
        </>
      );
    }
  }

  return (
    <Container maxWidth="sm">
      <header>
        <div className="heading">
          <Typography variant="h4">
            VISITOR'S LOG
        </Typography>
        </div>
      </header>
      <Paper style={{ padding: 16 }} id="from_style">
        <Grid container alignItems="flex-start" spacing={2}>
          {renderForm(step)}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Form;
