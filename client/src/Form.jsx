import  React , { useEffect } from "react";
import { Select, MenuItem, Typography, Container, Grid, TextField, Paper, Button } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

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

  useEffect(() => {
    getData();
  }, []);

  function handleClick(event) {
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
              fullWidth
              onChange={handleChange}
              type="text"
              placeholder="Enter Address"
              name="address"
              value={form.address}
            />
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
                // value = option = {name, id, email} 
                updateForm(form => ({
                  ...form,
                  facultyEmail: value.email,
                  facultyID: value.id,
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
