import { useContext, useEffect, useState } from 'react';
import './card.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import {
  MessageSquareText,
  Bookmark,
  Bolt,
  BedDouble,
  Bath,
  MapPin,
} from 'lucide-react';

function Card({ item }) {
  const { currentUser, updateUser } = useContext(AuthContext);
  console.log(currentUser);
  const navigate = useNavigate();
  console.log(item.userId);

  const [saved, setSaved] = useState(
    currentUser?.savedPosts?.some((post) => post.postId === item.id) || false
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (currentUser && currentUser.id) {
        try {
          const res = await apiRequest.get('/users/' + currentUser.id);
          if (JSON.stringify(res.data) !== JSON.stringify(currentUser)) {
            updateUser(res.data);
          }
        } catch (err) {
          console.log('Failed to fetch current user:', err);
        }
      }
    };

    fetchCurrentUser();
  }, [updateUser, currentUser?.id]);

  const handleSave = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setSaved((prev) => !prev);

    try {
      await apiRequest.post('/users/save', { postId: item.id });

      // 获取最新的用户信息
      const updatedUserRes = await apiRequest.get('/users/' + currentUser.id);
      const updatedUser = updatedUserRes.data;
      updateUser(updatedUser);
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const handleChat = async () => {
    if (!currentUser) {
      navigate('/login');
    }

    try {
      await apiRequest.post('/chats', {
        receiverId: item.userId,
        postId: item.id,
      });
      navigate('/profile');
    } catch (err) {
      console.log(err);
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
          <MapPin size={20} />
          <span>{item.address}</span>
        </p>
        <p className='price'>${item.price}</p>

        <div className='bottom'>
          <div className='features'>
            <div className='feature'>
              <BedDouble size={18} strokeWidth={1} />
              <span>{item.bedroom} bedroom</span>
            </div>

            <div className='feature'>
              <Bath size={18} strokeWidth={1} />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className='icons'>
            <div className={saved ? 'icon saved' : 'icon'} onClick={handleSave}>
              <Bookmark strokeWidth={1} />
            </div>
            {currentUser ? (
              item.userId === currentUser.id ? (
                <Link to={`/${item.id}/edit`} item={item}>
                  <div className='icon'>
                    <Bolt strokeWidth={1} />
                  </div>
                </Link>
              ) : (
                <div className='icon' onClick={handleChat}>
                  <MessageSquareText strokeWidth={1} />
                </div>
              )
            ) : (
              <div className='icon' onClick={handleChat}>
                <MessageSquareText strokeWidth={1} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
