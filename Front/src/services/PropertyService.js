import axios from 'axios';

const PROPERTY_API_BASE_URL = "http://localhost:9090/api/v1/properties";

class PropertyService {

    getProperties() {
        return axios.get(PROPERTY_API_BASE_URL);
    }

    getPropertiesBy(data) {
        return axios.post(PROPERTY_API_BASE_URL + '/search', data);
    }

    createProperty(property) {
        return axios.post(PROPERTY_API_BASE_URL, property);
    }

    getPropertyById(id) {
        return axios.get(PROPERTY_API_BASE_URL + '/' + id);
    }

    getPropertiesByOwnerId(id) {
        return axios.get(PROPERTY_API_BASE_URL + '/owner/' + id);
    }

    updateProperty(property, propertyId) {
        return axios.put(PROPERTY_API_BASE_URL + '/' + propertyId, property);
    }

    deleteProperty(propertyId) {
        return axios.delete(PROPERTY_API_BASE_URL + '/' + propertyId);
    }

    getFourMostRecentProperties(){
        return axios.get(PROPERTY_API_BASE_URL + '/recent');
    }
}

export default new PropertyService()
