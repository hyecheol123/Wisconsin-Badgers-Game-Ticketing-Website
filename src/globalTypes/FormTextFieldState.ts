/**
 * Globally used type - FormTextFieldState
 *   - Used to store value of each textfield
 *   - Used to display error message of each textfield
 *   - Used in SignUp Form
 *
 * @author Hyecheol (Jerry) Jang <hyecheol.jang@wisc.edu>
 */

type textFieldState = {
  value: string;
  error: boolean;
  helperText: string;
};

export default textFieldState;
