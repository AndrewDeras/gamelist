import './index.css';

//firestore
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';

//context
import { useAuthValue } from '../../context/AuthContext';


const Card = ({ game, favGamesArr }) => {

  const { user } = useAuthValue();
  const handleFav = async (gameId) => {
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
          <div className='stars' >
            <span>
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Card;
