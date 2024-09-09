import styles from './addNewTodo.module.css';

export const AddNewTodo = ({ addTodo, newTodoText, setNewTodoText }) => {
	return (
		<form className={styles.todoForm} onSubmit={addTodo}>
			<div>
				<input
					type="text"
					placeholder="Создать новую задачу..."
					onChange={({ target }) => setNewTodoText(target.value)}
				/>
				<button
					className={styles.addButton}
					type="submit"
					disabled={!newTodoText}
				>
					Добавить задачу
				</button>
			</div>
		</form>
	);
};
