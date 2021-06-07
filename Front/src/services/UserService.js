import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:9090/api/v1/users";

class UserService {
    getUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    getUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    updateUser(user, userId) {
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    checkAuthentication(data) {
        return axios.post(USER_API_BASE_URL + '/authentication', data);
    }

    createUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }
}

export default new UserService();
