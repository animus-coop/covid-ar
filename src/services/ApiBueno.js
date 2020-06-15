import { API_URL } from '../constants/configuration';

export async function get(uri = 'todos') {
	const res = await fetch(`${API_URL}/${uri}`);
	const response = await res.json();
	return response;
}
