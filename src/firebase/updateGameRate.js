//firestore
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './config';

export const updateGameRate = async (user, game, rate, newRate) => {
  try {
    const userDocRef = doc(db, 'users', user.uid);

    if (newRate === rate) {
      await updateDoc(userDocRef, {
        [`rateGames.${game.id}`]: rate - 1,
      });
      console.log('rate atualizado');
    } else {
      await updateDoc(userDocRef, {
        [`rateGames.${game.id}`]: newRate,
      });
      console.log('rate atualizado');
    }

  } catch (error) {
    console.log(error.message);
  }
};