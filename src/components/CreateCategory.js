import _ from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../api/journal';
import { useAuth } from '../context/AuthContextProvider';
import { useCategories } from '../context/CategoryContextProvider';
import Navbar from './Navbar';

const CreateCategory = () => {
	const { state, dispatch } = useAuth();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [nameErrors, setNameErrors] = useState([]);

	const { dispatch: categoryDispatch } = useCategories();
	const navigate = useNavigate();
	const [descriptionErrors, setDescriptionErrors] = useState([]);

	const handleCreateCategory = async () => {
		setLoading(true);
		const category = {
			name: name,
			description: description,
		};
		const { data, errors, status } = await createCategory(
			state.token,
			category,
			state.user
		);

		if (status === 401) {
			setLoading(false);
			dispatch({ type: 'LOGOUT' });
		} else if (!_.isEmpty(errors)) {
			setNameErrors(errors.name);
			setDescriptionErrors(errors.description);
			setLoading(false);
		} else {
			// SUCCESS
			categoryDispatch({ type: 'ADD_CATEGORY', payload: data });
			setLoading(false);
			navigate('/', { replace: true });
		}
	};
	return (
		<div className='container'>
			<Navbar />
			<div className='row justify-content-center'>
				<div className='col-md-6 col-sm-12 gy-5'>
					<div className='card d-flex flex-column gap-3'>
						<div className='d-flex justify-content-center mt-4'>
							<h1>Create Category</h1>
						</div>
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
											Category Name {error}
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
												Category Description{' '}
												{error}
											</span>
										</div>
									)
								)}
						</div>
						<div className='d-flex justify-content-center mb-3'>
							<button
								className='btn btn-primary'
								onClick={handleCreateCategory}
								disabled={loading}
							>
								Create
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCategory;
