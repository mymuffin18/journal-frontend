import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider';

function PrivateRoutes(props) {
	const { state } = useAuth();
	if (!state.token) {
		return <Navigate to='/login' />;
	}
	return props.children;
}

export default PrivateRoutes;
