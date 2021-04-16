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

export const taskCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case TASK_CREATE_REQUEST:
			return { loading: true };
		case TASK_CREATE_SUCCESS:
			return { loading: false, createdTask: action.payload };
		case TASK_CREATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const taskUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case TASK_UPDATE_REQUEST:
			return { loading: true };
		case TASK_UPDATE_SUCCESS:
			return { loading: false, updatedTask: action.payload };
		case TASK_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const taskDetailsReducer = (state = { allTasks: [] }, action) => {
	switch (action.type) {
		case TASK_DETAILS_REQUEST:
			return { ...state, loading: true };
		case TASK_DETAILS_SUCCESS:
			return { loading: false, allTasks: action.payload };
		case TASK_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
