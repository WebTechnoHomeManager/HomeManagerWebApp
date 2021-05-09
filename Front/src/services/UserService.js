import axios from 'axios';

const PROPERTY_API_BASE_URL = "http://localhost:9090/users";

class UserService {
    getUsers() {
        return axios.get(PROPERTY_API_BASE_URL);
    }
}

export default new UserService();
