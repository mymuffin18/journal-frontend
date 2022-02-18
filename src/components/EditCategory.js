import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editCategory, getCategory } from '../api/journal';
import { useAuth } from '../context/AuthContextProvider';
import { useCategories } from '../context/CategoryContextProvider';
import Navbar from './Navbar';

const EditCategory = () => {
	const { state, dispatch } = useAuth();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [nameErrors, setNameErrors] = useState([]);
	const { dispatch: categoryDispatch } = useCategories();
	const [descriptionErrors, setDescriptionErrors] = useState([]);
	const navigate = useNavigate();
	const params = useParams();
	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, status } = await getCategory(
				state.token,
				params.id
			);

			if (status === 401) {
				setLoading(false);
				dispatch({ type: 'LOGOUT' });
			} else if (status === 404) {
				setLoading(false);
				navigate('/', { replace: true });
			} else {
				setName(data.name);
				setDescription(data.description);
				setLoading(false);
			}
		})();

		return () => {
			setName('');
			setDescription('');
		};
	}, [params.id, state.token]);

	const handleEdit = async () => {
		setLoading(true);
		const category = {
			name: name,
			description: description,
		};
		const { data, errors, status } = await editCategory(
			state.token,
			category,
			params.id
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
			categoryDispatch({
				type: 'EDIT_CATEGORY',
				payload: {
					id: data.id,
					category: data,
				},
			});

			setLoading(false);
			navigate('/', { replace: true });
		}
		setLoading(false);
	};
	return (
		<div className='container'>
			<Navbar />
			<div className='row justify-content-center'>
				<div className='col-md-6 col-sm-12 gy-5'>
					<div className='card d-flex flex-column gap-3'>
						<div className='d-flex justify-content-center mt-4'>
							<h1>Edit Category</h1>
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
								onClick={handleEdit}
								disabled={loading}
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditCategory;
