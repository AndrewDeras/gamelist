import { useState, useEffect } from 'react';
import { useContextValue } from '../../context/AuthContext';
import Loading from '../../components/loading/Loading';
import Card from '../../components/card/Card';

const Favorite = () => {
  const { games, loading, error, favGames, rateGames: ratings } = useContextValue();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    if (selectedGenre === '' && searchQuery === '') {
      setFilteredGames(games.filter((game) => favGames.includes(String(game.id))));
    } else {
      const filtered = games.filter((game) =>
        favGames.includes(String(game.id)) &&
        (selectedGenre === '' || game.genre === selectedGenre) &&
        (searchQuery === '' || game.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredGames(filtered);
    }
  }, [games, favGames, selectedGenre, searchQuery]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
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
            onChange={handleSearch}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <button className="btn btn-outline-primary">
          Sort by Rating
        </button>
      </header>

      {loading ? (
        <Loading message="Loading" />
      ) : filteredGames.length > 0 ? (
        <div className="row">
          {filteredGames.map((game) => (
            <Card ratings={ratings} favGamesArr={favGames} key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p>No favorite games found.</p>
      )}

      {error && <Loading message={error} />}
    </>
  );
};

export default Favorite;
