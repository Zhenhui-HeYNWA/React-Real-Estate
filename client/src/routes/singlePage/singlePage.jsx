import React from 'react';
import Slider from '../../components/slider/slider';
import { singlePostData } from '../../lib/dummyDB';

function SinglePage() {
  return (
    <div className='singlePage'>
      <div className='details'>
        <div className='wrapper'>
          <Slider imges={singlePostData.images} />
          <div className='info'>
            <div className='top'>
              <div className='post'></div>
              <div className='user'></div>
            </div>
            <div className='bottom'></div>
          </div>
        </div>
      </div>
      <div className='feature'>
        <div className='wrapper'></div>
      </div>
    </div>
  );
}

export default SinglePage;
