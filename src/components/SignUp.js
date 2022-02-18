import _ from 'lodash';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../api/auth';
import { useAuth } from '../context/AuthContextProvider';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [loading, setLoading] = useState(false);
	const [passwordConfError, setPasswordConfError] = useState('');
	const [passwordErrors, setPasswordErrors] = useState([]);
	const [emailErrors, setEmailErrors] = useState([]);

	const { dispatch } = useAuth();
	const handleRegister = async () => {
		if (password !== passwordConfirmation) {
			setPasswordConfError('Password Not Matched.');
			setPassword('');
			setPasswordConfirmation('');
		} else {
			setLoading(true);
			const { data, errors } = await register(email, password);

			if (!_.isEmpty(errors)) {
				setEmailErrors(errors.email);
				setPasswordErrors(errors.password);
				setPassword('');
				setPasswordConfirmation('');
				setLoading(false);
			} else {
				dispatch({
					type: 'LOGIN',
					payload: {
						user: data.user,
						token: data.token,
					},
				});
			}
			setLoading(false);
		}
	};
	return (
		<div className='container'>
			<div className='row justify-content-center'>
				<div className='col-md-4 col-sm-12 gy-5'>
					<div className='d-flex justify-content-center'>
						<h1>Sign Up to Journally</h1>
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
							{emailErrors &&
								emailErrors.map((error, index) => (
									<div key={index}>
										<span className='text-danger'>
											Email {error}
										</span>
									</div>
								))}
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
							{passwordErrors &&
								passwordErrors.map((error, index) => (
									<div key={index}>
										<span className='text-danger'>
											Password {error}
										</span>
									</div>
								))}
						</div>
						<div className='form-floating'>
							<input
								type='password'
								className='form-control'
								id='floatingPasswordConfirm'
								placeholder='Password Confirmation'
								value={passwordConfirmation}
								onChange={(e) => {
									setPasswordConfirmation(
										e.target.value
									);
								}}
							/>
							<label htmlFor='floatingPasswordConfirm'>
								Password Confirmation
							</label>
							{passwordConfError && (
								<span className='text-danger'>
									{passwordConfError}
								</span>
							)}
						</div>
						<div className='d-flex justify-content-center'>
							<Link to='/login'>
								Have an account? Login here.
							</Link>
						</div>

						<div className='d-flex justify-content-center'>
							<button
								className='btn btn-primary'
								onClick={handleRegister}
								disabled={loading}
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
