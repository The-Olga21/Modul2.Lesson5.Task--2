import styles from './searchTodo.module.css';

export const SearchTodo = ({ searchTodo, setSearchTodo }) => {
	return (
		<input
			className={styles.searchTodo}
			type="text"
			value={searchTodo}
			placeholder="Поиск..."
			onChange={({ target }) => setSearchTodo(target.value)}
		/>
	);
};
