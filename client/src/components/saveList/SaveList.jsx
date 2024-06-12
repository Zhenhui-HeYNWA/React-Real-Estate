import { listData } from '../../lib/dummyDB';
import Card from '../card/card.jsx';
import './SaveList.scss';
function List({ posts }) {
  return (
    <div className='list'>
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
