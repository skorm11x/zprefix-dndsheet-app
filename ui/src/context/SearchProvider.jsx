import { useState } from 'react';
import SearchContext from './SearchCtx';

function SearchProvider({ children }) {
  const [search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;