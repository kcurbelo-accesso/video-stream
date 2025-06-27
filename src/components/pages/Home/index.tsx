import { useEffect, useRef, useState } from 'react';
import { useMovieCollectionData } from '../../../context/MovieCollectionContext';
import { TileModal } from '../../composite';
import { Loading } from '../../ui';
import { Collection } from '../../ui/Collection';

export const HomeScreen = () => {
  const state = useMovieCollectionData();
  const [focusedRow, setFocusedRow] = useState(0);
  const [focusedTile, setFocusedTile] = useState(0);
  const [modalContentId, setModalContentId] = useState<string | null>(null);

  const focusedRowRef = useRef(focusedRow);
  const focusedTileRef = useRef(focusedTile);

  useEffect(() => {
    focusedRowRef.current = focusedRow;
    focusedTileRef.current = focusedTile;
  }, [focusedRow, focusedTile]);

  useEffect(() => {
    if (state.loading || !state.shelfOrder?.length) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      /**
       * Not sure if it's asynchronous issue or stale effects. Used dom node refs to hack this solution
       */
      if (e.key === 'ArrowRight') setFocusedTile((prev) => prev + 1);
      if (e.key === 'ArrowLeft') setFocusedTile((prev) => Math.max(prev - 1, 0));
      if (e.key === 'ArrowDown') setFocusedRow((prev) => Math.min(prev + 1, state.shelfOrder.length - 1));
      if (e.key === 'ArrowUp') setFocusedRow((prev) => Math.max(prev - 1, 0));
      if (e.key === 'Escape' && modalContentId) setModalContentId(null);

      if (e.key === 'Enter') {
        const row = focusedRowRef.current;
        const tile = focusedTileRef.current;
        const currentShelf = state.shelves[state.shelfOrder[row]];
        const contentId = currentShelf?.contentIds?.[tile];

        console.log(`Opening modal for shelf ${row} tile ${tile}`, contentId);

        if (contentId) {
          setModalContentId(contentId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.loading, state.shelfOrder, state.shelves, modalContentId]);

  if (state.loading || !state.shelves) return <Loading />;

  return (
    <>
      <div>
        {state.shelfOrder.map((shelfId: string, i) => (
          <div key={state.shelves[shelfId].id}>
            <Collection id={state.shelves[shelfId].id} focusedIndex={i === focusedRow ? focusedTile : -1} />
          </div>
        ))}
      </div>
      {/* Opens modal on Enter */}
      {modalContentId && <TileModal contentId={modalContentId} onClose={() => setModalContentId(null)} />}
    </>
  );
};

export default HomeScreen;
