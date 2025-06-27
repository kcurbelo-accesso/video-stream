import { useEffect, useRef } from 'react';
import { useMovieCollectionData, useSetMovieCollectionData } from '../../../context/MovieCollectionContext';
import { API } from '../../../services/api';
import type { RefIdJsonResponse } from '../../../types/api/refIdJson';
import { normalizeSetJson } from '../../../utils/api.utils';
import { isValidArray } from '../../../utils/array.utils';
import { Row } from '../../ui';

type LazyRowProps = {
  refId: string;
  title: string;
  focusedIndex: number;
};

export const LazyRow: React.FC<LazyRowProps> = ({ refId, title, focusedIndex }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const fetchTriggered = useRef(false); // useRef for debounce flag

  const { shelves } = useMovieCollectionData();
  const setState = useSetMovieCollectionData();

  const shelf = Object.values(shelves).find((s) => s.refId === refId);

  useEffect(() => {
    if (fetchTriggered.current || shelf?.contentIds?.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fetchTriggered.current) {
          fetchTriggered.current = true; // block future calls

          //  debounce the fetch slightly
          setTimeout(async () => {
            try {
              const { data }: { data: RefIdJsonResponse } = await API.get(`https://cd-static.bamgrid.com/dp-117731241344/sets/${refId}.json`);
              let set = data.CuratedSet || data.TrendingSet || data.PersonalizedCuratedSet || null;

              const normalized = normalizeSetJson(set);

              /**
               * I don't fully understand why the content id and ref id would be different.
               * TODO: Fix hack solution which prevents endless loop and memory leak;
               */
              if (normalized?.shelf.refId !== refId) {
                normalized.shelf = { ...shelf, ...normalized.shelf, refId, id: refId, title: shelf?.title } as any;
              }

              setState?.((prev: any) => ({
                ...prev,
                shelves: {
                  ...prev.shelves,
                  //@ts-ignore
                  [normalized.shelf.id]: normalized.shelf,
                },
                shelfOrder: prev.shelfOrder.includes(normalized.shelf.id) ? prev.shelfOrder : [...prev.shelfOrder, normalized.shelf.id],
                content: {
                  ...prev.content,
                  ...normalized.content,
                },
              }));
            } catch (err) {
              console.error(`Failed to load shelf ${refId}:`, err);
            }
          }, 2000);
        }
      },
      { threshold: 0.3 }
    );

    const el = rowRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [refId]);

  if (shelf?.contentIds && isValidArray(shelf.contentIds)) {
    return (
      <div ref={rowRef} className="collection">
        <Row focusedIndex={focusedIndex} title={shelf.title} items={shelf.contentIds} />
      </div>
    );
  }

  return (
    <div ref={rowRef} className="collection">
      <div className="shelf-placeholder">Loading {title}...</div>
    </div>
  );
};
