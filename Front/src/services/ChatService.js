import axios from 'axios';

const MESSAGING_API_BASE_URL = "http://localhost:9090/api/v1/chat";

class ChatService {

    sendMessage(data) {
        return axios.post(MESSAGING_API_BASE_URL + '/add', data);
    }

    getMessagesBetweenTwoUsers(id1, id2) {
        return axios.get(MESSAGING_API_BASE_URL + '/' + id1 + '/' + id2);
    }

    /*createProperty(property) {
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
    }*/
}

export default new ChatService()
