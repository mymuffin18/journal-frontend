import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCategories } from '../api/journal';
import { useAuth } from '../context/AuthContextProvider';
import { useCategories } from '../context/CategoryContextProvider';
import Navbar from './Navbar';

const Dashboard = () => {
	const { state, dispatch } = useAuth();
	const [loading, setLoading] = useState(false);
	const { state: categoryState, dispatch: categoryDispatch } =
		useCategories();
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, status } = await getAllCategories(state.token);
			if (status === 401) {
				setLoading(false);
				dispatch({ type: 'LOGOUT' });
			} else {
				categoryDispatch({
					type: 'GET_ALL_CATEGORIES',
					payload: data,
				});
				setLoading(false);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.token]);

	const showCategory = (id) => {
		navigate(`categories/${id}`, { replace: true });
	};
	return (
		<div className='container'>
			<Navbar />
			<div className='row justify-content-center'>
				<div className='col-md-6 col-sm-12 gy-5'>
					<div className='card d-flex flex-column gap-2'>
						<div className='d-flex justify-content-center mt-4'>
							<h1>Categories</h1>
						</div>
						<div className='d-flex justify-content-end me-2'>
							<Link
								className={'btn btn-primary'}
								to='categories/create'
							>
								Create Category
							</Link>
						</div>
						<div className='mb-3'>
							{loading ? (
								<div className='d-flex justify-content-center'>
									<div
										className='spinner-border'
										role='status'
									>
										<span className='visually-hidden'>
											Loading...
										</span>
									</div>
								</div>
							) : (
								categoryState.categories &&
								categoryState.categories.map(
									(category) => (
										<div
											className='card mx-3 mb-3'
											key={category.id}
										>
											<div className='d-flex justify-content-between align-items-center p-2'>
												<div>
													<h2>
														{
															category.name
														}
													</h2>
												</div>
												<div>
													<button
														className='btn btn-primary'
														onClick={() =>
															showCategory(
																category.id
															)
														}
													>
														Show
													</button>
												</div>
											</div>
										</div>
									)
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
