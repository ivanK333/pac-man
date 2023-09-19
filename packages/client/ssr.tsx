import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import App from './src/App';

async function render(uri) {
  return renderToString(
    <StaticRouter location={uri}>
      <App />
    </StaticRouter>,
  );
}

export { render };
