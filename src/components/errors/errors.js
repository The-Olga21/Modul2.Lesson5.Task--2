import styles from './errors.module.css';

export const Errors = ({ error }) => {
	if (error) {
		return (
			<div className={styles.errorContainer}>
				<p>Ошибка загрузки списка задач:</p>
				<p>{error.message}</p>
			</div>
		);
	}
};
