/**
 * Globally used type - Purchase
 *   - Store purchase information
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
  setDoc,
  where,
} from 'firebase/firestore';
// Other DataTypes
import { getGameById } from './Game';

export type Purchase = {
  id: string;
  gameId: string;
  userEmail: string;
  isValid: boolean;
  refundMemo?: string;
  tickets: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
};

export type PurchasedTicketCnt = {
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
};

/**
 * Function to add new purchase information to the database
 *
 * @param {FirebaseApp} app firebase application associated with the project
 * @param {Purchase} data purchase that will be newly inserted
 * @return {Promise<void>} Promise for the create document task
 */
export async function createPurchase(
  app: FirebaseApp,
  data: Purchase
): Promise<void> {
  // Check for the remaining seats again
  const gameData = await getGameById(app, data.gameId);
  if (
    gameData === undefined ||
    gameData.ticketCount.platinum < data.tickets.platinum ||
    gameData.ticketCount.gold < data.tickets.gold ||
    gameData.ticketCount.silver < data.tickets.silver ||
    gameData.ticketCount.bronze < data.tickets.bronze
  ) {
    throw new Error('already-sold');
  }

  // Add new document
  return setDoc(doc(getFirestore(app), 'purchase', data.id), data);
}

/**
 * Function to get Purchase detail by purchaseId
 *
 * @param {FirebaseApp} app firebase application associated with the project
 * @param {string} purchaseId purchaseId is used as unique id
 * @return {Promise<Purchase | undefined>} Promise which will be resolved to either Purchase or undefined (not exist).
 */
export async function getPurchaseByPurchaseId(
  app: FirebaseApp,
  purchaseId: string
): Promise<Purchase | undefined> {
  const snapshot = await getDoc(doc(getFirestore(app), 'purchase', purchaseId));
  if (snapshot.exists()) {
    const result = snapshot.data() as Purchase;
    result['id'] = snapshot.id;
    return result;
  } else {
    return undefined;
  }
}

/**
 * Function to get purchased ticket count for each game
 *
 * @param {FirebaseApp} app firebase application associated with the project
 * @param {string} gameId unique game id
 * @return {Promise<PurchasedTicketCnt>} Promise that will resolved to the PurchasedTicketCnt
 */
export async function getPurchasedTicketCntByGameId(
  app: FirebaseApp,
  gameId: string
): Promise<PurchasedTicketCnt> {
  // Query
  const snapshots = await getDocs(
    query(
      collection(getFirestore(app), 'purchase'),
      where('gameId', '==', gameId),
      where('isValid', '==', true)
    )
  );
  const purchases: Purchase[] = [];
  snapshots.forEach((doc) => {
    const elem = doc.data();
    elem['id'] = doc.id;
    purchases.push(elem as Purchase);
  });

  // Count the purchased ticket
  const purchasedTicketCnt = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  for (const purchase of purchases) {
    purchasedTicketCnt.platinum += purchase.tickets.platinum;
    purchasedTicketCnt.gold += purchase.tickets.gold;
    purchasedTicketCnt.silver += purchase.tickets.silver;
    purchasedTicketCnt.bronze += purchase.tickets.bronze;
  }

  return purchasedTicketCnt;
}
