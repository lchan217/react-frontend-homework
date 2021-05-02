import React, { useState, useEffect } from 'react';
import './App.style.scss'

import hotelResultService from '../../services/hotel-result/hotel-result.service';
import HotelList from '../HotelList/HotelList'
import Errors from '../Errors/Errors'
import { Dropdown } from 'semantic-ui-react'

const App = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([])
    const [errors, setErrors] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [priceSortInput, setPriceSort] = useState('')

    useEffect(() => {
        if(searchInput === "" && priceSortInput === ""){
            hotelResultService.get().then(response => {
                setHotels(response.results.hotels)
            })
            .catch(error => {
                setErrors(error.message)
            })
        } else {
            let result = [...hotels]
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

            if(result.length){
                setFilteredHotels(result)
                setErrors('')
            } else {
                setErrors('No results found')
            }
           
        }
    }, [searchInput, priceSortInput]);

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value)
    }

    const handlePriceSort = (event, data) => {
        setPriceSort(data.value)
    }

    const handleReset = (event) => {
        setSearchInput("")
        setPriceSort("")
        setFilteredHotels([])
        setErrors('')
    }

    const priceOptions = [
        {
            text: 'Recommended',
            value: 'recommended',
        },
        {
            text: 'Price low-to-high',
            value: 'low-to-high',
        },
        {
            text: 'Price high-to-low',
            value: 'high-to-low',
        }
    ]

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
                        <Dropdown 
                            name=""
                            selection
                            className='select-dropdown'
                            fluid
                            placeholder="Recommended"
                            onChange={handlePriceSort}
                            value={priceSortInput}
                            options={priceOptions}
                        />
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



