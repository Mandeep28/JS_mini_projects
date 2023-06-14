import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import {geoDbOptions , GEO_API_URL} from '../../api'

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData)=>{
        setSearch(searchData);
        onSearchChange(searchData)

    }


    const loadOptions = async(inputValue) =>{
      try {
        const response = await fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoDbOptions);
        const result = await response.json();
        console.log(result)
        return {
          options : result.data.map((city)=>{
                    return {
                      value : `${city.latitude} ${city.longitude}`,
                      label : `${city.name}, ${city.countryCode}`,
                      ...city
                    }
          })
        }
      } catch (error) {
        console.error(error);
      }

    }







  return (
    <div>
      <AsyncPaginate
      placeholder="Search the city"
      debounceTimeout={1000}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      />
    </div>
  )
}

export default Search
