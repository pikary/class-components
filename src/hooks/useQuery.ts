import { useState } from 'react';
interface UseQueryInterface {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleQuerySave: (val: string) => void;
}

const useQuery = (key: string): UseQueryInterface => {
  const [query, setQuery] = useState<string>(localStorage.getItem(key) || '');

  // setQuery is called after search request is done
  const handleQuerySave = (value: string) => {
    setQuery(value);
    localStorage.setItem(key, value);
  };

  return { query, setQuery, handleQuerySave };
};

export default useQuery;
