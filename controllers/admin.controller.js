const Admin = require('../models/admin');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.admin_register = (req, res) => {
	const { email, idNumber, password } = req.body;

	if (!email || !idNumber || !password) {
		res.status(400).json({ msg: "Please enter all fields" });
	}

	Admin.findOne({ Email: email })
		.then(admin => {
			if (admin) res.status(400).json({ msg: "Admin already exists" });
			const newAdmin = new Admin({
				Email: email,
				IdNumber: idNumber,
				Password: password
			});

			// Generate hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newAdmin.Password, salt, (err, hash) => {
					if (err) throw err;
					newAdmin.password = hash;
					newAdmin.save()
						.then(admin => {

							jwt.sign(
								{
									id: admin.id,
									idNumber: admin.IdNumber,
								},
								process.env.JWT_SECRET,
								{
									expiresIn: 3600,
								},
								(err, token) => {
									if (err) throw err;
									res.json({
										token,
										admin: {
											id: admin.id,
											email: admin.Email,
											idNumber: admin.IdNumber,
										}
									})
								}
							)
						})
				})
			})
		})
		.catch(e => {
			e.toString();
		})
}

exports.admin_login = (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ msg: "Please enter all fields" });
	}

	Admin.findOne({ Email: email })
		.then(admin => {
			if (!admin) res.status(400).json({ msg: "Admin does not exist" });

			// Compare hash
			bcrypt.compare(password, admin.Password)
				.then(isMatching => {
					if (!isMatching) return res.json({ msg: "Invalid Credentials" });
					jwt.sign(
						{
							id: admin.id,
							idNumber: admin.IdNumber,
						},
						process.env.JWT_SECRET,
						{
							expiresIn: 3600,
						},
						(err, token) => {
							if (err) throw err;
							res.json({
								token,
								admin: {
									id: admin.id,
									email: admin.Email,
									idNumber: admin.IdNumber,
								}
							})
						}
					)
				});
		});
}