import axios from 'axios';
import { API_URL } from './url';

// REGISTRATION
export const register = async (email, password) => {
	let errors = {};
	let data = {};
	try {
		const res = await axios.post(`${API_URL}/users`, {
			user: {
				email: email,
				password: password,
			},
		});

		data = {
			user: res.data,
			token: res.headers.authorization,
		};
	} catch (e) {
		errors = e.response.data.errors;
	}

	console.log(data);
	console.log(errors);

	return { data, errors };
};

// LOGIN
export const login = async (email, password) => {
	let data = {};
	let error = '';
	try {
		const res = await axios.post(`${API_URL}/users/sign_in`, {
			user: {
				email: email,
				password: password,
			},
		});
		data = {
			user: res.data.data,
			token: res.headers.authorization,
		};
	} catch (e) {
		error = e.response.data.error;
	}

	return { data, error };
};

// LOGOUT
export const logout = async (token) => {
	try {
		const res = await axios.delete(`${API_URL}users/sign_out`, {
			headers: {
				Authorization: token,
			},
		});
		console.log(res);
	} catch (e) {
		console.log(e.response);
	}
};
