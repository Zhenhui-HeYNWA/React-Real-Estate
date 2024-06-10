import { useState } from 'react';
import './searchBar.scss';
import { Link } from 'react-router-dom';

const types = ['buy', 'rent'];

function SearchBar() {
  const [query, setQuery] = useState({
    type: 'buy',
    city: '',
    minPrice: 0,
    maxPrice: 0,
  });
  const switchType = (value) => {
    setQuery((prev) => ({ ...prev, type: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({
      ...prev,

      [name]:
        name === 'city'
          ? (
              value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            ).trim()
          : '',
    }));
  };
  const setLink = `/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`;
  // TODO: Trans the first letter of the City name to Uppercase
  return (
    <div className='searchBar'>
      <div className='type'>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? 'active' : ''}>
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type='text'
          name='city'
          placeholder='City '
          onChange={handleChange}
          defaultValue={undefined}
        />
        <input
          type='number'
          name='minPrice'
          min={0}
          max={10000000}
          placeholder='Min Price'
          onChange={handleChange}
        />
        <input
          type='number'
          name='maxPrice'
          min={0}
          max={10000000}
          placeholder='Max Price'
          onChange={handleChange}
        />
        <Link to={setLink}>
          <button>
            <img src='/search.png' alt='' />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
