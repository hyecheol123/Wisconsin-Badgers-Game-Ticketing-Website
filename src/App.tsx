// React
import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * React functional component to render the application content
 *
 * @return {React.ReactElement} The content of the application
 */
function App(): React.ReactElement {
  return <div>Hello World!!</div>;
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode><App /></React.StrictMode>);
