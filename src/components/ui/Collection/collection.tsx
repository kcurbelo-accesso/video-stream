import { useMovieCollectionData } from '../../../context/MovieCollectionContext';
import { selectShelfbyId } from '../../../selectors/contentSelector';
import { Row } from '../Row';

type ICollection = {
  //   title: string;
  //   items: { id: string; imageUrl: string; title?: string }[];
  //   focusedIndex: number; // Index of the focused tile
  [key: string]: any;
};

export const Collection: React.FC<ICollection> = ({ id, focusedIndex, ...props }) => {
  const state = useMovieCollectionData();
  const shelf = selectShelfbyId(state, id);
  return (
    <div key={shelf.id + '' + crypto.randomUUID()} className="row">
      <Row focusedIndex={focusedIndex} title={shelf.title} items={shelf.contentIds} />
    </div>
  );
};
