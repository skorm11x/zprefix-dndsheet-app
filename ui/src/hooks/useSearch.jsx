import { useContext } from 'react';
import SearchContext from '../context/SearchCtx';

function useSearch() {
  const context = useContext(SearchContext);
  return context;
}

export default useSearch;