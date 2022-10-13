// React
import React from 'react';
import { render } from 'react-dom';

/**
 * React functional component to render the application content
 *
 * @return {React.ReactElement} The content of the application
 */
function App(): React.ReactElement {
  return <div>Hello World!!</div>;
}

console.log('Reached');
render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));
