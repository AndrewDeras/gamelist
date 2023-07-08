import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//component
import Card from '../../components/card/index';
import Loading from '../../components/loading/index'

// utils
import { apiUrl, headerConfig, errorStatusList } from '../../utils/index';


const List = () => {
  const [games, setGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await Promise.race([
          fetch(apiUrl, headerConfig),
          new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(new Error('Server timeout'))
            }, 5000);
          })
        ])

        const data = await response.json();

        if (!mounted) {
          return;
        }

        if (errorStatusList.includes(response.status) || response.status === 400) {
          toast.error('The server failed to respond, try reloading the page');
          return;
        }

        if (response.status !== 200) {
          return toast.error('The server will not be able to respond for now, please try to come back later.');
        }

        setGames(data);
        setLoading(false);
        toast.success('Game List ready');
      } catch (error) {
        setLoading(false);
        toast.error(error.message)
      }
    }

    let mounted = true;

    getData();

    return () => {
      mounted = false;
    };
  }, []);

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
      <ToastContainer limit={1} autoClose={2000} />
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a href='/' className="navbar-brand">Free Games To Play</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <select className="form-select" value={selectedGenre} onChange={handleGenreChange}>
                  <option value="">All genres</option>
                  {Array.from(new Set(games.map((game) => game.genre))).map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
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
          </div>
        </div>
      </nav>

      {loading ? (<Loading />) : (
        <div className="row">
          {filteredGames && filteredGames.map((game, index) => (
            <Card key={String(index)} game={game} />
          ))}
        </div>
      )}
    </>
  )
}

export default List