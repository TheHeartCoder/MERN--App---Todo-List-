const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../models/userModel');

// @desc Create/ register one user
exports.registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400).json({
			success: false,
			message: 'User already exists',
		});
	} else {
		const user = await User.create({ name, email, password });
		if (user) {
			res.status(201).json({
				success: true,
				message: 'User has created',
				user: user,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).json({
				success: false,
				message: 'Something went wrong',
			});
		}
	}
});

// @desc Login User
exports.loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const userExist = await User.findOne({ email });

	if (userExist && (await userExist.matchPassword(password))) {
		res.status(200).json({
			success: true,
			message: 'User logged in successfully',
			email: email,
			token: generateToken(userExist._id),
		});
	} else {
		res.status(400).json({
			success: false,
			message: 'Invalid user/password',
		});
	}
});
