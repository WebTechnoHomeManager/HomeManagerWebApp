import axios from 'axios';

const PROPERTYTYPE_API_BASE_URL = "http://localhost:9090/api/v1/types";

class TypeService {

    getPropertyTypes() {
        return axios.get(PROPERTYTYPE_API_BASE_URL);
    }

}
export default new TypeService()
