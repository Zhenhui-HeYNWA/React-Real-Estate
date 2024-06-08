import { useState } from 'react';
import UploadWidget from '../../components/uploadWidget/uploadWidget';
import './newPostPage.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';

function NewPostPage() {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    inputs.desc = value; // Include the value from ReactQuill

    try {
      const res = await apiRequest.post('/posts', {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate('/' + res.data.id);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleCancel = () => {
    const form = document.getElementById('postForm');
    form.reset();
    setValue('');
    setImages([]);
    setError('');
  };

  return (
    <div className='newPostPage'>
      <div className='formContainer'>
        <h1>Add New Post</h1>

        <div className='group images'>
          <h2>Property Images</h2>

          <div className='item'>
            {images.map((image, index) => (
              <img src={image} alt='' key={index} />
            ))}
            <div className='widget'>
              <UploadWidget
                uwConfig={{
                  multiple: true,
                  cloudName: 'dae2mlnyo',
                  uploadPreset: 'estate',
                  maxImageFileSize: 2000000,
                  folder: 'posts',
                }}
                setState={setImages}
              />
            </div>
          </div>
        </div>

        <form id='postForm' onSubmit={handleSubmit}>
          <div className='group basicInfo'>
            <div className='left'>
              <h2>Basic Information</h2>
            </div>
            <div className='right'>
              <div className='item'>
                <label htmlFor='title'>Title</label>
                <input id='title' name='title' type='text' required />
              </div>
              <div className='item'>
                <label htmlFor='city'>City</label>
                <input id='city' name='city' type='text' required />
              </div>

              <div className='item'>
                <label htmlFor='price'>Price</label>
                <input id='price' name='price' type='number' required />
              </div>

              <div className='item'>
                <label htmlFor='address'>Address</label>
                <input id='address' name='address' type='text' required />
              </div>
            </div>
          </div>

          <div className='group detail'>
            <div className='left'>
              <h2>Property Details</h2>
            </div>
            <div className='right'>
              <div className='item'>
                <label htmlFor='bedroom'>Bedroom Number</label>
                <input
                  min={1}
                  id='bedroom'
                  name='bedroom'
                  type='number'
                  required
                />
              </div>
              <div className='item'>
                <label htmlFor='bathroom'>Bathroom Number</label>
                <input
                  min={1}
                  id='bathroom'
                  name='bathroom'
                  type='number'
                  required
                />
              </div>
              <div className='item'>
                <label htmlFor='size'>
                  Total Size <span>(sqft)</span>
                </label>
                <input min={0} id='size' name='size' type='number' required />
              </div>
              <div className='item'>
                <label htmlFor='latitude'>Latitude</label>
                <input id='latitude' name='latitude' type='text' required />
              </div>
              <div className='item'>
                <label htmlFor='longitude'>Longitude</label>
                <input id='longitude' name='longitude' type='text' required />
              </div>
            </div>
          </div>

          <div className='group'>
            <div className='left'>
              <h2>Property Type</h2>
            </div>
            <div className='right'>
              <div className='item'>
                <label htmlFor='type'>Type</label>
                <select name='type'>
                  <option value='rent' defaultChecked>
                    Rent
                  </option>
                  <option value='buy'>Buy</option>
                </select>
              </div>

              <div className='item'>
                <label htmlFor='property'>Property</label>
                <select name='property'>
                  <option value='apartment' defaultChecked>
                    Apartment
                  </option>
                  <option value='house'>House</option>
                  <option value='condo'>Condo</option>
                  <option value='land'>Land</option>
                </select>
              </div>
            </div>
          </div>
          <div className='group'>
            <div className='left'>
              <h2>Policies</h2>
            </div>
            <div className='right'>
              <div className='item'>
                <label htmlFor='utilities'>Utilities Policy</label>
                <select name='utilities'>
                  <option value='owner' defaultChecked>
                    Owner is responsible
                  </option>
                  <option value='tenant'>Tenant is responsible</option>
                  <option value='shared'>Shared</option>
                </select>
              </div>
              <div className='item'>
                <label htmlFor='pet'>Pet Policy</label>
                <select name='pet'>
                  <option value='not-allowed' defaultChecked>
                    Not Allowed
                  </option>
                  <option value='allowed'>Allowed</option>
                </select>
              </div>
              <div className='item'>
                <label htmlFor='income'>Income Policy</label>
                <input
                  id='income'
                  name='income'
                  type='text'
                  placeholder='Income Policy'
                  required
                />
              </div>
            </div>
          </div>

          <div className='group'>
            <div className='left'>
              <h2>Nearby Amenities</h2>
            </div>
            <div className='right'>
              <div className='item'>
                <label htmlFor='school'>School</label>
                <input
                  min={0}
                  id='school'
                  name='school'
                  type='number'
                  required
                />
              </div>
              <div className='item'>
                <label htmlFor='bus'>Bus</label>
                <input min={0} id='bus' name='bus' type='number' required />
              </div>
              <div className='item'>
                <label htmlFor='restaurant'>Restaurant</label>
                <input
                  min={0}
                  id='restaurant'
                  name='restaurant'
                  type='number'
                  required
                />
              </div>
            </div>
          </div>
          <div className='group description'>
            <div className='left'>
              <h2>Description</h2>
            </div>
            <div className='right'>
              <div className='item'>
                <ReactQuill
                  theme='snow'
                  className='quillInput'
                  onChange={setValue}
                  value={value}
                />
              </div>
            </div>
          </div>

          {error && <span>{error}</span>}

          <div className='buttons'>
            <button
              className='cancelButton'
              type='button'
              onClick={handleCancel}>
              Cancel
            </button>
            <button className='sendButton' type='submit'>
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPostPage;
