// src/components/Row.tsx
import React, { useEffect, useRef } from 'react';
import { Tile } from '../Tile';
import './row.scss';
import type { RowProps } from './row.types';

export const Row: React.FC<RowProps> = ({ title, items, focusedIndex }) => {
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = tileRefs.current[focusedIndex];

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [focusedIndex]);

  return (
    <>
      <div className="row">
        <div className="row__header">{title}</div>
        <div className="tile-container">
          {items.map((contentId, i) => (
            <div className="tile-wrapper" ref={(el) => (tileRefs.current[i] = el) as any}>
              <Tile key={contentId} contentId={contentId} isFocused={i === focusedIndex} />
              {/* <FocusableTile key={contentId} contentId={contentId} id={i} isFocused={i === focusedIndex} /> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
