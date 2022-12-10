/**
 * Globally used type - User
 *   - Store user information
 *
 * @author Hyecheol (Jerry) Jang
 */

// Google Firebase
import { FirebaseApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

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
export async function createUser(app: FirebaseApp, data: User): Promise<void> {
  return setDoc(doc(getFirestore(app), 'user', data.email), data);
}

/**
 * Function to get User detail by user's email
 *
 * @param {FirebaseApp} app firebase application associated with the project
 * @param {string} email email is used as unique id
 * @return {Promise<User | undefined>} Promise which will be resolved to either User or undefined (not exist).
 */
export async function getUserByEmail(
  app: FirebaseApp,
  email: string
): Promise<User | undefined> {
  const snapshot = await getDoc(doc(getFirestore(app), 'user', email));
  if (snapshot.exists()) {
    const result = snapshot.data() as User;
    result['email'] = snapshot.id;

    return result;
  } else {
    return undefined;
  }
}
