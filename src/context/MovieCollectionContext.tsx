import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { normalizeHomeJson, type NormalizedData } from '../utils/help.utils';

type MovieCollectionContextType = {
  shelves: NormalizedData['shelves'];
  shelfOrder: string[];
  content: NormalizedData['content'];
  loading: boolean;
};

export const MovieCollectionContext = createContext<MovieCollectionContextType | null>(null);

export const useMovieCollectionData = () => {
  const context = useContext(MovieCollectionContext);
  if (!context) throw new Error('useMovieCollectionData must be used within a HomeDataProvider');
  return context;
};

export const MovieCollectionProvider = ({ children }: any) => {
  const [shelves, setShelves] = useState<any>({});
  const [shelfOrder, setShelfOrder] = useState<string[]>([]);
  const [content, setContent] = useState<NormalizedData['content']>({});
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    async function fetchData() {
      const url = 'https://cd-static.bamgrid.com/dp-117731241344/home.json';
      const res = await fetch(url);
      const { data } = await res.json();
      console.log('data', data);
      console.log('normalizeHomeJson', normalizeHomeJson(data));
      const { shelves, shelfOrder, content } = normalizeHomeJson(data);

      setShelves(shelves);
      setContent(content);
      setShelfOrder(shelfOrder);
      setLoading(false);
    }

    if (!hasRun.current) {
      fetchData();
      hasRun.current = true;
    }
  }, []);

  return <MovieCollectionContext.Provider value={{ shelves, shelfOrder, content, loading }}>{children}</MovieCollectionContext.Provider>;
};
