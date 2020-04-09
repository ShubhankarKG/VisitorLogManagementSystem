import React from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./App.css";

function Faculty() {
	const [form, updateForm] = React.useState({
		firstName: "",
		lastName: "",
		designation: "",
		department: "",
		email: "",
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
				<h1 className="heading"> FACULTY ENTRY </h1>
			</Typography>
			<form action="https://localhost:5000/api/faculty/create" method="POST" id="form" noValidate>
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

						<Grid item xs={6}>
							<TextField
								fullWidth
								required
								name="designation"
								type="text"
								placeholder="Designation"
								onChange={handleChange}
								value={form.designation}
							/>
						</Grid>

						<Grid item xs={6}>
							<TextField
								fullWidth
								required
								name="department"
								type="text"
								placeholder="Department"
								onChange={handleChange}
								value={form.department}
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

	)
}

export default Faculty;