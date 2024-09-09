import styles from './todoList.module.css';

export const TodoList = ({
	searchTodo,
	todos,
	isSortingEnabled,
	updateTodo,
	completedChange,
	changingTaskID,
	setUpdatingTodoText,
	setChangingTaskID,
	updatingTodoText,
	deleteTodo,
}) => {
	const filteredTodos = searchTodo
		? todos.filter((todo) => todo.text.toLowerCase().includes(searchTodo))
		: isSortingEnabled
			? [...todos].sort((a, b) => {
					if (a.text.toLowerCase() < b.text.toLowerCase()) {
						return -1;
					}
					if (a.text.toLowerCase() > b.text.toLowerCase()) {
						return 1;
					}
					return 0;
				})
			: todos;

	return (
		<div className={styles.todoList}>
			{filteredTodos.map(({ id, text, completed }) => (
				<div className={styles.todoListItem} key={id}>
					<form className={styles.todoForm} onSubmit={updateTodo}>
						<div className={styles.todoText}>
							<input
								className={styles.todoChecked}
								type="checkbox"
								checked={completed}
								onChange={({ target }) =>
									completedChange(id, target.checked)
								}
							/>
							<div className={styles.todo}>
								{changingTaskID === id ? (
									<input
										className={styles.todoItemInput}
										id={id}
										type="text"
										// value={updatingTodoText}
										onChange={({ target }) =>
											setUpdatingTodoText(target.value)
										}
									/>
								) : (
									<div className={styles.todoItem}>{text}</div>
								)}
							</div>
						</div>
						<button
							type="button"
							onClick={() => setChangingTaskID(id)}
							className={styles.editTodoButton}
						>
							Редактировать
						</button>
						<button
							type="submit"
							className={styles.saveTodoButton}
							disabled={!updatingTodoText}
						>
							Сохранить
						</button>
						<button
							type="button"
							onClick={() => deleteTodo(id)}
							className={styles.deleteTodoButton}
						>
							Удалить
						</button>
					</form>
				</div>
			))}
		</div>
	);
};
