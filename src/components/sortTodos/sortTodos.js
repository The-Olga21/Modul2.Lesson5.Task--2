import styles from './sortTodos.module.css';

export const SortTodos = ({ isSortingEnabled, setIsSortingEnabled }) => {
	return (
		<input
			className={styles.sortingTodos}
			type="checkbox"
			checked={isSortingEnabled}
			onChange={() => setIsSortingEnabled(!isSortingEnabled)}
		/>
	);
};
