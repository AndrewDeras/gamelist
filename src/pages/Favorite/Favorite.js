import { useState, useEffect } from 'react';

//context
import { useContextValue } from '../../context/AuthContext';

//components
import Loading from '../../components/loading/Loading';
import Card from '../../components/card/Card';

const Favorite = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { games, loading, error, favGames, rateGames: ratings } = useContextValue();

  useEffect(() => {
    if (selectedGenre === '') {
      setFilteredGames(games.filter((game) => favGames.includes(game.id)));
    } else {
      const filtered = games.filter((game) => game.genre === selectedGenre && favGames.includes(game.id));
      setFilteredGames(filtered);
    }
  }, [selectedGenre, games, favGames]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) && favGames.includes(game.id)
    );
    setFilteredGames(filtered);
  };

  const handleSearchQueryChange = (event) => {
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
            onChange={handleSearchQueryChange}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </header>

      {loading ? (<Loading message={'Loading'} />) : (
        filteredGames.length > 0 ? (
          <div className="row">
            {filteredGames.map((game, index) => (
              <Card ratings={ratings} favGamesArr={favGames} key={String(index)} game={game} />
            ))}
          </div>
        ) : (
          <p>No favorite games found.</p>
        )
      )}

      {error && (<Loading message={error} />)}
    </>
  );
};

export default Favorite;
