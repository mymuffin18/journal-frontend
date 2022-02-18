import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
	categories: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'GET_ALL_CATEGORIES':
			return {
				categories: action.payload,
			};
		case 'ADD_CATEGORY':
			return {
				categories: [...state.categories, action.payload],
			};
		case 'EDIT_CATEGORY':
			return {
				categories: state.categories.map((category) => {
					return category.id === action.payload.id
						? action.payload.category
						: category;
				}),
			};
		case 'DELETE_CATEGORY':
			return {
				categories: state.categories.filter(
					(category) => category.id !== action.payload
				),
			};
		default:
			return {
				initialState,
			};
	}
};
const CategoryContext = createContext();
const CategoryContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<CategoryContext.Provider value={{ state, dispatch }}>
			{props.children}
		</CategoryContext.Provider>
	);
};

export const useCategories = () => {
	return useContext(CategoryContext);
};

export default CategoryContextProvider;
