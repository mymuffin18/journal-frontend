import axios from 'axios';
import { API_URL } from './url';

// REGISTRATION
export const register = async (email, password) => {
	try {
		const res = await axios.post(`${API_URL}/users`, {
			user: {
				email: email,
				password: password,
			},
		});

		console.log(res);
	} catch (e) {
		console.log(e.response);
	}
};

// LOGIN
export const login = async (email, password) => {
	try {
		const res = await axios.post(`${API_URL}/sign_in`, {
			user: {
				email: email,
				password: password,
			},
		});

		console.log(res);
	} catch (e) {
		console.log(e.response);
	}
};

// LOGOUT
export const logout = async (token) => {
	try {
		const res = await axios.delete(`${API_URL}/sign_out`, {
			headers: {
				Authorization: token,
			},
		});
		console.log(res);
	} catch (e) {
		console.lot(e.response);
	}
};
