import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import axios from 'axios';
import { useState } from 'react';
import apiRequest from '../../lib/apiRequest';

function Register() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //After Create a new user, navigate to login in page;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const conPassword = formData.get('ConPassword');

    const EqualPassword = password === conPassword;
    console.log(EqualPassword);

    if (EqualPassword) {
      try {
        const res = await apiRequest.post('/auth/register', {
          username,
          email,
          password,
        });
        navigate('/login');
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('password not match');
    }
  };

  return (
    <div className='register'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
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
            <label htmlFor='email'>Email</label>{' '}
            <input name='email' type='text' placeholder='Email' required />
          </div>
          <div className='item'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='text'
              placeholder='Password'
              required
            />
          </div>
          <div className='item'>
            <label htmlFor='ConPassword'>Confirm Password</label>
            <input
              name='ConPassword'
              type='text'
              placeholder='Confirm Password'
              required
            />
          </div>

          <button disabled={isLoading}>Register</button>
          <span>{error}</span>
          <Link to='/login'>
            Already have an account? <span>Login</span>
          </Link>
        </form>
      </div>
      <div className='imgContainer'>
        <img
          src='/bg.png
        '
          alt=''
        />
      </div>
    </div>
  );
}

export default Register;
