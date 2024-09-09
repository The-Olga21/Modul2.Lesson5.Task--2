import { useState, useEffect } from 'react';
import { todosEndpoint } from '../api/todos.api';
import { App } from '../App';

export const useGetTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const getTodos = () => {
		fetch(todosEndpoint)
			.then((response) => response.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.catch((error) => {
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		getTodos();
	}, []);

	return { todos, setTodos, isLoading, error };
};

export const useAddTodo = (setTodos) => {
	const [newTodoText, setNewTodoText] = useState('');

	const addTodo = (event) => {
		event.preventDefault();
		fetch(todosEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				text: newTodoText,
				completed: false,
			}),
		})
			.then((response) => response.json())
			.then((newTodo) => {
				setTodos((prevTodos) => [...prevTodos, newTodo]);
			});
	};
	return { addTodo, newTodoText, setNewTodoText };
};

export const useCompletedChange = (setTodos) => {
	const completedChange = (id, target) => {
		fetch(todosEndpoint + `/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: target,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((updatedTodo) => {
				setTodos((prevTodos) =>
					prevTodos.map((todo) =>
						todo.id === updatedTodo.id ? updatedTodo : todo,
					),
				);
			});
	};
	return { completedChange };
};

export const useUpdateTodo = (setTodos) => {
	const [changingTaskID, setChangingTaskID] = useState('');
	const [updatingTodoText, setUpdatingTodoText] = useState('');

	const updateTodo = (event) => {
		event.preventDefault();

		fetch(todosEndpoint + `/${changingTaskID}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				text: updatingTodoText,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((updatedTodo) => {
				setTodos((prevTodos) =>
					prevTodos.map((todo) =>
						todo.id === updatedTodo.id ? updatedTodo : todo,
					),
				);
			});
	};
	return {
		updateTodo,
		changingTaskID,
		setChangingTaskID,
		updatingTodoText,
		setUpdatingTodoText,
	};
};

export const useDeleteTodo = (setTodos) => {
	const deleteTodo = (id) => {
		fetch(todosEndpoint + `/${id}`, {
			method: 'DELETE',
		}).then(() =>
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)),
		);
	};
	return { deleteTodo };
};
