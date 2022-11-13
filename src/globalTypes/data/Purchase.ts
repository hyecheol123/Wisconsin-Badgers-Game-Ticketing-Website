/**
 * Globally used type - Purchase
 *   - Store purchase information
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

type Purchase = {
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

export default Purchase;
