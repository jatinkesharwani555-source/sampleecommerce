import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import { searchProducts } from "../api/searchProducts.api";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 🔥 Debounce Effect
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchSuggestions = async () => {
    try {
      const response = await searchProducts(query);
      setSuggestions(response.data.data.slice(0, 6));
      console.log(response.data.data)
    } catch (err) {
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    onSearch(query);
    setSuggestions([]);
    setQuery("");
  };

  const handleSelect = (value) => {
    onSearch(value);
    setSuggestions([]);
    setQuery("");
  };

  return (
    <div className={styles.searchWrapper}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <FaSearch />
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.map((item) => (
            <div
              key={item._id}
              className={styles.suggestionItem}
              onClick={() => handleSelect(item.productMiniDesc)}
            >
              <img
                src={`https://sampleecommercebackend-2.onrender.com/uploads/${item.productImage?.[0]}`}
                alt={item.productMiniDesc}
              />              
              <span>{item.productMiniDesc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;