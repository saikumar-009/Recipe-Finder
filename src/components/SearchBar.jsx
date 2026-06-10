import React, { useState } from 'react'
import"./styles/Searchbar.css"

const SearchBar = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query);
  };
  const handleClear = () => {
    setQuery("");
    if (onClear) onClear();
  };
  return (
    <form onSubmit={handleSubmit} className='search'>
      <input
        className='input'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder='Search for a Recipe...'
      />
      <button className='btn' type="submit">Search</button>
      {
        query && (
          <button type="button" className='clear-btn' onClick={handleClear}>x</button>
        )
      }
    </form>
  );
}

export default SearchBar