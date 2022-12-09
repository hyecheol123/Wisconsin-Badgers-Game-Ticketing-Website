/**
 * Globally used type - Game
 *   - Store game information
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

// Google Firebase
import { FirebaseApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';

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

// TODO: Deduct the numbers of tickets we sold so far
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

  return result;
}
