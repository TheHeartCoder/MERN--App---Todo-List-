import axios from 'axios';
import {
	TASK_CREATE_REQUEST,
	TASK_CREATE_SUCCESS,
	TASK_CREATE_FAIL,
	TASK_UPDATE_REQUEST,
	TASK_UPDATE_SUCCESS,
	TASK_UPDATE_FAIL,
	TASK_DETAILS_REQUEST,
	TASK_DETAILS_SUCCESS,
	TASK_DETAILS_FAIL,
} from '../constants/todoConstants.js';

export const createTask = (task, active) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TASK_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post('/api/task', { task, active }, config);

		dispatch({
			type: TASK_CREATE_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: TASK_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateTask = (id, task, active) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TASK_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/task/${id}`,
			{ task, active },
			config
		);

		dispatch({
			type: TASK_UPDATE_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: TASK_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getTasks = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: TASK_DETAILS_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get('/api/task/', config);

		dispatch({
			type: TASK_DETAILS_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: TASK_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteTask = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TASK_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/api/task/${id}`, config);

		dispatch({
			type: TASK_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: TASK_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
