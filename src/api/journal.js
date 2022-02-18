import axios from 'axios';
import { API_URL } from './url';

export const getAllCategories = async (token) => {
	let data = [];
	let status;
	try {
		const res = await axios.get(`${API_URL}/api/v1/categories`, {
			headers: {
				Authorization: token,
			},
		});
		data = res.data;
	} catch (e) {
		status = e.response.status;
	}

	return { data, status };
};

export const createCategory = async (token, category, user) => {
	let data = {};
	let errors = {};
	let status;
	try {
		const res = await axios.post(
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
		data = res.data;
	} catch (e) {
		status = e.response.status;
		errors = e.response.data;
	}

	return { data, errors, status };
};

export const editCategory = async (token, category, id) => {
	let data = {};
	let errors = {};
	let status;
	try {
		const res = await axios.put(
			`${API_URL}/api/v1/categories/${id}`,
			{
				name: category.name,
				description: category.description,
			},
			{ headers: { Authorization: token } }
		);
		data = res.data;
	} catch (e) {
		status = e.response.status;
		errors = e.response.data;
	}

	return { data, errors, status };
};

export const getCategory = async (token, id) => {
	let data = {};
	let status;
	try {
		const res = await axios.get(`${API_URL}/api/v1/categories/${id}`, {
			headers: {
				Authorization: token,
			},
		});

		data = res.data;
	} catch (error) {
		status = error.response.status;
	}

	return { data, status };
};

export const deleteCategory = async (token, id) => {
	let status;
	try {
		const res = await axios.delete(`${API_URL}/api/v1/categories/${id}`, {
			headers: { Authorization: token },
		});
		status = res.status;
	} catch (e) {
		status = e.response.status;
	}

	return status;
};

// CREATE TASK
export const createTask = async (token, task, category_id) => {
	let data = {};
	let errors = {};
	let status;
	try {
		const res = await axios.post(
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

		data = res.data;
	} catch (e) {
		status = e.response.status;
		errors = e.response.data;
	}

	return { data, errors, status };
};

// GET TASK
export const getTask = async (token, id) => {
	let data = {};
	let status;
	try {
		const res = await axios.get(`${API_URL}/api/v1/tasks/${id}`, {
			headers: {
				Authorization: token,
			},
		});
		data = res.data;
	} catch (e) {
		status = e.response.status;
	}

	return { data, status };
};

// EDIT TASK
export const editTask = async (token, task, id) => {
	let data = {};
	let errors = {};
	let status;
	try {
		const res = await axios.put(
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
		data = res.data;
	} catch (e) {
		errors = e.response.data;
		status = e.response.status;
	}

	return { data, errors, status };
};

export const toggleCompleteTask = async (token, id, completed) => {
	let data = {};
	let status;
	try {
		const res = await axios.put(
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

		data = res.data;
	} catch (e) {
		status = e.response.status;
	}

	return { data, status };
};

export const deleteTask = async (token, id) => {
	let status;
	try {
		const res = await axios.delete(`${API_URL}/api/v1/tasks/${id}`, {
			headers: {
				Authorization: token,
			},
		});
		status = res.status;
	} catch (e) {
		status = e.response.status;
	}

	return status;
};

export const getAllTasks = async (token) => {
	let data = [];
	let status;
	try {
		const res = await axios.get(`${API_URL}/api/v1/tasks`, {
			headers: {
				Authorization: token,
			},
		});
		data = res.data;
	} catch (e) {
		status = e.response.status;
	}

	return { data, status };
};
