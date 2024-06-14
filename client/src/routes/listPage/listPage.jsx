import { listData } from '../../lib/dummyDB';
import Filter from '../../components/filter/filter';
import './listPage.scss';
import Card from '../../components/card/card';
import Map from '../../components/map/map';
import { Await, useLoaderData } from 'react-router-dom';
import { Suspense, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

function ListPage() {
  const data = useLoaderData();

  return (
    <div className='listPage'>
      <div className='listContainer'>
        <div className='wrapper'>
          <Filter />
          <Suspense fallback={<p>Loading....</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}>
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className='mapContainer'>
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading Maps!</p>}>
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>

        {/* */}
      </div>
    </div>
  );
}

export default ListPage;
