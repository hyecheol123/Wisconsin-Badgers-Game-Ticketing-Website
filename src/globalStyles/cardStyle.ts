/**
 * Define Card Styles
 *   - Used in Game List and Purchased Ticket page
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

const cardStyle = {
  Card: {
    minHeight: '240px',
    display: 'flex',
    margin: '1.5em 0',
    cursor: 'pointer',
  },
  ImageBox: {
    flex: '0 2 175px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.25em',
    minWidth: '50px',
  },
  InfoBox: {
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
  },
  GrowText: { flexGrow: 1 },
  Button: { marginTop: '0.5em' },
};

export default cardStyle;
