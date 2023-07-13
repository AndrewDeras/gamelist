// hooks
import { useState, useEffect } from 'react';

// context
import { useContextValue } from '../../context/AuthContext';

// components
import Modal from '../../components/modal/Modal';
import Card from '../../components/card/Card';

const Favorite = () => {
  const { games, loading, error } = useContextValue();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [sortByRating, setSortByRating] = useState(false);

  useEffect(() => {
    let filtered = games.filter((game) => game.fav);

    if (selectedGenre !== '') {
      filtered = filtered.filter((game) => game.genre === selectedGenre);
    }

    if (searchQuery !== '') {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortByRating) {
      filtered.sort((a, b) => b.rate - a.rate);
    } else {
      filtered.sort((a, b) => a.rate - b.rate);
    }

    setFilteredGames(filtered);
  }, [games, selectedGenre, searchQuery, sortByRating]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
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
          {games &&
            games.length > 0 &&
            Array.from(new Set(games.map((game) => game.genre))).map((genre) => (
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
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <button className="btn btn-outline-primary" onClick={handleSortByRating}>
          Sort by Rating {sortByRating ? ('▼') : ('▲')}
        </button>
      </header>

      {loading ? (
        <Modal message="Loading" />
      ) : filteredGames.length > 0 ? (
        <div className="row">
          {filteredGames.map((game) => (
            <Card key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <Modal message="No favorite games found." />
      )}

      {error && <Modal message={error} />}
    </>
  );
};

export default Favorite;
