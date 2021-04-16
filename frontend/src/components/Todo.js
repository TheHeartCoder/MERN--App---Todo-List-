import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
	createTask,
	updateTask,
	getTasks,
	deleteTask,
} from '../actions/todoActions';
import Loader from '../components/Loader';
import axios from 'axios';

const Todo = ({ history }) => {
	const dispatch = useDispatch();

	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState('');
	const [taskId, setTaskId] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const taskDetails = useSelector((state) => state.taskDetails);
	const { loading, allTasks } = taskDetails;

	// if (createdTask) {
	// 	let newTasks = [...tasks, createdTask];
	// 	setTasks(newTasks);
	// }

	useEffect(() => {
		if (!userInfo) {
			history.push('/auth');
		}
		if (allTasks.length === 0) {
			dispatch(getTasks());
		} else {
			console.log('he');
			setTasks(allTasks);
		}
	}, [history, userInfo, allTasks, dispatch]);

	const submitHandler = async (e) => {
		e.preventDefault();

		if (taskId) {
			// update the old task
			if (task.trim()) {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`,
					},
				};

				const { data } = await axios.put(
					`/api/task/${taskId}`,
					{ task: task, active: true },
					config
				);

				let updatedTasks = tasks.map((t) => {
					if (t._id === taskId) {
						t.task = data.data.task;
						t.id = data.data._id;
						t.active = true;
					}
					return t;
				});

				setTasks(updatedTasks);
				setTask('');
				setTaskId('');
			}
		} else {
			// create new task
			if (task.trim()) {
				setTask('');
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`,
					},
				};

				const { data } = await axios.post(
					'/api/task',
					{ task: task, active: true },
					config
				);
				let newTasks = [...tasks, data.data];
				setTasks(newTasks);
			}
		}
	};

	const editHandler = (e, id, value) => {
		e.preventDefault();
		setTaskId(id);
		setTask(value);
	};

	const delHandler = async (e, id) => {
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/api/task/${id}`, config);
		if (data.success) {
			const filteredTasks = tasks.filter((x) => x._id !== id);
			setTasks(filteredTasks);
		}
	};

	const completHandler = async (task, taskId, active) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/task/${taskId}`,
			{ task: task, active: !active },
			config
		);
		if (data.success) {
			let completedTasks = tasks.map((task) => {
				if (task._id === taskId) {
					console.log(task._id);
					task.active = !task.active;
				}
				return task;
			});
			setTasks(completedTasks);
		}
	};

	return (
		<>
			<Container>
				{loading ? (
					<Loader />
				) : (
					<Row style={{ paddingTop: '40px' }}>
						<Col md='12'>
							<Card>
								<Card.Header className='cardHeader'>
									To-Do List App With React
								</Card.Header>
								<Card.Body>
									<form onSubmit={submitHandler}>
										<div className='input-group mb-3'>
											<input
												type='text'
												className='form-control'
												placeholder='New Task ......'
												aria-label='New Task'
												aria-describedby='button-addon2'
												task-id={taskId}
												value={task}
												onChange={(e) => setTask(e.target.value)}
											/>
											<button
												className='btn btn-primary'
												type='submit'
												style={{ backgroundColor: '#ca4c03' }}>
												{taskId ? 'Update Task' : 'Add Task'}
											</button>
										</div>
									</form>
									<div className='todo-list'>
										{tasks.length < 1 && (
											<div className='noTask'>No Task Found</div>
										)}
										{tasks.map((task) => (
											<div className='todo-item' key={task._id}>
												<div className='checker'>
													<span className=''>
														<input
															type='checkbox'
															className='checkbox'
															checked={task.active ? false : true}
															onChange={(e) =>
																completHandler(task.task, task._id, task.active)
															}
														/>
													</span>
												</div>
												<span className='task'>
													{task.active ? (
														task.task
													) : (
														<strike>{task.task}</strike>
													)}
												</span>

												<a
													href='/#'
													style={{ float: 'right' }}
													onClick={(e) => delHandler(e, task._id, task.task)}>
													<i className='fas fa-trash-alt'></i>
												</a>
												{task.active && (
													<a
														href='/#'
														style={{ float: 'right' }}
														onClick={(e) =>
															editHandler(e, task._id, task.task)
														}>
														<i className='fas fa-edit'></i>
													</a>
												)}
											</div>
										))}
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				)}
			</Container>
		</>
	);
};

export default Todo;
