import Card from '../card/card.jsx';
import './list.scss';
function List({ posts }) {
  return (
    <div className='list'>
      {posts && posts.length > 0 ? (
        posts.map((item) => <Card key={item.id} item={item} />)
      ) : (
        <span>Don&apos; t have Post yet.</span>
      )}
    </div>
  );
}

export default List;
