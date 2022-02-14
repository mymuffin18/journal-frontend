import axios from 'axios';
import { API_URL } from './url';

export const getAllCategories = async (token) => {
	try {
		const res = axios.get(`${API_URL}/api/v1/categories`, {
			headers: {
				Authorization: token,
			},
		});

		console.log(res);
	} catch (e) {
		console.log(e);
	}
};

export const createCategory = async (token, category, user) => {
	try {
		const res = axios.post(
			`${API_URL}/api/v1/categories`,
			{
				name: category.name,
				description: category.description,
				user_id: user.id,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);

		console.log(res);
	} catch (e) {
		console.log(e);
	}
};

export const editCategory = async (token, category, id) => {
	try {
		const res = axios.put(
			`${API_URL}/api/v1/categories/${id}`,
			{
				name: category.name,
				description: category.description,
			},
			{ headers: { Authorization: token } }
		);

		console.log(res);
	} catch (e) {
		console.log(e);
	}
};

export const getCategory = async (token, id) => {
	try {
		const res = axios.get(`${API_URL}/api/v1/categories/${id}`, {
			headers: {
				Authorization: token,
			},
		});

		console.log(res);
	} catch (error) {
		console.log(error);
	}
};

export const deleteCategory = async (token, id) => {
	try {
		const res = axios.delete(`${API_URL}/api/v1/categories/${id}`, {
			headers: { Authorization: token },
		});
		console.log(res);
	} catch (e) {
		console.log(e);
	}
};

// CREATE TASK
export const createTask = async (token, task, category_id) => {
	try {
		const res = axios.post(
			`${API_URL}/api/v1/tasks/`,
			{
				name: task.name,
				description: task.description,
				date: task.date,
				category_id: category_id,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);

		console.log(res);
	} catch (e) {
		console.log(e);
	}
};

// GET TASK
export const getTask = async (token, id) => {
	try {
		const res = axios.get(`${API_URL}/api/v1/tasks/${id}`, {
			headers: {
				Authorization: token,
			},
		});
		console.log(res);
	} catch (e) {
		console.log(e);
	}
};

// EDIT TASK
export const editTask = async (token, task, id) => {
	try {
		const res = axios.put(
			`${API_URL}/api/v1/tasks/${id}`,
			{
				name: task.name,
				description: task.description,
				date: task.date,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
		console.log(res);
	} catch (e) {
		console.log(e);
	}
};

export const completeTask = async (token, id, completed) => {
	try {
		const res = axios.put(
			`${API_URL}/api/v1/tasks/${id}`,
			{
				completed: !completed,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);

		console.log(res);
	} catch (e) {
		console.log(e);
	}
};

export const deleteTask = async (token, id) => {
	try {
		const res = axios.delete(`${API_URL}/api/v1/tasks/${id}`, {
			headers: {
				Authorization: token,
			},
		});
		console.log(res);
	} catch (e) {
		console.log(e);
	}
};
