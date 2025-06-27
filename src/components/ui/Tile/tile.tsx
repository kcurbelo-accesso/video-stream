// src/components/Tile.tsx
import React from 'react';
import { useMovieCollectionData } from '../../../context/MovieCollectionContext';
import { selectContentById } from '../../../selectors/contentSelector';
import './Tile.scss';
import type { TileProps } from './tile.type';

export const Tile: React.FC<TileProps> = ({ contentId, isFocused }) => {
  const state = useMovieCollectionData();
  const content = selectContentById(state, contentId);

  return (
    <div key={contentId + crypto.randomUUID()} className={`tile ${isFocused ? 'focused' : ''}`}>
      <img className="tile__img" src={content.imageUrl} alt={content.title} />
      {/* <h4>{content.title}</h4> */}
    </div>
  );
};

/**
 * This was an attempt to move the navigation into a context layer
 * and use a wrapper component
 */
// export const FocusableTile = ({ contentId, id }: FocusTileProps) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const { setFocusedId } = useFocusContext();
//   const isFocused = useIsFocused(id);

//   return (
//     <div ref={ref} tabIndex={0} onFocus={() => setFocusedId(id)} onBlur={() => setFocusedId(null)}>
//       <Tile contentId={contentId} isFocused={isFocused} />
//     </div>
//   );
// };
