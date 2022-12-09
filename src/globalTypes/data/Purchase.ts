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
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

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
      where('gameId', '==', gameId)
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
