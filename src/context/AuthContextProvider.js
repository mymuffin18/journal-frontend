import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
	user: {},
	token: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				user: action.payload.user,
				token: action.payload.token,
			};
		case 'LOGOUT':
			return initialState;
		default:
			return initialState;
	}
};

const AuthContext = createContext();

function AuthContextProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState, () => {
		const data = localStorage.getItem('auth');

		return data ? JSON.parse(data) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('auth', JSON.stringify(state));
	}, [state]);
	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthContextProvider;
