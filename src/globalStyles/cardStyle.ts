/**
 * Define Card Styles
 *   - Used in Game List and Purchased Ticket page
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

const cardStyle = {
  Card: {
    minHeight: '195px',
    display: 'flex',
    margin: '1.5em 0',
    cursor: 'pointer',
  },
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

export default cardStyle;
