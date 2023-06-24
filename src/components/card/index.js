import './index.css';

const Card = ({ game }) => {
  return (
    <div key={String(game.id)} className="card col-lg-4 col-sm-2" style={{ width: '18rem' }}>
      <img src={game.thumbnail} className="card-img-top" alt={game.title} />
      <div className="card-body d-flex flex-column">
        <h4 className="card-title">{game.title}</h4>
        <p className="card-text"><small className="text-body-secondary"><strong>Genre:</strong> {game.genre}</small></p>
        <p className="card-text"><small className="text-body-secondary"><strong>Platform:</strong> {game.platform}</small></p>
        <p className="card-text flex-grow-1" style={{ maxHeight: '6rem', overflow: 'hidden' }}>{game.short_description}</p>
        <a href={game.game_url} className="btn btn-primary mt-auto">{`${game.title} page`}</a>
      </div>
    </div>
  );
};

export default Card;
