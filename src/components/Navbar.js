import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api/auth';
import { useAuth } from '../context/AuthContextProvider';

const Navbar = () => {
	const { state, dispatch } = useAuth();
	const [loading, setLoading] = useState(false);
	const logoutHandler = async () => {
		setLoading(true);
		await logout(state.token);
		dispatch({ type: 'LOGOUT' });
		setLoading(false);
	};
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<Link className={'navbar-brand'} to='/'>
					Journally
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='collapse navbar-collapse'
					id='navbarSupportedContent'
				>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link
								className={'nav-link active'}
								aria-current='page'
								to='/'
							>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className={'nav-link active'}
								aria-current='page'
								to='/daily-tasks'
							>
								Daily Tasks
							</Link>
						</li>
						<div className='nav-item d-md-none d-sm-block'>
							<h6>{state.user.email}</h6>
						</div>
						<div className='d-md-none d-sm-block'>
							<button
								className={'btn btn-danger'}
								disabled={loading}
								onClick={logoutHandler}
							>
								Logout
							</button>
						</div>
					</ul>
				</div>

				<div className='d-md-flex align-items-center ms-auto me-3 d-none d-md-block'>
					<h6>{state.user.email}</h6>
				</div>
				<div className='d-none d-md-block'>
					<button
						className={'btn btn-danger'}
						disabled={loading}
						onClick={logoutHandler}
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
