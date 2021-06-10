import axios from 'axios';

const PROPERTY_PHOTO_API_BASE_URL = "http://localhost:9090/api/v1/files";

class PropertyPhotoService {

    getPhotoByPropertyId(id) {
        return axios.get(PROPERTY_PHOTO_API_BASE_URL + '/property/' + id);
    }

    upload(files) {
        const formData = new FormData();
        for (var index in files){
            formData.append("files", files[index])
        } 
        return axios.post(PROPERTY_PHOTO_API_BASE_URL, formData);
    }

}

export default new PropertyPhotoService();