import axios from 'axios'

const USER_API_URL = `http://localhost:8080/api/`

class CourseDataService {

	getAllUsers() {
		return axios.get(`${USER_API_URL}/users`);
	}

	deleteUser(id) {
		return axios.delete(`${USER_API_URL}/user/${id}`);
	}

	getUser(id) {
		return axios.get(`${USER_API_URL}/user/${id}`);
	}

	updateUser(id, user) {
		return axios.put(`${USER_API_URL}/user/${id}`, user)
	}

	createUser(user) {
		return axios.post(`${USER_API_URL}/user/`, user)
	}
}

export default new CourseDataService()
