import { listData } from '../../lib/dummyDB';
import Card from '../card/card.jsx';
import './list.scss';
function List() {
  return (
    <div className='list'>
      {listData.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
