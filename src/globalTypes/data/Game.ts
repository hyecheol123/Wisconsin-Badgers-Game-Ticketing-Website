/**
 * Globally used type - Game
 *   - Store game information
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// Google Firebase
import { FirebaseApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from 'firebase/firestore';
// Other DataTypes
import { getPurchasedTicketCntByGameId } from './Purchase';

export type Game = {
  id: string;
  opponent: string;
  opponentImgUrl: string;
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  ticketCount: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  ticketPrice: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
};

/**
 * Function to get the list of games
 *
 * @param {FirebaseApp} app firebase application associated with the project
 * @return {Promise<Game[]>} Promise that will be resolved to the List of games
 */
export async function getGamesList(app: FirebaseApp): Promise<Game[]> {
  const snapshots = await getDocs(query(collection(getFirestore(app), 'game')));
  const result: Game[] = [];
  snapshots.forEach((doc) => {
    const elem = doc.data();
    elem['id'] = doc.id;
    result.push(elem as Game);
  });

  // Sort by Game Date
  result.sort((a, b) => {
    const valA = a.year * 10000 + a.month * 100 + a.day;
    const valB = b.year * 10000 + b.month * 100 + b.day;
    return valA - valB;
  });

  // Deduct the numbers of tickets we sold so far
  for (const game of result) {
    const purchasedTicketCnt = await getPurchasedTicketCntByGameId(
      app,
      game.id
    );
    game.ticketCount.platinum -= purchasedTicketCnt.platinum;
    game.ticketCount.gold -= purchasedTicketCnt.gold;
    game.ticketCount.silver -= purchasedTicketCnt.silver;
    game.ticketCount.bronze -= purchasedTicketCnt.bronze;
  }

  return result;
}

/**
 * Function to get the game detail by the gameId
 *
 * @param {FirebaseApp} app firebase application associated with the project
 * @param {string} id unique game id
 * @return {Promise<Game | undefined>} Promise which will be resolved to either Game or undefined (not exist).
 */
export async function getGameById(
  app: FirebaseApp,
  id: string
): Promise<Game | undefined> {
  const snapshot = await getDoc(doc(getFirestore(app), 'game', id));
  if (snapshot.exists()) {
    const result = snapshot.data() as Game;
    result['id'] = snapshot.id;

    // Deduct the nubmers of tickets we sold so far
    const purchasedTicketCnt = await getPurchasedTicketCntByGameId(app, id);
    result.ticketCount.platinum -= purchasedTicketCnt.platinum;
    result.ticketCount.gold -= purchasedTicketCnt.gold;
    result.ticketCount.silver -= purchasedTicketCnt.silver;
    result.ticketCount.bronze -= purchasedTicketCnt.bronze;

    return result;
  } else {
    return undefined;
  }
}
