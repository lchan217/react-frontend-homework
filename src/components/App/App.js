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
    const [priceSortInput, setPriceSort] = useState('')

    useEffect(() => {
        if(searchInput === "" && priceSortInput === "" ){
            hotelResultService.get().then(response => {
                setHotels(response.results.hotels)
            })
            .catch(error => {
                setErrors(error.message)
            })
        } else {
            let result = []
            if(searchInput){
                result = hotels.filter(hotel => hotel.hotelStaticContent.name.toLowerCase().includes(searchInput.toLowerCase()))
            }
            
            if(priceSortInput){                
                if(priceSortInput === "low-to-high"){
                    result.sort((a,b) => a.lowestAveragePrice.amount - b.lowestAveragePrice.amount)
                    
                } else if (priceSortInput === "high-to-low"){
                    result.sort((a,b) => b.lowestAveragePrice.amount - a.lowestAveragePrice.amount)
                }
            }
            setFilteredHotels(result)
        }
    }, [searchInput, priceSortInput]);

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value)
    }

    const handlePriceSort = (event) => {
        setPriceSort(event.target.value)
    }

    const handleReset = (event) => {
        setSearchInput("")
        setPriceSort("")
        setFilteredHotels([])
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
                        <select name="" 
                            className="select"
                            onChange={handlePriceSort}
                            value={priceSortInput}
                            >

                            <option value="recommended">Recommended</option>
                            <option value="low-to-high">Price low-to-high</option>
                            <option value="high-to-low">Price high-to-low</option>
                        </select>
                        <button className="button" onClick={handleReset}>Reset</button>
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


