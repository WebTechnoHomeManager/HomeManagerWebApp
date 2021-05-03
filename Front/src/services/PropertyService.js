import axios from 'axios';

const PROPERTY_API_BASE_URL = "http://localhost:9090/api/v1/properties";

class PropertyService {

    getProperties(){
        return axios.get(PROPERTY_API_BASE_URL);
    }

    getPropertiesBy(data){
        return axios.post(PROPERTY_API_BASE_URL + '/search', data);
    }

    /*createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }*/
}

export default new PropertyService()