import HomeScreen from './components/pages/Home';
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
