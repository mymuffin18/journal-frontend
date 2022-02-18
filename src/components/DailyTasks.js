import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTasks } from '../api/journal';
import { useAuth } from '../context/AuthContextProvider';
import Navbar from './Navbar';

const DailyTasks = () => {
	const { state, dispatch } = useAuth();
	const [loading, setLoading] = useState(false);
	const [tasks, setTasks] = useState([]);

	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, status } = await getAllTasks(state.token);
			if (status === 401) {
				setLoading(false);
				dispatch({ type: 'LOGOUT' });
			} else {
				setTasks(data);
				setLoading(false);
			}
		})();
	});

	const checkDue = (date) => {
		let today = new Date();

		if (today.toISOString().split('T')[0] === date) {
			return <span className='text-danger'>DUE TODAY!</span>;
		}
	};

	const showDailyTasks = () => {
		let today = new Date();

		return tasks.filter((task) => {
			return today.toISOString().split('T')[0] === task.date;
		});
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
							<h1>Daily Tasks</h1>
						</div>

						<div className='mb-3 mt-3'>
							{showDailyTasks() &&
								showDailyTasks().map((task) => (
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

export default DailyTasks;
