import React from 'react';
import { Container, Paper, Grid, TextField, Button, Typography } from '@material-ui/core';
import "./Error.css";

export default function AdminSignup() {
	const [form, updateForm] = React.useState({
		email: "",
		password: "",
		idNumber: null
	});

	const [errors, updateErrors] = React.useState({
		email: "",
		password: "",
		idNumber: ""
	});

	function isFormValid() {
		let formIsValid = true;
		// Constraints for Email

		if (!form.email) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				email: "*Email can't be Empty",
			}));
		}

		if (form.email) {
			let pattern = new RegExp(/^[a-zA-Z0-9_+&*-] + (?:\\.[a-zA-Z0-9_+&*-]+ )*@(?:[a-zA-Z0-9-]+\\.) + [a-zA-Z]{2, 7}/);
			if (!pattern.test(form.email)) {
				formIsValid = false;
				updateErrors(prevErrors => ({
					...prevErrors,
					errors: "*Please enter valid Email ID",
				}));
			}
		}

		/* Password Constraints 
		1. Must be within 6 to 16 characters
		2. Must contain at least 1 number, 1 lowercase, 1 uppercase letter, 1 special character
		*/

		if (!form.password) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				password: "*Password can't be empty."
			}));
		}

		if (form.password !== "") {
			if (!form.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
				formIsValid = false;
				updateErrors(prevErrors => ({
					...prevErrors,
					password: `Passwords should contain atleast one number, one special character,  
					one uppercase character, one lowercase character and must be between 6 to 16 characters long`
				}));

			}
		}

		// Constraints for ID Card
		if (!form.idNumber) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				idNumber: "*ID Number can't be Empty",
			}));
		}

		if (form.idNumber) {
			let pattern = new RegExp(/^[0-9]{9}$/);
			if (!pattern.test(form.idNumber)) {
				formIsValid = false;
				updateErrors(prevErrors => ({
					...prevErrors,
					idNumber: "*Please enter valid ID Number",
				}));
			}
		}

		return formIsValid;

	}

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

	function handleClick(event) {
		event.preventDefault();
		if (isFormValid()) {
			// fetch(process.env.REACT_APP_API_REGISTER, {
			// 	method: "POST",
			// 	mode: "cors",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify(form),
			// })
			// 	.then((response) => response.json())
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
		}
		else {
			alert("There are errors in the form !");
		}
	}

	return (
		<Container maxWidth="sm">
			<h1 className="heading"> SIGN UP </h1>
			<Paper style={{ padding: 16 }} id="from_style">
				<Grid container alignItems="flex-start" spacing={2}>

					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							name="email"
							type="email"
							placeholder="Email"
							onChange={handleChange}
							value={form.email}
						/>
						<div className="errorMsg">{errors.email}</div>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							name="password"
							type="password"
							placeholder="Password"
							onChange={handleChange}
							value={form.password}
						/>
						<div className="errorMsg">{errors.password}</div>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							name="idNumber"
							type="number"
							placeholder="ID Number"
							onChange={handleChange}
							value={form.idNumber}
						/>
						<div className="errorMsg">{errors.idNumber}</div>
					</Grid>

					<Grid item xs={12}>
						<div>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleClick}
							>
								Submit
              </Button>
						</div>
					</Grid>

					<Grid item xs={12}>
						<Typography>
							If you are an admin already, you might want to <a href="https://localhost:3000/AdminLogin">Sign In</a> instead.
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Container >
	)
}