import React from "react";
import axios from "axios";
import { Paper, Container, Grid, TextField, Input, IconButton, Typography } from "@material-ui/core";
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableContainer, TableRow, TablePagination, TableFooter } from "@material-ui/core";
import { Email, CheckCircle, CloudUpload } from "@material-ui/icons";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import constants from "../constants";

export default function Dashboard(props) {
	const [data, setData] = React.useState(null);
	const [step, setStep] = React.useState(0);
	const [dirtyList, setDirtyList] = React.useState(null);
	const [progressList, setProgressList] = React.useState(null);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const userRef = React.useRef(null);

	React.useEffect(() => {
		console.log(data);
	})

	const getData = () => {
		axios
			.get(`${constants.FACULTY_DASHBOARD}/${userRef.current}`)
			.then((res) => {
				setData(res.data);
				setDirtyList(res.data.map(item => false));
				setProgressList(res.data.map(item => false));
			});
	};

	const updateDatabase = (index) => {
		axios.post(constants.FACULTY_DASHBOARD, data[index])
			.then(res => {
				if (res.data.info === 'success') {
					setProgressList(list => list.map((_item, _index) => {
						if (index === _index)
							return false;
						return _item;
					}));
					setDirtyList(list => list.map((_item, _index) => {
						if (index === _index)
							return false;
						return _item;
					}));
				}
			});
	}

	const sendMail = (index) => {
		axios.post(`${constants.FACULTY_DASHBOARD}}/mail`, data[index])
			.then(res => {
				if (res.data.info === 'success') {
					console.log('email sent successfully!');
				}
			})
	}

	const showUpdate = (index) => {
		if (progressList && progressList[index])
			return (
				<CircularProgress color='primary' size={20} variant='indeterminate' />
			)
		return (
			<IconButton
				aria-label='Update'
				size='small'
				onClick={() => {
					setProgressList(list => list.map((_item, _index) => {
						if (index === _index)
							return true;
						return _item;
					}))
					updateDatabase(index);
				}}
				color='primary'>
				<CloudUpload />
			</IconButton>
		)
	}

	const showIcon = () => {
		return (
			<CheckCircle color='primary' size='small' />
		)
	}

	const getTableHead = () => {
		return (
			<TableHead>
				<TableRow>
					<TableCell>Visitor's Name</TableCell>
					<TableCell>Description</TableCell>
					<TableCell>Date</TableCell>
					<TableCell>Time</TableCell>
					<TableCell>Place</TableCell>
					<TableCell>Action</TableCell>
				</TableRow>
			</TableHead>
		)
	}

	const getTableBody = () => {
		return (
			<TableBody>
				{data.map((item, index) => (
					<TableRow key={item._id} hover>
						<TableCell>{item.VisitorName}</TableCell>
						<TableCell>{item.Description}</TableCell>
						<TableCell>
							<DatePicker
								size='small'
								variant='inline'
								onChange={(date) => {
									setDirtyList(list => list.map((_item, _index) => {
										if (_index === index)
											return true
										return _item;
									}));
									setData(data =>
										data.map((_item, _index) => {
											if (_index === index)
												return { ..._item, Date: date }
											return _item;
										}));
								}}
								value={data[index].Date}
								style={{
									maxWidth: 120
								}}
							/>
						</TableCell>
						<TableCell>
							<TimePicker
								size='small'
								variant='inline'
								onChange={(date) => {
									setDirtyList(list => list.map((_item, _index) => {
										if (_index === index)
											return true
										return _item;
									}));
									setData(data =>
										data.map((_item, _index) => {
											if (_index === index)
												return { ..._item, Time: date }
											return _item;
										}));
								}}
								value={data[index].Time}
								style={{
									maxWidth: 75
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								defaultValue={data[index].Place}
								onChange={(event) => {
									event.persist();
									setDirtyList(list => list.map((_item, _index) => {
										if (_index === index)
											return true
										return _item;
									}));
									setData(data => data.map((_item, _index) => {
										if (_index === index && event.target && event.target.value)
											return { ..._item, Place: event.target.value }
										return _item;
									}))
								}} />
						</TableCell>
						<TableCell align='center'>
							<Grid container spacing={1}>
								<Grid item>
									{dirtyList && !dirtyList[index] && showIcon()}
									{dirtyList && dirtyList[index] && showUpdate(index)}
								</Grid>
								<Grid item>
									<IconButton
										aria-label='Send Email'
										size='small'
										onClick={() => {
											sendMail(index);
										}}
										color='primary'>
										<Email />
									</IconButton>
								</Grid>
							</Grid>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		)
	}

	const showPlaceHolder = () => {
		return (
			<TableBody>
				<TableRow>
					<TableCell>Data was not recieved, there's something wrong with server</TableCell>
				</TableRow>
			</TableBody>
		)
	}

	const getPagination = () => {
	return (
		<TablePagination
			count={data.length}
			page={page}	
			onChangePage={(event, page) => setPage(page)}	
			rowsPerPage={rowsPerPage}	
			onChangeRowsPerPage={(event) => setRowsPerPage(event.target.value)}
			rowsPerPageOptions={[5, 10, 15]}
		>
		</TablePagination>
		)
	}

	if (!step)
		return (
			<Container maxWidth="xs">
				<Paper>
					<Grid
						container
						spacing={3}
						justify="center"
						alignItems="space-around"
					>
						<Grid item xs={12}>
							<Typography align="center" gutterBottom variant="h5">
								Login
              </Typography>
						</Grid>
						<Grid item>
							<TextField placeholder="Enter username" onChange={(event) => { userRef.current = event.target.value }} />
						</Grid>
						<Grid item>
							<TextField
								placeholder="Enter password"
								inputProps={{
									type: "password",
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Input
								variant="filled"
								type="submit"
								className="submit"
								disableUnderline
								inputProps={{
									style: {
										cursor: "pointer",
									},
								}}
								onClick={(event) => {
									if (userRef.current) {
										getData();
										setStep(1);
									}
								}}
							/>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		);

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Container>
				<Paper>
					<Grid container justify='center' spacing={3}>
						<Grid item>
							<TableContainer>
								<Table>
									{getTableHead()}
									{!!data && getTableBody()}
									{!data && showPlaceHolder()}
									<TableFooter>
										<TableRow>
											{!!data && getPagination()}
										</TableRow>
									</TableFooter>
								</Table>
							</TableContainer>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</MuiPickersUtilsProvider>
	);
}
