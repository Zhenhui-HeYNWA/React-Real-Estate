import Filter from '../../components/filter/filter';
import './listPage.scss';
import Card from '../../components/card/card';
import Map from '../../components/map/map';
import { Await, useLoaderData } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';

function ListPage() {
  const data = useLoaderData();
  const [posts, setPosts] = useState(data.postResponse.data);

  const fetchPosts = async () => {
    try {
      const res = await apiRequest.get('/posts');
      setPosts(res.data);
    } catch (error) {
      console.log('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
                  <Card key={post.id} item={post} onDelete={fetchPosts} />
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
