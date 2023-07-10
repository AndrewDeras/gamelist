//css
import './card.css';

// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//firestore
import { updateFavGameList } from '../../firebase/updateFavGameList';
import { updateGameRate } from '../../firebase/updateGameRate';

//context
import { useContextValue } from '../../context/AuthContext';


const Card = ({ game, favGamesArr, ratings }) => {
  const navigate = useNavigate();
  const [rate, setRate] = useState(0);
  const { user } = useContextValue();

  useEffect(() => {
    if (ratings) {
      setRate(ratings[`${game.id}`] || 0);
    }
  }, [ratings, game.id])

  const handleRatingChange = (e) => {

    if (!user) {
      return navigate('/auth');
    }

    const newRate = parseInt(e.target.getAttribute("value"));
    setRate(newRate);

    // atualizar avaliação no banco
    updateGameRate(user, game, rate, newRate);

  };

  const handleFav = (gameId) => {

    if (!user) {
      return navigate('/auth');
    }

    updateFavGameList(user, gameId, favGamesArr);
  };

  return (
    <div key={String(game.id)} className="card col-lg-4 col-sm-2" style={{ width: '18rem' }}>
      <img src={game.thumbnail} className="card-img-top" alt={game.title} />
      <div className="card-body d-flex flex-column">
        <h4 className="card-title">{game.title}</h4>
        <p className="card-text"><small className="text-body-secondary"><strong>Genre:</strong> {game.genre}</small></p>
        <p className="card-text"><small className="text-body-secondary"><strong>Platform:</strong> {game.platform}</small></p>
        <p className="card-text flex-grow-1" style={{ maxHeight: '6rem', overflow: 'hidden' }}>{game.short_description}</p>
        <a target='_blank' href={game.game_url} className="btn btn-primary mt-auto" rel="noreferrer">
          {`${game.title} page`}
        </a>
        <div className='actions'>
          <div onClick={() => handleFav(game.id)} className='fav' >
            {favGamesArr.includes(game.id) ? (
              <i className="bi bi-heart-fill"></i>
            ) : (
              <i className="bi bi-heart"></i>
            )}
          </div>
          <div className="stars">
            <span>
              <i
                value={1}
                className={`bi bi-star${rate >= 1 ? "-fill" : ""}`}
                onClick={handleRatingChange}
              ></i>
              <i
                value={2}
                className={`bi bi-star${rate >= 2 ? "-fill" : ""}`}
                onClick={handleRatingChange}
              ></i>
              <i
                value={3}
                className={`bi bi-star${rate >= 3 ? "-fill" : ""}`}
                onClick={handleRatingChange}
              ></i>
              <i
                value={4}
                className={`bi bi-star${rate >= 4 ? "-fill" : ""}`}
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
