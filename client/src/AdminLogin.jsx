import React from 'react';
import { Container, Paper, Grid, TextField, Button, Typography } from '@material-ui/core';
import "./Error.css";

export default function AdminSignin() {
	const [form, updateForm] = React.useState({
		email: "",
		password: "",
	});

	const [errors, updateErrors] = React.useState({
		email: "",
		password: "",
	});

	function isFormValid() {
		let formIsValid = true;
		if (!form.email) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				email: "*Email can't be Empty"
			}));
		}

		if (!form.password) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				password: "*Please enter your password."
			}));
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
		if (isFormValid()) {
			// event.preventDefault();
			// fetch(process.env.REACT_APP_API_LOGIN, {
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
			alert("There are errors in your form !");
		}
	}

	return (
		<Container maxWidth="sm">
			<h2 className="heading"> ADMIN LOGIN </h2>
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
						<Button
							variant="contained"
							color="secondary"
							onClick={handleClick}
						>
							Submit
                </Button>
					</Grid>

					<Grid item xs={12}>
						<Typography>
						If you are a new Admin, you might want to <a href="https://localhost:3000/AdminSignup">Sign Up</a> instead.
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Container>

	)
}