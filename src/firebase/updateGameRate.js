//firestore
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './config';

export const updateGameRate = async (user, game, rate) => {
  try {
    const userDocRef = doc(db, 'users', user.uid);

    game.rate = rate;

    updateDoc(userDocRef, {
      ratedGames: arrayUnion(game)
    });

  } catch (error) {
    console.log(error.message);
  }
};