import { useMovieCollectionData } from '../../../context/MovieCollectionContext';
import { selectShelfbyId } from '../../../selectors/contentSelector';
import { isValidArray } from '../../../utils/array.utils';
import { LazyRow } from '../../composite/LazyRow/lazy-row';
import { Row } from '../Row';
import './collection.scss';

type CollectionProps = {
  id: string;
  focusedIndex: number; // Index of the focused tile
  [key: string]: any;
};

export const Collection: React.FC<CollectionProps> = ({ id, focusedIndex }) => {
  const state = useMovieCollectionData();
  const shelf = selectShelfbyId(state, id);
  const shelfId = shelf.id + '' + crypto.randomUUID();

  /**
   * The goal here was to use react's context api service to handle the keyboard navigation
   * and to have a smooth transition with scrolling
   */

  // const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  // useEffect(() => {
  //   const el = tileRefs.current[focusedIndex];
  //   if (el) {
  //     el.scrollIntoView({
  //       behavior: 'smooth',
  //       inline: 'center',
  //       block: 'nearest',
  //     });
  //   }
  // }, [focusedIndex]);

  if (isValidArray(shelf.contentIds)) {
    return (
      <div key={shelfId} className="collection">
        {/* <h2 className="row__header">{shelf.title}</h2> */}
        <Row focusedIndex={focusedIndex} title={shelf.title} items={shelf.contentIds} />
      </div>
    );
  } else {
    return (
      <div key={shelfId} className="collection">
        <LazyRow focusedIndex={focusedIndex} title={shelf.title} refId={shelf.refId ?? shelf.id} />
      </div>
    );
  }
};
