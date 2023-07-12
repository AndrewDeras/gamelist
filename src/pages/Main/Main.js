import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

//context
import { useContextValue } from '../../context/AuthContext';

//component
import Card from '../../components/card/Card';
import Modal from '../../components/modal/Modal';

const Main = () => {
  const { games, loading, error, userData } = useContextValue();
  const { favGames, rateGames } = userData ?? {};

  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedGenre === '') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter((game) => game.genre === selectedGenre);
      setFilteredGames(filtered);
    }
  }, [selectedGenre, games]);

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

      {loading ? (<Modal message={'Loading'} />) : (
        <div className="row">
          {filteredGames && filteredGames.map((game, index) => (
            <Card ratings={rateGames} favGamesArr={favGames} key={String(index)} game={game} />
          ))}
        </div>
      )}

      {error && (<Modal message={error} />)}
    </>
  )
}

export default Main