import { useState } from 'react';
import styles from './App.module.css';
import {
	useGetTodos,
	useAddTodo,
	useCompletedChange,
	useUpdateTodo,
	useDeleteTodo,
} from './hooks/useTodos.js';
import { AddNewTodo, Title, Errors, SearchTodo, SortTodos, TodoList } from './components';

export const App = () => {
	const [searchTodo, setSearchTodo] = useState('');
	const [isSortingEnabled, setIsSortingEnabled] = useState(false);

	const { todos, setTodos, isLoading, error } = useGetTodos();
	const { addTodo, newTodoText, setNewTodoText } = useAddTodo(setTodos);
	const { completedChange } = useCompletedChange(setTodos);
	const {
		updateTodo,
		changingTaskID,
		setChangingTaskID,
		updatingTodoText,
		setUpdatingTodoText,
	} = useUpdateTodo(setTodos);
	const { deleteTodo } = useDeleteTodo(setTodos);

	if (isLoading) {
		return <div className={styles.loader}></div>;
	}

	return (
		<div className={styles.app}>
			<AddNewTodo
				addTodo={addTodo}
				setNewTodoText={setNewTodoText}
				newTodoText={newTodoText}
			/>
			<Title />
			<SearchTodo searchTodo={searchTodo} setSearchTodo={setSearchTodo} />
			<SortTodos
				isSortingEnabled={isSortingEnabled}
				setIsSortingEnabled={setIsSortingEnabled}
			/>
			<TodoList
				searchTodo={searchTodo}
				todos={todos}
				isSortingEnabled={isSortingEnabled}
				updateTodo={updateTodo}
				completedChange={completedChange}
				changingTaskID={changingTaskID}
				setUpdatingTodoText={setUpdatingTodoText}
				setChangingTaskID={setChangingTaskID}
				updatingTodoText={updatingTodoText}
				deleteTodo={deleteTodo}
			/>
			<Errors error={error} />
		</div>
	);
};
