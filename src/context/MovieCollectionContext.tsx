import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { normalizeHomeJson, type NormalizedData } from '../utils/help.utils';

type MovieCollectionContextType = {
  shelves: NormalizedData['shelves'];
  shelfOrder: NormalizedData['shelfOrder'];
  content: NormalizedData['content'];
  loading: boolean;
  setState?: Function;
};

export const MovieCollectionContext = createContext<MovieCollectionContextType | null>(null);

export const MovieCollectionProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<MovieCollectionContextType>({
    shelves: {},
    shelfOrder: [],
    content: {},
    loading: true,
  });

  // Prevent double fetch in React Strict Mode during dev
  const hasRun = useRef(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const homeRes = await fetch('https://cd-static.bamgrid.com/dp-117731241344/home.json');
        const { data } = await homeRes.json();

        const normalized = normalizeHomeJson(data);
        setState((prev) => ({ ...prev, ...normalized, loading: false }));
      } catch (error) {
        console.error('Failed to load home data:', error);
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    if (!hasRun.current) {
      fetchInitialData();
      hasRun.current = true;
    }
  }, []);

  return <MovieCollectionContext.Provider value={{ ...state, setState }}>{children}</MovieCollectionContext.Provider>;
};

export const useMovieCollectionData = () => {
  const context = useContext(MovieCollectionContext);
  if (!context) throw new Error('useMovieCollectionData must be used within MovieCollectionProvider');
  return context;
};

export const useSetMovieCollectionData = () => {
  const context = useContext(MovieCollectionContext);
  if (!context) throw new Error('useSetMovieCollectionData must be used within MovieCollectionProvider');
  return context!.setState;
};
