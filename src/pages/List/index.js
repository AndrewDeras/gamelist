import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

//firestore
import { db } from '../../firebase/config';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

//context
import { useAuthValue } from '../../context/AuthContext';


//component
import Card from '../../components/card/index';
import Loading from '../../components/loading/index';

const List = ({ games, loading, error }) => {
  const { user } = useAuthValue();

  const [selectedGenre, setSelectedGenre] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favGames, setFavGames] = useState([]);

  useEffect(() => {
    const getUserFavGames = async () => {

      try {

        const userDocRef = doc(db, 'users', user.uid);

        const userFieldSnap = await getDoc(userDocRef, { fieldPaths: ['favGames'] });

        if (userFieldSnap.exists()) {
          const firestoreFavGames = userFieldSnap.data().favGames;
          setFavGames(firestoreFavGames);
        }

      } catch (error) {
        console.log(error.message);
      }
    }
    if (!user) return;
    getUserFavGames();

    const updateListener = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      const userData = snapshot.data();
      if (userData) {
        const firestoreFavGames = userData.favGames;
        setFavGames(firestoreFavGames);
      }
    });

    return () => {
      updateListener();
    };

  }, [user])

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

      {loading ? (<Loading message={'Loading'} />) : (
        <div className="row">
          {filteredGames && filteredGames.map((game, index) => (
            <Card favGamesArr={favGames} key={String(index)} game={game} />
          ))}
        </div>
      )}

      {error && (<Loading message={error} />)}
    </>
  )
}

export default List