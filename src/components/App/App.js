import React, { useState, useEffect } from 'react';
import './App.style.scss'

import hotelResultService from '../../services/hotel-result/hotel-result.service';
import HotelList from '../HotelList/HotelList'
import Errors from '../Errors/Errors'

const App = () => {
    const [hotels, setHotels] = useState([]);
    const [errors, setErrors] = useState()

    useEffect(() => {
        hotelResultService.get().then(response => {
            setHotels(response.results.hotels)
        })
        .catch(error => {
            setErrors(error.message)
        })
    }, []);

    return (
        <div className="app-container">
            <div className="content">
                <div>
                    <div className="filters">
                        Hotel name
                        <input type="text" className="input" maxLength={1}/>
                        Price
                        <select name="" className="select">
                            <option value="">Recommended</option>
                            <option value="">Price low-to-high</option>
                            <option value="">Price high-to-low</option>
                        </select>
                        <button className="button">Reset</button>
                    </div>
                </div>
            {errors ? <Errors errors={errors} /> : <HotelList hotels={hotels} />}
            
            </div>
        </div>
    )
}

export default App;
