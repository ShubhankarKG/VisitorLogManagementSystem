import React from "react";
import Gender from "./gender.jsx";
import Gate from "./Gate.jsx";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

function Form() {

  const [form, updateForm] = React.useState({
    firstName: "",
    lastName: "",
    contact: "",
    gender: "",
    address: "",
    email: "",
    gate: "",
    faculty: "",
    description: "",
  });

  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = React.useState(null);

  const otpFieldRef = React.useRef(null);
  const [status, setStatus] = React.useState("Validating visitor...");
  const [error, setError] = React.useState(false);
  const [faculty, setFaculty] = React.useState([]);

  function getData () {
    axios.get("https://localhost:5000/api/faculty/")
      .then((response) => {
        console.log(response.data)
        setFaculty(response.data);
      })
      .catch((e) => {
        alert(e.toString());
      })
  }

  useEffect(() => {
    getData();
  }, []);

  function handleClick(event) {
    event.preventDefault();
    setLoading(true);
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
        setLoading(false);
        setStep(2);
      })
      .catch((err) => {
        console.log(err);
      });
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
          </Grid>

          <Grid item xs={12}>
            <Gender change={handleChange} />
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
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              onChange={handleChange}
              className="address-input"
              type="text"
              placeholder="Enter Address"
              name="address"
              value={form.address}
            />
          </Grid>

          <Grid item xs={12}>
            <Gate gateChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              id="combo-box-demo"
              options={faculty}
              style={{ width: 250 }}
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
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              onChange={handleChange}
              className="address-input"
              type="text"
              placeholder="Reason for meeting"
              name="description"
              value={form.description}
            />
          </Grid>

          <Grid container justify="center" item xs={12}>
            <Button onClick={handleClick}>Submit</Button>
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
