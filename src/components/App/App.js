import React, { useState, useEffect } from 'react';
import './App.style.scss'

import hotelResultService from '../../services/hotel-result/hotel-result.service';
import HotelList from '../HotelList/HotelList'
import Errors from '../Errors/Errors'

const App = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([])
    const [errors, setErrors] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if(hotels && searchInput){
            let result = []
            if(filteredHotels.length){
                result =  filteredHotels.filter(hotel => hotel.hotelStaticContent.name.toLowerCase().includes(searchInput.toLowerCase()))
            } else {
                result = hotels.filter(hotel => hotel.hotelStaticContent.name.toLowerCase().includes(searchInput.toLowerCase()))
            }
            setFilteredHotels(result)
        } else {
            hotelResultService.get().then(response => {
                setHotels(response.results.hotels)
            })
            .catch(error => {
                setErrors(error.message)
            })
        }

    }, [searchInput]);

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value)
    }

    return (
        <div className="app-container">
            <div className="content">
                <div>
                    <div className="filters">
                        Hotel name
                        <input 
                            type="text"
                            placeholder="Hotel Name"
                            value={searchInput}
                            onChange={handleSearchChange}
                            className="input" />
                        Price
                        <select name="" className="select" >
                            <option value="recommended">Recommended</option>
                            <option value="low-to-high">Price low-to-high</option>
                            <option value="high-to-low">Price high-to-low</option>
                        </select>
                        <button className="button">Reset</button>
                    </div>
                </div>
            {errors ? <Errors errors={errors} /> : 
                filteredHotels.length ? <HotelList hotels={filteredHotels} />: 
                <HotelList hotels={hotels} />}
            
            </div>
        </div>
    )
}

export default App;
