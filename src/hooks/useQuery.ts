import { useEffect, useState } from 'react';
interface UseQueryInterface {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleQuerySave: () => void;
}

const useQuery = (key: string): UseQueryInterface => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const savedQuery = localStorage.getItem(key) || '';
    setQuery(savedQuery);
  }, [key]);

  const handleQuerySave = () => {
    localStorage.setItem(key, query);
  };

  return { query, setQuery, handleQuerySave };
};

export default useQuery;
