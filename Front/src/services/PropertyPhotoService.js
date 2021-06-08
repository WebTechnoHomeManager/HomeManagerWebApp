import axios from 'axios';

const PROPERTY_PHOTO_API_BASE_URL = "http://localhost:9090/api/v1/files";

class PropertyPhotoService {

  getFiles() {
    return axios.get(PROPERTY_PHOTO_API_BASE_URL);
  }

  upload(file) {
    let formData = new FormData();

    formData.append("file", file);
    return axios.post(PROPERTY_PHOTO_API_BASE_URL, formData);
  }

}

export default new PropertyPhotoService();