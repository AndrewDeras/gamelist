// bibliotecas

// hooks
import { useState, useEffect } from 'react';

// context
import { useContextValue } from '../../context/AuthContext';

//components
import Modal from '../../components/modal/Modal';
import Card from '../../components/card/Card';
import Up from '../../components/up/Up';

const Main = () => {
  const { games, loading, error } = useContextValue();

  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredGames, setFilteredGames] = useState(games);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByRating, setSortByRating] = useState(false);
  const [sortedGames, setSortedGames] = useState([]);

  useEffect(() => {
    if (selectedGenre === '') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter((game) => game.genre === selectedGenre);
      setFilteredGames(filtered);
    }
  }, [selectedGenre, games]);

  useEffect(() => {
    if (sortByRating) {
      const sorted = [...filteredGames].sort((a, b) => b.rate - a.rate);
      setSortedGames(sorted);
    } else {
      setSortedGames([]);
    }
  }, [sortByRating, filteredGames]);

  useEffect(() => {
    if (sortedGames.length > 0) {
      setFilteredGames(sortedGames);
    } else {
      setFilteredGames(games);
    }
  }, [sortedGames, games]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortByRating = () => {
    setSortByRating(!sortByRating);
  };

  return (
    <>
      <header>
        <select className="form-select" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All genres</option>
          {Array.from(new Set(games.map((game) => game.genre))).map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <form onSubmit={handleSearch} className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by title"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        <button className="btn btn-outline-primary" onClick={handleSortByRating}>
          Sort by Rating
        </button>
      </header>

      {loading ? (
        <Modal message="Loading" />
      ) : (
        <div className="row">
          {filteredGames.map((game, index) => (
            <Card key={String(index)} game={game} />
          ))}
        </div>
      )}
      <Up />
      {error && <Modal message={error} />}
    </>
  );
};

export default Main;
