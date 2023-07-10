import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './config';


export const updateFavGameList = async (user, gameId, favGamesArr) => {
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