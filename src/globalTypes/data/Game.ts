/**
 * Globally used type - Game
 *   - Store game information
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

type Game = {
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

export default Game;
