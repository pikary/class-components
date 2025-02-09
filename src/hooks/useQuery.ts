import { useState } from 'react';
interface UseQueryInterface {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleQuerySave: () => void;
}

const useQuery = (key: string): UseQueryInterface => {
  const [query, setQuery] = useState<string>(localStorage.getItem(key) || '');

  // setQuery is called after search request is done
  const handleQuerySave = () => {
    console.log({ LOX: query });
    localStorage.setItem(key, query);
  };

  return { query, setQuery, handleQuerySave };
};

export default useQuery;
