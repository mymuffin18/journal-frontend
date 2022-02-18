import React, { useState } from 'react';
import { login, register } from '../api/auth';
import { useAuth } from '../context/AuthContextProvider';
import { Link } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { dispatch } = useAuth();
	const loginHandler = async () => {
		setLoading(true);
		const response = await login(email, password);
		if (response.error !== '') {
			setError(response.error);

			setPassword('');
			setLoading(false);
		} else {
			console.log(response.token);
			dispatch({
				type: 'LOGIN',
				payload: {
					user: response.data.user,
					token: response.data.token,
				},
			});
		}
		setLoading(false);
	};
	return (
		<div className='row justify-content-center'>
			<div className='col-md-4 col-sm-12 gy-5'>
				<div className='card'>
					<div className='d-flex justify-content-center px-5'>
						<h1>Login</h1>
					</div>
					<div>
						{error && (
							<span className='text-danger text-center'>
								{error}
							</span>
						)}
					</div>
					<div className='row gy-2'>
						<div className='form-floating'>
							<input
								type='email'
								className='form-control'
								id='floatingInput'
								placeholder='name@example.com'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
							<label htmlFor='floatingInput'>
								Email address
							</label>
						</div>
						<div className='form-floating'>
							<input
								type='password'
								className='form-control'
								id='floatingPassword'
								placeholder='Password'
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
							<label htmlFor='floatingPassword'>
								Password
							</label>
						</div>
						<div className='d-flex justify-content-center'>
							<Link to='/signup'>
								Don't have an account? Click here
							</Link>
						</div>

						<div className='d-flex justify-content-center'>
							<button
								className='btn btn-primary'
								onClick={loginHandler}
								disabled={loading}
							>
								Login
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
