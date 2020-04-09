import React from 'react';
import Gender from './gender.jsx';
import Gate from './Gate.jsx';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./App.css";

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

  function handleChange(event) {
    const { name, value } = event.target;
    updateForm(prevDetails => {
      return (
        {
          ...prevDetails,
          [name]: value
        }
      );
    });

  }

  return (
    <Container maxWidth="sm">
      <Typography>
        <h1 className="heading"> VISITOR'S LOG </h1>
      </Typography>
      <form action="https://localhost:5000/api/visitor/create" method="POST" id="form" noValidate>
        <Paper style={{ padding: 16 }} id="from_style">
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid container xs={12}>
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
                value={form.email} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                onChange={handleChange}
                className="address-input"
                type="text"
                placeholder="Enter Address"
                name="address"
                value={form.address} />
            </Grid>

            <Grid item xs={12}>
              <Gate gateChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                id="combo-box-demo"
                options={['My life', 'my rules']}
                style={{ width: 250 }}
                renderInput={params => <TextField
                  {...params}
                  placeholder="Concerned Faculty"
                  name="faculty"
                  type="text"
                  value={form.faculty}
                />}
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
                value={form.description} />
            </Grid>

            <Grid item xs={12} justify="center">
              <input
                type="submit"
                form="form"
                className="submit" />
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Container>

  );
}

export default Form;
