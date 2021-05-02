import axios from 'axios';
import React from 'react'
import Errors from '../../components/Errors/Errors'

class HotelResultService {
    get() {
        return axios
            .get('http://localhost:8080/rest/rates')
            .then(response => response.data)
            .catch((error) => {
                <Errors errors={error}/>
            })
    }
}

const hotelResultService = new HotelResultService();

export default hotelResultService;
