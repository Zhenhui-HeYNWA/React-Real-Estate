import { useContext, useEffect, useState } from 'react';
import './card.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

function Card({ item }) {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const [saved, setSaved] = useState();

  // useEffect(()=>{
  //   const fetchSavedPosts =async()=>{
  //     if(currentUser){
  //       try{
  //         const res = await apiRequest.get()
  //       }
  //     }
  //   }
  // })

  const handleSave = async () => {
    if (!currentUser) {
      navigator('/login');
    }
    setSaved((prev) => !prev);
    try {
      const res = await apiRequest.post('/users/save', { postId: item.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className='card'>
      <Link to={`/${item.id}`} className='imageContainer'>
        <img src={item.images[0]} alt='' />
      </Link>
      <div className='textContainer'>
        <h2 className='title'>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className='address'>
          <img src='/pin.png' alt='' />
          <span>{item.address}</span>
        </p>
        <p className='price'>${item.price}</p>

        <div className='bottom'>
          <div className='features'>
            <div className='feature'>
              <img src='/bed.png' alt='' />
              <span>{item.bedroom} bedroom</span>
            </div>

            <div className='feature'>
              <img src='/bath.png' alt='' />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className='icons'>
            <div
              className={saved ? ' icon saved' : 'icon'}
              onClick={handleSave}>
              <img src='/save.png' alt='' />
            </div>

            {item.userId === currentUser.id ? (
              <Link to={`/${item.id}/edit`} item={item}>
                <div className='icon'>
                  <p>Edit</p>
                </div>
              </Link>
            ) : (
              <div className='icon'>
                <img src='/chat.png' alt='' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
