import { useState, useEffect } from 'react';
import Card from './components/card/index';
const url = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/';


function App() {
  const [games, setGames] = useState([]);


  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(url, { headers: { "dev-email-address": "andrew@gmail.com" } });
        const data = await response.json();
        console.log(data);
        localStorage.setItem('games', JSON.stringify(data));
        setGames(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (!localStorage.getItem('games')) {
      getData();
    } else {
      setGames(JSON.parse(localStorage.getItem('games')));
    }
  }, []);


  return (
    <div className="App">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a href='/' className="navbar-brand">Games Free To Play</a>
          <select class="form-select" aria-label="Default select example">
            <option selected>Filter by genre</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search by tile" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>

      <div className="row">
        {games &&
          games.map((game, index) => < Card key={String(index)} game={game} />
          )}
      </div>
    </div>
  );
}

export default App;
