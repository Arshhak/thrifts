"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface SearchContextType {
  isOpen: boolean;
  query: string;
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (q: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  isOpen: false,
  query: "",
  openSearch: () => {},
  closeSearch: () => {},
  setQuery: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQueryState] = useState("");

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQueryState("");
  }, []);
  const setQuery = useCallback((q: string) => setQueryState(q), []);

  return (
    <SearchContext.Provider value={{ isOpen, query, openSearch, closeSearch, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
