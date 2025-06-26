import { useEffect, useState } from 'react';
import { useMovieCollectionData } from '../../context/MovieCollectionContext';
import { Collection } from '../ui/Collection';
import { Loading } from '../ui/Loader';

export const HomeScreen = () => {
  const state = useMovieCollectionData();
  const [focusedRow, setFocusedRow] = useState(0);
  const [focusedTile, setFocusedTile] = useState(0);

  useEffect(() => {
    if (state.loading || !state.shelfOrder?.length) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setFocusedTile((prev) => prev + 1);
      if (e.key === 'ArrowLeft') setFocusedTile((prev) => Math.max(prev - 1, 0));
      if (e.key === 'ArrowDown') {
        setFocusedRow((prev) => Math.min(prev + 1, state.shelfOrder.length - 1));
        // setFocusedTile(0);
      }
      if (e.key === 'ArrowUp') {
        setFocusedRow((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.loading, state.shelfOrder?.length]);

  if (state.loading || !state.shelves) return <Loading />;

  return (
    <div>
      {state.shelfOrder.map((shelfId: string, i) => (
        <div key={state.shelves[shelfId].id}>
          <Collection id={state.shelves[shelfId].id} focusedIndex={i === focusedRow ? focusedTile : -1} />
        </div>
      ))}
    </div>
  );
};

export default HomeScreen;
