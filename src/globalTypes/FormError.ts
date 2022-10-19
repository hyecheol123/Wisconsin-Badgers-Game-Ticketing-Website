/**
 * Globally used type - FormError
 *   - Used to display error message of form (snackbar)
 *   - Used in Login/ChangePW Form
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

type error = {
  error: boolean;
  msg: string;
};

export default error;
