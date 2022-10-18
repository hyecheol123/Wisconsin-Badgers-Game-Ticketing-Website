/**
 * Define globally used account style
 *
 * @author Hyecheol (Jerry) Jang <hyecheol123@gmail.com>
 */

const accountStyle = {
  Wrapper: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '2px solid black',
    borderRadius: '15px',
    margin: '10px',
    padding: '15px 30px',
    width: 'calc(100% - 20px)',
    maxWidth: '400px',
    minWidth: 'min(260px, 100%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(calc(-50% - 10px),-50%)',
  },
  FormWrapper: {
    display: 'inline-flex',
    flexDirection: 'column',
    width: '100%',
  },
  ButtonWrapper: {
    margin: '5px 0',
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between',
  },
  SignUpLink: {
    fontWeight: 500,
    margin: '5px 0',
  }
};

export default accountStyle;
