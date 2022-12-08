/**
 * Globally used type - User
 *   - Store user information
 *
 * @author Hyecheol (Jerry) Jang
 */

// Google Firebase
import { FirebaseApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

export type User = {
  email: string;
  name: string;
};

/**
 * Function to add new user information to the database
 *
 * @param {FirebaseApp} app firebase application associated with the project
 * @param {User} data user that will be newly inserted
 * @return {Promise<void>} Promise for the create document job
 */
export function createUser(app: FirebaseApp, data: User): Promise<void> {
  return setDoc(doc(getFirestore(app), 'user', data.email), data);
}
