import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../login.css';
import { register, login } from '../actions/userActions';
import Loader from './Loader.js';

const Auth = ({ history }) => {
	const [signUp, setSignUp] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cnfPassword, setCnfPassword] = useState('');

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const userLogin = useSelector((state) => state.userLogin);
	const {
		loading: loadingLogin,
		error: errorLogin,
		userInfo: userLoggedInfo,
	} = userLogin;

	useEffect(() => {
		if (userInfo || userLoggedInfo) {
			history.push('/todo');
		}
	}, [history, userInfo, userLoggedInfo]);
	const formHandler = (e, value) => {
		e.preventDefault();
		setSignUp(value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (signUp) {
			// for register/signup
			if (password !== cnfPassword) {
				alert('Password doesnot matched !!');
			} else {
				dispatch(register(name, email, password));
			}
		} else {
			// for login
			dispatch(login(email, password));
		}
	};
	return (
		<>
			<div className='wrapper fadeInDown'>
				<div id='formContent'>
					<div className='fadeIn first'>
						<img
							src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
							id='icon'
							alt='User Icon'
							style={{ height: '150px', width: '150px' }}
						/>
					</div>
					{(loading || loadingLogin) && <Loader />}
					{(error || errorLogin) && alert('Error !')}

					{!signUp ? (
						<form onSubmit={submitHandler}>
							<input
								type='text'
								id='login'
								className='fadeIn second'
								name='email'
								placeholder='Email Please'
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type='text'
								id='password'
								className='fadeIn third'
								name='password'
								placeholder='Password Please'
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button type='submit' className='fadeIn fourth'>
								Log In
							</button>
						</form>
					) : (
						<form onSubmit={submitHandler}>
							<input
								type='text'
								id='login'
								className='fadeIn fifth'
								name='name'
								placeholder='Name Please'
								onChange={(e) => setName(e.target.value)}
							/>
							<input
								type='text'
								id='password'
								className='fadeIn sixth'
								name='email'
								placeholder='Email Please'
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type='text'
								id='password'
								className='fadeIn seventh'
								name='password'
								placeholder='Password Please'
								onChange={(e) => setPassword(e.target.value)}
							/>

							<input
								type='text'
								id='cnf_password'
								className='fadeIn eighth'
								name='cnf_password'
								placeholder='Confirm Password'
								onChange={(e) => setCnfPassword(e.target.value)}
							/>
							<button type='submit' className='fadeIn nineth'>
								Register
							</button>
						</form>
					)}
					<div id='formFooter'>
						{signUp ? (
							<a
								className='underlineHover'
								href='/#'
								onClick={(e) => formHandler(e, false)}>
								Already have an account ?
							</a>
						) : (
							<a
								className='underlineHover'
								href='/#'
								onClick={(e) => formHandler(e, true)}>
								Don't have an account ?
							</a>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Auth;
