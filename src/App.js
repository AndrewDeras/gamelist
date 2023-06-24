import { useState, useEffect } from 'react';
import Card from './components/card/index';
import Nav from './components/nav';
import axios from 'axios';
const url = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/';


function App() {
  const [games, setGames] = useState([]);


  useEffect(() => {

    axios.get(url, {
      headers: {
        "dev-email-address": "andrew@gmail.com"
      }
    }).then(respose => setGames(respose.data)).catch(err => console.log(err));
  }, [])
  return (
    <div className="App">
      <Nav />
      <div className="row">
        {games &&
          games.map((game, index) => < Card key={String(index)} game={game} index={index} />
          )}
      </div>
    </div>
  );
}

export default App;
