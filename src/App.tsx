// src/App.tsx
import HomeScreen from './components/pages/home';
// import { FocusProvider } from './context/FocusContext';
import { MovieCollectionProvider } from './context/MovieCollectionContext';

export const App = () => (
  // <FocusProvider>
  <MovieCollectionProvider>
    <HomeScreen />
  </MovieCollectionProvider>
  // </FocusProvider>
);

export default App;
