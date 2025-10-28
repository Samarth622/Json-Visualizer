import { Search, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { debounce } from '../utils/debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search by path (e.g., $.user.name or items[0])' }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 250),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search className="w-5 h-5" />
      </div>
      
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-10 py-2.5 rounded-lg
          bg-white/50 dark:bg-gray-800/50
          border border-gray-300 dark:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-blue-500/50
          text-gray-900 dark:text-gray-100
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          transition-all duration-200
          backdrop-blur-sm
        "
      />

      {inputValue && (
        <button
          onClick={handleClear}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
            transition-colors
          "
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
