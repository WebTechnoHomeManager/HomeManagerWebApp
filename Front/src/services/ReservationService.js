import axios from 'axios';

const RESERVATION_API_BASE_URL = "http://localhost:9090/api/v1/reservations";

class ReservationService {

    getReservations(){
        return axios.get(RESERVATION_API_BASE_URL);
    }

    getReservationsBy(data){
        return axios.post(RESERVATION_API_BASE_URL + '/search', data);
    }
}

export default new ReservationService()