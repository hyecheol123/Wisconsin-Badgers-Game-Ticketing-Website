/**
 * Define global  modal style
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

const modalStyle = {
  ModalWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '90%',
    width: '90%',
    maxWidth: '450px',
    p: 1,
    bgcolor: 'background.paper',
    border: '2px solid black',
    borderRadius: '10px',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  ModalTitle: { margin: '3px 0', fontWeight: 500 },
  DividerMargin: { margin: '8px 0' },
  TextFieldMargin: { margin: '6px 0' },
  ButtonWrapper: {
    display: 'inline-flex',
    justifyContent: 'space-evenly',
    width: '100%',
    margin: '6px 0',
  },
};

export default modalStyle;
