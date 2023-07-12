import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateFavGameList } from '../../firebase/updateFavGameList';
import { updateGameRate } from '../../firebase/updateGameRate';
import { useContextValue } from '../../context/AuthContext';

import './card.css';

const Card = ({ game }) => {
  const navigate = useNavigate();
  const [rate, setRate] = useState(0);
  const { user, userData } = useContextValue();
  const isGameInFavorites = userData && userData.favGames && userData.favGames.some((favGame) => favGame.id === game.id);
  const isGameInRatedGames = userData && userData.ratedGames && userData.ratedGames.some((ratedGame) => ratedGame.id === game.id);

  useEffect(() => {
    if (isGameInRatedGames) {
      const ratedGame = userData.ratedGames.find((ratedGame) => ratedGame.id === game.id);
      setRate(ratedGame.rate);
    }
  }, [isGameInRatedGames, userData.ratedGames, game.id]);

  const handleRatingChange = (e) => {
    if (!user) {
      return navigate('/auth');
    }

    const newRate = parseInt(e.target.getAttribute('value'));
    setRate(newRate);

    updateGameRate(user, game, newRate, userData);
  };

  const handleFav = (game) => {
    if (!user) {
      return navigate('/auth');
    }

    updateFavGameList(user, game, userData);
  };

  return (
    <div key={String(game.id)} className="card col-lg-4 col-sm-2" style={{ width: '18rem' }}>
      <img src={game.thumbnail} className="card-img-top" alt={game.title} />
      <div className="card-body d-flex flex-column">
        <h4 className="card-title">{game.title}</h4>
        <p className="card-text">
          <small>
            <strong>Genre:</strong> {game.genre}
          </small>
        </p>
        <p className="card-text">
          <small>
            <strong>Platform:</strong> {game.platform}
          </small>
        </p>
        <p className="card-text flex-grow-1" style={{ maxHeight: '6rem', overflow: 'hidden' }}>
          {game.short_description}
        </p>
        <a target="_blank" href={game.game_url} className="btn btn-primary mt-auto" rel="noreferrer">
          {`${game.title} Website`}
        </a>
        <div className="actions">
          <div onClick={() => handleFav(game)} className="fav">
            {isGameInFavorites ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
          </div>
          <div className="stars">
            <span>
              <i
                value={1}
                className={`bi bi-star${rate >= 1 ? '-fill' : ''}`}
                onClick={handleRatingChange}
              ></i>
              <i
                value={2}
                className={`bi bi-star${rate >= 2 ? '-fill' : ''}`}
                onClick={handleRatingChange}
              ></i>
              <i
                value={3}
                className={`bi bi-star${rate >= 3 ? '-fill' : ''}`}
                onClick={handleRatingChange}
              ></i>
              <i
                value={4}
                className={`bi bi-star${rate >= 4 ? '-fill' : ''}`}
                onClick={handleRatingChange}
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
