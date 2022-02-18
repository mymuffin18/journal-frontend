import { replace } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteCategory, getCategory } from '../api/journal';
import { useAuth } from '../context/AuthContextProvider';
import { useCategories } from '../context/CategoryContextProvider';
import Navbar from './Navbar';

const Category = () => {
	const params = useParams();
	const { state, dispatch } = useAuth();
	const [category, setCategory] = useState({});
	const { dispatch: cDispatch } = useCategories();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			const { data, status } = await getCategory(
				state.token,
				params.id
			);

			if (status === 401) {
				dispatch({ type: 'LOGOUT' });
			} else if (status === 404) {
				navigate('/', { replace: true });
			} else {
				setCategory(data);
			}
		})();
	}, [params.id, state.token]);

	const handleDelete = async () => {
		setLoading(true);
		const status = await deleteCategory(state.token, params.id);
		if (status === 401) {
			setLoading(false);
			dispatch({ type: 'LOGOUT' });
		} else if (status === 404) {
			setLoading(false);
			navigate('/', { replace: true });
		} else {
			setLoading(false);
			cDispatch({ type: 'DELETE_CATEGORY', payload: category.id });
			navigate('/', { replace: true });
		}
	};

	const handleReload = async () => {
		const { data, status } = await getCategory(state.token, params.id);

		if (status === 401) {
			dispatch({ type: 'LOGOUT' });
		} else if (status === 404) {
			navigate('/', { replace: true });
		} else {
			setCategory(data);
		}
	};
	const checkDue = (date) => {
		let today = new Date();

		if (today.toISOString().split('T')[0] === date) {
			return <span className='text-danger'>DUE TODAY!</span>;
		}
	};

	const handleCreateTask = () => {
		navigate(`/tasks/create/${params.id}`, { replace: true });
	};
	const handleEdit = () => {
		navigate(`/categories/edit/${params.id}`, { replace: true });
	};

	const showTask = (id) => {
		navigate(`/tasks/${id}`, { replace: true });
	};
	return (
		<div className='container'>
			<Navbar />
			<div className='row justify-content-center'>
				<div className='col-md-6 col-sm-12 gy-5'>
					<div className='card d-flex flex-column gap-2'>
						<div className='d-flex justify-content-center mt-4'>
							<h1>{category.name}</h1>
						</div>
						<div className='ms-3'>
							<p>
								<strong>description:</strong>{' '}
								{category.description}
							</p>
						</div>
						<div className='d-flex ms-2 gap-3'>
							<button
								className={'btn btn-primary'}
								onClick={handleCreateTask}
							>
								Create Task
							</button>

							<button
								className='btn btn-warning'
								onClick={handleEdit}
							>
								Edit Category
							</button>
							<button
								className='btn btn-danger'
								onClick={handleDelete}
								disabled={loading}
							>
								Delete Category
							</button>

							<button
								className='btn btn-primary'
								onClick={handleReload}
							>
								Reload
							</button>
						</div>
						<div className='d-flex justify-content-center'>
							<h1>Tasks</h1>
						</div>
						<div className='mb-3'>
							{category.tasks &&
								category.tasks.map((task) => (
									<div
										className='card mx-3 mb-3'
										key={task.id}
									>
										<div className='d-flex justify-content-between align-items-center mx-3 mt-2'>
											<h2>{task.name}</h2>
											{!task.completed &&
												checkDue(task.date)}
											{task.completed && (
												<span className='text-success'>
													COMPLETED
												</span>
											)}
										</div>
										<div className='d-flex justify-content-between align-items-center mx-3 pb-2'>
											<span>{task.date}</span>
											<button
												className='btn btn-primary'
												onClick={() =>
													showTask(
														task.id
													)
												}
											>
												Show
											</button>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Category;
