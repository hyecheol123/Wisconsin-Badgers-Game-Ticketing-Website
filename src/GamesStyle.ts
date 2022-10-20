/**
 * Define Game List Page Style
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

const GamesStyle = {
  GameCard: { display: 'flex', margin: '1.5em 0', cursor: 'pointer' },
  ImageBox: {
    flex: '0 2 175px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.25em',
  },
  InfoBox: {
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
  },
  DateText: { flexGrow: 1 },
};

export default GamesStyle;
