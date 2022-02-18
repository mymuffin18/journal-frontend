import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTask, getTask, toggleCompleteTask } from '../api/journal';
import { useAuth } from '../context/AuthContextProvider';
import Navbar from './Navbar';

const Task = () => {
	const params = useParams();
	const navigate = useNavigate();
	const { state, dispatch } = useAuth();
	const [task, setTask] = useState({});
	const [loading, setLoading] = useState(false);
	const [categoryId, setCategoryId] = useState(undefined);
	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, status } = await getTask(state.token, params.id);

			if (status === 401) {
				setLoading(false);
				dispatch({ type: 'LOGOUT' });
			} else if (status === 404) {
				setLoading(false);
				navigate('/', { replace: true });
			} else {
				setTask(data);
				setCategoryId(data.category_id);
				setLoading(false);
			}
		})();
	}, [params.id, state.token]);

	const checkDue = (date) => {
		let today = new Date();

		if (today.toISOString().split('T')[0] === date) {
			return <span className='text-danger'>DUE TODAY!</span>;
		}
	};

	const handleDelete = async () => {
		setLoading(true);
		const status = await deleteTask(state.token, params.id);
		if (status === 401) {
			setLoading(false);
			dispatch({ type: 'LOGOUT' });
		} else if (status === 404) {
			setLoading(false);
			navigate('/', { replace: true });
		} else {
			setLoading(false);

			navigate(`/categories/${categoryId}`, { replace: true });
		}
	};

	const navToEdit = () => {
		navigate(`/tasks/${task.id}/edit`, { replace: true });
	};

	const toggleComplete = async () => {
		setLoading(true);
		const { data, status } = await toggleCompleteTask(
			state.token,
			task.id,
			task.completed
		);

		if (status === 401) {
			setLoading(false);
			dispatch({ type: 'LOGOUT' });
		} else {
			setTask(data);
			setLoading(false);
		}
	};
	return (
		<div className='container'>
			<Navbar />
			<div className='row justify-content-center'>
				<div className='col-md-6 col-sm-12 gy-5'>
					<div className='card d-flex flex-column gap-2'>
						<div className='d-flex justify-content-center mt-4'>
							<h1>{task.name}</h1>
						</div>
						<div className='ms-3'>
							<p>
								<strong>description:</strong>{' '}
								<span>{task.description}</span>
							</p>
							<p>
								<strong>date:</strong> {task.date}
							</p>
							<p>
								<strong>completed:</strong>{' '}
								{task.completed ? (
									<span className='text-success'>
										Done
									</span>
								) : (
									<span className='text-danger'>
										Incomplete
									</span>
								)}
							</p>
							{!task.completed && checkDue(task.date)}
						</div>
						<div className='d-flex justify-content-center ms-2 gap-3 mb-3'>
							<button
								className={'btn btn-primary'}
								onClick={navToEdit}
								disabled={loading}
							>
								Edit Task
							</button>

							<button
								className='btn btn-warning'
								onClick={toggleComplete}
							>
								Toggle Complete
							</button>
							<button
								className='btn btn-danger'
								onClick={handleDelete}
								disabled={loading}
							>
								Delete Task
							</button>
							{/* 
							<button
								className='btn btn-primary'
								// onClick={}
							>
								Reload
							</button> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Task;
