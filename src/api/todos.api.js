import config from '../config.json';

export const todosEndpoint = `${config.API_URL}/todos`;

export const todosAPI = {
	fetchTodos: async () => {
		const response = await fetch(todosEndpoint);
		return await response.json();
	},
};
