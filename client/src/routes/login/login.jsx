import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { useContext, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.target);

    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const res = await apiRequest.post('/auth/login', {
        username,
        password,
      });
      updateUser(res.data);

      navigate('/');
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='login'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>

          <div className='item'>
            <label htmlFor='username'>Username</label>
            <input
              name='username'
              type='text'
              placeholder='Username'
              required
              minLength={3}
              maxLength={20}
            />
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

          <button disabled={isLoading}>Login</button>
          <span>{error}</span>
          <Link to='/register'>
            {"Don't"} you have an account? <span>Sign Up</span>
          </Link>
        </form>
      </div>
      <div className='imgContainer'>
        <img src='/bg.png' alt='' />
      </div>
    </div>
  );
}

export default Login;
