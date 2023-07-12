import { useState, useEffect } from 'react';
import { useContextValue } from '../../context/AuthContext';
import Modal from '../../components/modal/Modal';
import Card from '../../components/card/Card';

const Favorite = () => {
  const { userData, loading, error } = useContextValue();
  const { favGames, rateGames } = userData || {};

  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    if (selectedGenre === '') {
      setFilteredGames(favGames);
    } else {
      const filtered = favGames.filter((game) => game.genre === selectedGenre);
      setFilteredGames(filtered);
    }
  }, [selectedGenre, favGames]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <header>
        <select className="form-select" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All genres</option>
          {favGames && favGames.length > 0 && (
            Array.from(new Set(favGames.map((game) => game.genre))).map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))
          )}
        </select>

        <form onSubmit={handleSearch} className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by title"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <button className="btn btn-outline-primary">Sort by Rating</button>
      </header>

      {loading ? (
        <Modal message="Loading" />
      ) : filteredGames.length > 0 ? (
        <div className="row">
          {filteredGames.map((game) => (
            <Card ratings={rateGames} favGamesArr={favGames} key={game.id} game={game} />
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
