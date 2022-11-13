// Need to combine the following array with the array saved in
//   the sessionStorage with key 'purchases'

import Purchase from '../globalTypes/data/Purchase';

const purchases: Purchase[] = [
  {
    id: 'g1-001',
    gameId: '1',
    userEmail: 'demo@abc.com',
    isValid: true,
    tickets: {
      platinum: 0,
      gold: 2,
      silver: 0,
      bronze: 0,
    },
  },
  {
    id: 'g1-002',
    gameId: '1',
    userEmail: 'tickets@badgergames.com',
    isValid: true,
    tickets: {
      platinum: 3,
      gold: 2,
      silver: 0,
      bronze: 1,
    },
  },
  {
    id: 'g1-003',
    gameId: '1',
    userEmail: 'tickets@badgergames.com',
    isValid: true,
    tickets: {
      platinum: 0,
      gold: 1,
      silver: 4,
      bronze: 1,
    },
  },
  {
    id: 'g2-001',
    gameId: '2',
    userEmail: 'demo@abc.com',
    isValid: true,
    tickets: {
      platinum: 6,
      gold: 0,
      silver: 0,
      bronze: 0,
    },
  },
  {
    id: 'g2-002',
    gameId: '2',
    userEmail: 'tickets@badgergames.com',
    isValid: true,
    tickets: {
      platinum: 3,
      gold: 2,
      silver: 0,
      bronze: 1,
    },
  },
  {
    id: 'g3-001',
    gameId: '3',
    userEmail: 'demo@abc.com',
    isValid: true,
    tickets: {
      platinum: 0,
      gold: 6,
      silver: 0,
      bronze: 0,
    },
  },
  {
    id: 'g3-002',
    gameId: '3',
    userEmail: 'demo@abc.com',
    isValid: true,
    tickets: {
      platinum: 3,
      gold: 2,
      silver: 0,
      bronze: 1,
    },
  },
  {
    id: 'g3-003',
    gameId: '3',
    userEmail: 'tickets@badgergames.com',
    isValid: false,
    tickets: {
      platinum: 0,
      gold: 2,
      silver: 4,
      bronze: 0,
    },
  },
  {
    id: 'g7-001',
    gameId: '7',
    userEmail: 'tickets@badgergames.com',
    isValid: true,
    tickets: {
      platinum: 0,
      gold: 2,
      silver: 0,
      bronze: 0,
    },
  },
];

export default purchases;
