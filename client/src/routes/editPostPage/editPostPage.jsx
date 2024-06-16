import { useEffect, useState } from 'react';
import UploadWidget from '../../components/uploadWidget/uploadWidget';
import './editPostPage.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiRequest from '../../lib/apiRequest';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

function EditPostPage() {
  const post = useLoaderData();
  const postDetail = post.postDetail;
  const [value, setValue] = useState('');
  const [images, setImages] = useState(post.images);
  const [error, setError] = useState('');
  console.log(images);
  const [position, setPosition] = useState({
    latitude: post.latitude || null,
    longitude: post.longitude || null,
  });

  const navigate = useNavigate();

  // 使用 useEffect 在组件加载时设置默认值
  useEffect(() => {
    if (post && postDetail.desc) {
      setValue(postDetail.desc);
    }
    console.log(value);
  }, [post]);

  const handleDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    if (inputs.city) {
      inputs.city =
        inputs.city.charAt(0).toUpperCase() +
        inputs.city.slice(1).toLocaleLowerCase();
      inputs.city = inputs.city.trim();
    }

    try {
      const res = await apiRequest.put(`/posts/${post.id}`, {
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
  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
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
        <div className='left'>
          <h1>Add New Post</h1>
        </div>

        <div className='group images'>
          <div className='left'>
            <h2>Property Images</h2>
          </div>

          <div className='right'>
            <div className='wrapper'>
              {post.images.map((image, index) => (
                <span key={index} className='imgBox'>
                  <img src={image} alt='' key={index} />
                  <span onClick={() => handleDelete(index)}>X</span>
                </span>
              ))}
            </div>
          </div>
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

        <form id='postForm' onSubmit={handleSubmit}>
          <div className='group basicInfo'>
            <div className='left'>
              <h2>Basic Information</h2>
            </div>
            <div className='right'>
              <div className='item'>
                <label htmlFor='title'>Title</label>
                <input
                  id='title'
                  name='title'
                  type='text'
                  defaultValue={post.title}
                  required
                />
              </div>
              <div className='item'>
                <label htmlFor='city'>City</label>
                <input
                  id='city'
                  name='city'
                  type='text'
                  style={{ textTransform: 'capitalize' }}
                  defaultValue={post.city}
                  required
                />
              </div>

              <div className='item'>
                <label htmlFor='price'>Price</label>
                <input
                  id='price'
                  name='price'
                  type='number'
                  defaultValue={post.price}
                  required
                />
              </div>

              <div className='item'>
                <label htmlFor='address'>Address</label>
                <input
                  id='address'
                  name='address'
                  type='text'
                  defaultValue={post.address}
                  required
                />
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
                  defaultValue={post.bedroom}
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
                  defaultValue={post.bathroom}
                  required
                />
              </div>
              <div className='item'>
                <label htmlFor='size'>
                  Total Size <span>(sqft)</span>
                </label>
                <input
                  min={0}
                  id='size'
                  name='size'
                  type='number'
                  defaultValue={postDetail.size}
                  required
                />
              </div>
              <div className='item'>
                <label htmlFor='latitude'>Latitude</label>
                <input
                  id='latitude'
                  name='latitude'
                  type='text'
                  value={position.latitude || ''}
                  onChange={(e) =>
                    setPosition({ ...position, latitude: e.target.value })
                  }
                  required
                />
              </div>
              <div className='item'>
                <label htmlFor='longitude'>Longitude</label>
                <input
                  id='longitude'
                  name='longitude'
                  type='text'
                  value={position.longitude || ''}
                  onChange={(e) =>
                    setPosition({ ...position, longitude: e.target.value })
                  }
                  required
                />
              </div>
              <div className='location'>
                <MapPin size={20} onClick={handleLocation} />
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
                <select name='type' defaultValue={post.type}>
                  <option value='rent'>Rent</option>
                  <option value='buy'>Buy</option>
                </select>
              </div>

              <div className='item'>
                <label htmlFor='property'>Property</label>
                <select name='property' defaultValue={post.property}>
                  <option value='apartment'>Apartment</option>
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
                <select name='utilities' defaultValue={post.utilities}>
                  <option value='owner'>Owner is responsible</option>
                  <option value='tenant'>Tenant is responsible</option>
                  <option value='shared'>Shared</option>
                </select>
              </div>
              <div className='item'>
                <label htmlFor='pet'>Pet Policy</label>
                <select name='pet' defaultValue={post.pet}>
                  <option value='not-allowed'>Not Allowed</option>
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
                  defaultValue={postDetail.income}
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
                  defaultValue={postDetail.school}
                  required
                />
              </div>
              <div className='item'>
                <label htmlFor='bus'>Bus</label>
                <input
                  min={0}
                  id='bus'
                  name='bus'
                  type='number'
                  defaultValue={postDetail.bus}
                  required
                />
              </div>
              <div className='item'>
                <label htmlFor='restaurant'>Restaurant</label>
                <input
                  min={0}
                  id='restaurant'
                  name='restaurant'
                  type='number'
                  defaultValue={postDetail.restaurant}
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
                  value={value}
                  onChange={setValue}
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

export default EditPostPage;
