import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';

import { createStore } from './src/store';
import App from './src/App';
import { UserService } from './src/api/auth/UserService';

async function render(uri, repository) {
  const store = createStore(new UserService(repository));
  const initialState = store.getState();

  const renderResult = renderToString(
    <StaticRouter location={uri}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
  );
  return [initialState, renderResult];
}

export { render };
