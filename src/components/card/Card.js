// bibliotecas
import { toast } from 'react-toastify';

// css
import './card.css';

// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// firebase
import { updateFavGameList } from '../../firebase/updateFavGameList';
import { updateGameRate } from '../../firebase/updateGameRate';
import { useContextValue } from '../../context/AuthContext';


const Card = ({ game }) => {
  const navigate = useNavigate();
  const [rate, setRate] = useState(0);
  const [isClicked, setClicked] = useState(false);
  const [isStarClicked, setStarClicked] = useState(false); // Novo estado
  const { user, userData } = useContextValue();
  const isGameInFavorites = userData?.favGames?.some((favGame) => favGame.id === game.id);
  const isGameInRatedGames = userData?.ratedGames?.some((ratedGame) => ratedGame.id === game.id);

  useEffect(() => {
    if (isGameInRatedGames) {
      const ratedGame = userData.ratedGames.find((ratedGame) => ratedGame.id === game.id);
      game.rate = ratedGame.rate;
      setRate(ratedGame.rate);
    } else {
      game.rate = 0;
      setRate(0);
    }

    if (isGameInFavorites) {
      game.fav = true;
    } else {
      game.fav = false;
    }
  }, [game, isGameInFavorites, isGameInRatedGames, userData?.ratedGames, game.id, userData]);

  const handleRatingChange = (e) => {
    if (!user) {
      toast.error('You need to login to rate')
      return navigate('/auth');
    }

    const newRate = parseInt(e.target.getAttribute('value'));
    setRate(newRate);

    updateGameRate(user, game, newRate, userData);

    setStarClicked(true); // Adicionado

    setTimeout(() => {
      setStarClicked(false);
    }, 500);
  };

  const handleFav = (game) => {
    if (!user) {
      toast.error('You need to login to save in favorites');
      return navigate('/auth');
    }

    setClicked(true);
    updateFavGameList(user, game, userData);

    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  return (
    <div key={String(game.id)} className="card col-lg-4 col-sm-2 card-hover" style={{ width: '18rem' }}>
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
            <strong>Platform: </strong> {game.platform.includes('PC (Windows)')
              ? (<i className="bi bi-windows"> windows</i>)
              : (game.platform)}
          </small>
        </p>
        <p className="card-text flex-grow-1" style={{ maxHeight: '6rem', overflow: 'hidden' }}>
          {game.short_description}
        </p>
        <a target="_blank" href={game.game_url} className="btn btn-primary mt-auto" rel="noreferrer">
          {`${game.title} Website`}
        </a>
        <div className="actions">
          <div
            onClick={() => handleFav(game)}
            className={`fav ${isGameInFavorites && isClicked ? 'clicked' : ''}`}
          >
            {isGameInFavorites ? (
              <i className="bi bi-heart-fill"></i>
            ) : (
              <i className="bi bi-heart"></i>
            )}
          </div>
          <div
            className={`stars ${isStarClicked ? 'clicked' : ''}`}
          >
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
