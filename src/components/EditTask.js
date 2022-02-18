import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editTask, getTask } from '../api/journal';
import { useAuth } from '../context/AuthContextProvider';
import Navbar from './Navbar';

const EditTask = () => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [nameErrors, setNameErrors] = useState([]);
	const [descriptionErrors, setDescriptionErrors] = useState([]);
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [dateErrors, setDateErrors] = useState([]);
	const { state, dispatch } = useAuth();
	const [id, setId] = useState(undefined);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, status } = await getTask(state.token, params.id);

			if (status === 401) {
				setLoading(false);
				dispatch({ type: 'LOGOUT' });
			} else if (status === 404) {
				setLoading(true);
				navigate('/', { replace: true });
			} else {
				setName(data.name);
				setDescription(data.description);
				setDate(data.date);
				setId(data.id);
				setLoading(false);
			}
		})();
	}, [params.id, state.token]);

	const handleEdit = async () => {
		const task = {
			name: name,
			description: description,
			date: date,
		};
		setLoading(true);
		const { data, errors, status } = await editTask(
			state.token,
			task,
			id
		);
		if (status === 401) {
			setLoading(false);
			dispatch({ type: 'LOGOUT' });
		} else if (!_.isEmpty(errors)) {
			setNameErrors(errors.name);
			setDescriptionErrors(errors.description);
			setDateErrors(errors.date);
			setLoading(false);
		} else {
			setLoading(false);
			navigate(`/tasks/${data.id}`);
		}
	};
	return (
		<div className='container'>
			<Navbar />
			<div className='row justify-content-center'>
				<div className='col-md-6 col-sm-12 gy-5'>
					<div className='card d-flex flex-column gap-2'>
						<div className='d-flex justify-content-center mt-4'>
							<h1>Edit Task</h1>
						</div>

						<div className='d-flex ms-2 gap-3'></div>
						<div className='form-floating mx-3'>
							<input
								type='text'
								className='form-control'
								id='floatingInputName'
								placeholder='Name'
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
							<label htmlFor='floatingInputName'>
								Name
							</label>
							{nameErrors &&
								nameErrors.map((error, index) => (
									<div key={index}>
										<span className='text-danger'>
											name {error}
										</span>
									</div>
								))}
						</div>
						<div className='form-floating mx-3'>
							<input
								type='text'
								className='form-control'
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
								placeholder='Description'
								id='floatingInputDescription'
							/>
							<label htmlFor='floatingInputDescription'>
								Description
							</label>
							{descriptionErrors &&
								descriptionErrors.map(
									(error, index) => (
										<div key={index}>
											<span className='text-danger'>
												description {error}
											</span>
										</div>
									)
								)}
						</div>
						<div className='form-floating mx-3'>
							<input
								type='date'
								className='form-control'
								value={date}
								onChange={(e) => {
									setDate(e.target.value);
								}}
								placeholder='Date'
								id='floatingDate'
							/>
							<label htmlFor='floatingDate'>Date</label>
							{dateErrors &&
								dateErrors.map((error, index) => (
									<div key={index}>
										<span className='text-danger'>
											date {error}
										</span>
									</div>
								))}
						</div>
						<div className='d-flex justify-content-center mb-3'>
							<button
								className='btn btn-primary'
								onClick={handleEdit}
								disabled={loading}
							>
								Update Task
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditTask;
