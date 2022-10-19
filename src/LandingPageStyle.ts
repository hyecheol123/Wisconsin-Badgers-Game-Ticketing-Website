/**
 * Define LandingPage style
 *
 * @author Hyecheol (Jerry) Jang
 */

const LandingPageStyle = {
  ContentWrapper: { display: 'flex', justifyContent: 'center' },
  Content: {
    margin: '1em 0.5em 4em 0.5em',
    width: 'calc(100%-1em)',
    maxWidth: '1024px',
  },
  GroupPhoto: { width: '100%' },
  TextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  Title: { margin: '1.5em 0' },
  BodyWrapper: { width: '100%', padding: '0 0.5em' },
  StadiumPhoto: { width: '70%', margin: '2.5em 0 1em 0' },
  CheckoutMsg: { margin: '1.5em 0 1em 0' },
  CheckoutBtn: { margin: '1em 0 1.5em 0', flexGrow: 0 },
};

export default LandingPageStyle;