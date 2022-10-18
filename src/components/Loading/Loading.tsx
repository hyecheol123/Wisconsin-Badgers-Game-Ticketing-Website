/**
 * Loading React Element which will show the loading animation
 *
 * @author Hyecheol (Jerry) Jang <hyecheol123@gmail.com>
 */

import * as React from 'react';
import styles from './Loading.module.css';

/**
 * React functional component to render Loading animation
 *
 * @return {React.ReactElement} A ReactElement referring Loading
 */
const Loading = (): React.ReactElement => {
  return <div className={styles.Loading}></div>;
};

export default Loading;
