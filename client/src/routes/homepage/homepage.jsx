import { useContext } from 'react';
import SearchBar from '../../components/searchBar/searchBar';
import './homepage.scss';
import { AuthContext } from '../../context/AuthContext';

function Homepage() {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  
  

  return (
    <div className='homePage'>
      <div className='textContainer'>
        <div className='wrapper'>
          <h1 className='title'>Find Real Estate & Get Your Dream Place </h1>
          <p>
            Lore ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          <SearchBar />
          <div className='boxes'>
            <div className='box'>
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className='box'>
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className='box'>
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='imgContainer'>
        <img src='/bg.png' alt='' />
      </div>
    </div>
  );
}

export default Homepage;
