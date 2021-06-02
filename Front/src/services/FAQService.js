import axios from 'axios';

const FAQ_API_BASE_URL = "http://localhost:9090/api/v1/faq";


class FAQService {

    getFAQ() {
        return axios.get(FAQ_API_BASE_URL);
    }

} export default new FAQService();
