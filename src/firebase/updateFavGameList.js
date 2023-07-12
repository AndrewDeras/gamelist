import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './config';
import { toast } from 'react-toastify';

export const updateFavGameList = async (user, game, userData) => {
  if (!user) return;

  try {
    const userDocRef = doc(db, 'users', user.uid);

    // verifica se o jogo está presente do array de favoritos que é monitorado com snapshot
    const isGameInFavorites = userData.favGames.some((favGame) => favGame.id === game.id);

    if (isGameInFavorites) {
      // se estiver presente, é removido
      await updateDoc(userDocRef, {
        favGames: arrayRemove(game)
      });
      toast.success('Game removed from favorites list.',);
    } else {
      // se não estiver no array de favoritos é adicionado
      await updateDoc(userDocRef, {
        favGames: arrayUnion(game)
      });
      toast.success('Game added to favorites list.',);
    }

  } catch (error) {
    toast.error(error.message,);
  }
};
