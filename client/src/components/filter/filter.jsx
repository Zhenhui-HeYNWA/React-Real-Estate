import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './filter.scss';

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
}

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState({
    type: searchParams.get('type') || '',
    city: capitalizeFirstLetter(searchParams.get('city')) || '',
    property: searchParams.get('property') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedroom: searchParams.get('bedroom') || '',
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'city') {
      value = capitalizeFirstLetter(value);
    }

    setQuery({
      ...query,
      [e.target.name]: value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className='filter'>
      <h1>
        Search result for <b>{query.city ? query.city : 'All'}</b>
      </h1>
      <div className='top'>
        <div className='item'>
          <label htmlFor='city'>Location</label>
          <input
            type='text'
            id='city'
            name='city'
            placeholder={`City:`}
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className='bottom'>
        <div className='item'>
          <label htmlFor='type'>Type</label>
          <select
            name='type'
            id='type'
            onChange={handleChange}
            defaultValue={query.type}>
            <option value='buy'>Buy</option>
            <option value='rent'>Rent</option>
          </select>
        </div>
        <div className='item'>
          <label htmlFor='property'>Property</label>
          <select
            name='property'
            id='property'
            onChange={handleChange}
            defaultValue={query.property}>
            <option value='apartment'>Apartment</option>
            <option value='house'>House</option>
            <option value='Condo'>Condo</option>
            <option value='Land'>Land</option>
          </select>
        </div>

        <div className='item'>
          <label htmlFor='minPrice'>Min Price</label>
          <input
            type='number'
            id='minPrice'
            name='minPrice'
            placeholder='any'
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>

        <div className='item'>
          <label htmlFor='MaxPrice'>Max Price</label>
          <input
            type='number'
            id='maxPrice'
            name='maxPrice'
            placeholder='any'
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>

        <div className='item'>
          <label htmlFor='bedroom'>Bedroom</label>
          <input
            type='number'
            id='bedroom'
            name='bedroom'
            placeholder='any'
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>

        <button onClick={handleFilter}>
          <img src='/search.png' alt='' />
        </button>
      </div>
    </div>
  );
}

export default Filter;
