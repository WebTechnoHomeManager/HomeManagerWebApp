import axios from 'axios';

const FAQ_API_BASE_URL = "http://localhost:9090/api/v1/faq";


class FAQService {

    getFAQ() {
        return axios.get(FAQ_API_BASE_URL);
    }

    getFAQById(faqId) {
        return axios.get(FAQ_API_BASE_URL + '/' + faqId);
    }

    updateFAQ(faq, faqId) {
        return axios.put(FAQ_API_BASE_URL + '/' + faqId, faq);
    }

    deleteFAQ(faqId) {
        return axios.delete(FAQ_API_BASE_URL + '/' + faqId);
    }

    createFAQ(faq) {
        return axios.post(FAQ_API_BASE_URL, faq);
    }

} export default new FAQService();
