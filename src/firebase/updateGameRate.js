//firestore
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './config';

export const updateGameRate = async (user, game, rate, userData) => {
  try {
    game.rate = rate;
    const userDocRef = doc(db, 'users', user.uid);

    const isGameInRatedGames = userData.ratedGames.some((ratedGame) => ratedGame.id === game.id);

    if (isGameInRatedGames) {
      // Atualiza apenas a propriedade `rate` do jogo no array `ratedGames`
      await updateDoc(userDocRef, {
        ratedGames: userData.ratedGames.map((ratedGame) => {
          if (ratedGame.id === game.id) {
            if (Number(ratedGame.rate) === Number(rate)) {
              game.rate = ratedGame.rate - 1;
              console.log(game.rate);
            }
            return { ...ratedGame, rate: game.rate };
          }
          return ratedGame;
        })
      });
    } else {
      // Adiciona o jogo ao array `ratedGames`
      await updateDoc(userDocRef, {
        ratedGames: arrayUnion(game)
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
