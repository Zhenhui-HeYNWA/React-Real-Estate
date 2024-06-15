import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import { useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import UploadWidget from '../../components/uploadWidget/uploadWidget';

function Register() {
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState([]); // 初始状态为空字符串
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const conPassword = formData.get('ConPassword');

    const EqualPassword = password === conPassword;
    console.log(avatar[0]);

    if (EqualPassword) {
      try {
        await apiRequest.post('/auth/register', {
          username,
          email,
          password,
          avatar: avatar[0], // 使用更新后的头像 URL
        });
        navigate('/login');
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <div className='register'>
      <div className='formContainer'>
        <h1>Create an Account</h1>
        <div className='item avatar'>
          <img src={avatar[0] || '/noavatar.jpg'} alt='' className='avatar' />
          <UploadWidget
            uwConfig={{
              cloudName: 'dae2mlnyo',
              uploadPreset: 'estate',
              multiple: false,
              maxImageFileSize: 2000000,
              folder: 'avatars',
            }}
            setState={setAvatar} // 上传成功后更新头像 URL
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='item'>
            <label htmlFor='username'>Username</label>
            <input
              name='username'
              type='text'
              placeholder='Username'
              required
            />
          </div>
          <div className='item'>
            <label htmlFor='email'>Email</label>
            <input name='email' type='text' placeholder='Email' required />
          </div>
          <div className='item'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              required
            />
          </div>
          <div className='item'>
            <label htmlFor='ConPassword'>Confirm Password</label>
            <input
              name='ConPassword'
              type='password'
              placeholder='Confirm Password'
              required
            />
          </div>

          <button>Register</button>
          <span>{error}</span>
          <Link to='/login'>
            Already have an account? <span>Login</span>
          </Link>
        </form>
      </div>
      <div className='imgContainer'>
        <img src='/bg.png' alt='' />
      </div>
    </div>
  );
}

export default Register;
