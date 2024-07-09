import Slider from '../../components/slider/slider.jsx';

import './singlePage.scss';
import Map from '../../components/map/map.jsx';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import apiRequest from '../../lib/apiRequest.js';
import {
  Bath,
  BedDouble,
  Bolt,
  Bookmark,
  Bus,
  LandPlot,
  MapPin,
  MessageSquareText,
  PawPrint,
  Receipt,
  School,
  Store,
  Wrench,
} from 'lucide-react';

function SinglePage() {
  const post = useLoaderData();
  const { currentUser, updateUser } = useContext(AuthContext);
  console.log(post);

  const [saved, setSaved] = useState(post.isSaved);
  const [poster, setPoster] = useState(post.userId === currentUser.id);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {};
  }, []);

  const handleChat = async () => {
    if (!currentUser) {
      navigate('/login');
    }

    try {
      await apiRequest.post('/chats', {
        receiverId: post.userId,
        postId: post.id,
      });
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    if (!currentUser) {
      navigate('/login');
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post('/users/save', { postId: post.id });
      const updatedUserRes = await apiRequest.get('/users/' + currentUser.id);
      const updatedUser = updatedUserRes.data;
      updateUser(updatedUser);
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };
  const handleEdit = () => {};

  return (
    <div className='singlePage'>
      <div className='details'>
        <div className='wrapper'>
          <Slider images={post.images} />
          <div className='info'>
            <div className='top'>
              <div className='post'>
                <h1>{post.title}</h1>
                <div className='address'>
                  <MapPin />
                  <span>{post.address}</span>
                  <span>{post.city}</span>
                </div>
                <div className='price'>$ {post.price}</div>
              </div>
              <div className='user'>
                <img src={post.user.avatar} alt='' />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className='bottom'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}></div>
          </div>
        </div>
      </div>
      <div className='features'>
        <div className='wrapper'>
          <p className='title'>General</p>
          <div className='listVertical'>
            <div className='feature'>
              <Wrench strokeWidth={1} />
              <div className='featureText'>
                <span>Utilities</span>
                {post.postDetail.utilities === 'owner' ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className='feature'>
              <PawPrint strokeWidth={1} />
              <div className='featureText'>
                <span>Pet Policy</span>
                {post.postDetail.pet === 'allowed' ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Not Allowed</p>
                )}
              </div>
            </div>
            <div className='feature'>
              <Receipt strokeWidth={1} />
              <div className='featureText'>
                <span>Income Policy </span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>

          <p className='title'>Sizes</p>
          <div className='sizes'>
            <div className='size'>
              <LandPlot strokeWidth={1} />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className='size'>
              <BedDouble strokeWidth={1} />
              <span>{post.bedroom} bed</span>
            </div>
            <div className='size'>
              <Bath strokeWidth={1} />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className='title'>Nearby Places</p>
          <div className='listHorizontal'>
            <div className='feature'>
              <School strokeWidth={1} />
              <div className='featureText'>
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? (post.postDetail.school / 1000).toFixed(2) + 'km '
                    : post.postDetail.school + 'm '}
                  away
                </p>
              </div>
            </div>
            <div className='feature'>
              <Bus strokeWidth={1} />
              <div className='featureText'>
                <span>Bus Stop</span>
                <p>
                  {post.postDetail.bus > 999
                    ? (post.postDetail.bus / 1000).toFixed(2) + 'km '
                    : post.postDetail.bus + 'm '}
                  away
                </p>
              </div>
            </div>
            <div className='feature'>
              <Store strokeWidth={1} />
              <div className='featureText'>
                <span>Restaurant</span>
                <p>
                  {post.postDetail.restaurant > 999
                    ? (post.postDetail.restaurant / 1000).toFixed(2) + 'km '
                    : post.postDetail.restaurant + 'm '}
                  away
                </p>
              </div>
            </div>
          </div>

          <p className='title'>Location</p>
          <div className='mapContainer'>
            <Map items={[post]} />
          </div>
          <div className='buttons'>
            {poster ? (
              <Link to={`/${post.id}/edit`}>
                <button>
                  <Bolt strokeWidth={1} />
                  Edit this post
                </button>
              </Link>
            ) : (
              <button onClick={handleChat}>
                <MessageSquareText strokeWidth={1} />
                Send a Message
              </button>
            )}

            <button onClick={handleSave} className={saved ? 'saved' : ''}>
              <Bookmark strokeWidth={1} />
              {saved ? 'Post is saved' : 'Save the place'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
