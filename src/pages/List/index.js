import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// utils
import { apiUrl, headerConfig, errorStatusList } from '../../utils/index';

//context
import { useAuthValue } from '../../context/AuthContext';

//component
import Card from '../../components/card/index';
import Loading from '../../components/loading/index';
import Navbar from '../../components/navbar';



const List = () => {
  const { user } = useAuthValue();
  const [games, setGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);
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
  }, [user]);

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
      <Navbar
        selectedGenre={selectedGenre}
        handleGenreChange={handleGenreChange}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}
        uniqueGenres={Array.from(new Set(games.map((game) => game.genre)))}
      />

      {loading ? (<Loading message={'Loading'} />) : (
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