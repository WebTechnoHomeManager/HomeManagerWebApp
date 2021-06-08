import axios from 'axios';

class AddressService {
    getAddress(address) {
        return axios.get(
            "https://api.tomtom.com/search/2/geocode/"
            + address + ".json"
            + "?key=OFQoEQngVk81rGb5EzU42twzmYxDh9uT"
            + "&language=en-US"
            + "&typeahead=true"
            + "&limit=20"
        );
    }
}

export default new AddressService();
