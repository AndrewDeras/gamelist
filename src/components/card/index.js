import './index.css';
import { useNavigate } from 'react-router-dom';

// hooks
import { useEffect, useState } from 'react';

//firestore
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';

//context
import { useAuthValue } from '../../context/AuthContext';


const Card = ({ game, favGamesArr, ratings }) => {
  const navigate = useNavigate();
  const [rate, setRate] = useState(0);
  const { user } = useAuthValue();

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

    const updateRate = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);

        if (newRate === rate) {
          await updateDoc(userDocRef, {
            [`rateGames.${game.id}`]: rate - 1,
          });
        } else {
          await updateDoc(userDocRef, {
            [`rateGames.${game.id}`]: newRate,
          });
        }

      } catch (error) {
        console.log(error.message);
      }
    }

    updateRate();
  };

  const handleFav = async (gameId) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);

      // verifica se já está favoritado, se sim o exclui do array
      if (favGamesArr.includes(gameId)) {
        await updateDoc(userDocRef, {
          favGames: arrayRemove(gameId),
        });

      } else {
        // adiciona o id do jogo 
        await updateDoc(userDocRef, {
          favGames: arrayUnion(gameId)
        });
        console.log('Jogo favoritado!');

      }

    } catch (error) {
      console.log(error.message);
    }
  }

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
