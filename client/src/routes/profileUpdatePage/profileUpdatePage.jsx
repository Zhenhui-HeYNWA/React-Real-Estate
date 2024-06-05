import { useContext } from 'react';
import './profileUpdatePage.scss';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import apiRequest from '../../lib/apiRequest.js';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/uploadWidget.jsx';

function ProfileUpdatePage() {
  const [error, setError] = useState('');
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar,
      });
      updateUser(res.data);
      navigate('/profile');
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  return (
    <div className='profileUpdatePage'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>

          <div className='item'>
            <label htmlFor='username'>Username</label>

            <input
              id='username'
              type='text'
              name='username'
              defaultValue={currentUser.username}
            />
          </div>
          <div className='item'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              defaultValue={currentUser.email}
            />
          </div>
          <div className='item'>
            <label htmlFor='password'>Password</label>
            <input id='password' name='password' type='text' />
          </div>
          <button>Update</button>
          <span>{error && <span>error</span>}</span>
        </form>
      </div>
      <div className='sideContainer'>
        <img src={avatar || '/noavatar.jpg'} alt='' className='avatar' />
        <UploadWidget
          uwConfig={{
            cloudName: 'dae2mlnyo',
            uploadPreset: 'estate',
            multiple: false,
            maxImageFileSize: 2000000,
            folder: 'avatars',
          }}
          setAvatar={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
